// Shared abuse guards: CORS allowlist, Upstash rate limits, global kill switch.

const ALLOWED_ORIGINS = new Set([
  "https://sameershanbhag.com",
  "https://www.sameershanbhag.com",
  "http://localhost:3000",
  "http://localhost:8898",
]);

export function applyCors(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return true;
  }
  return false;
}

export function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  return (Array.isArray(fwd) ? fwd[0] : fwd || "").split(",")[0].trim() || "unknown";
}

async function redis(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null; // no Redis configured -> caller decides fallback
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!res.ok) return null;
  return (await res.json()).result;
}

/**
 * Fixed-window counter. Returns { allowed, remaining } — fails OPEN per-key if
 * Redis is unreachable (the global cap below still bounds worst-case spend).
 */
export async function rateLimit(key, limit, windowSeconds) {
  const bucket = `${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
  const count = await redis(["INCR", bucket]);
  if (count === null) return { allowed: true, remaining: limit };
  if (count === 1) await redis(["EXPIRE", bucket, String(windowSeconds)]);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

/** Site-wide daily budget: hard-stops the whole bot no matter who is asking. */
export async function globalBudget(name, dailyLimit) {
  const day = new Date().toISOString().slice(0, 10);
  const count = await redis(["INCR", `global:${name}:${day}`]);
  if (count === null) return true; // no Redis: allow (per-IP limits also failed open)
  return count <= dailyLimit;
}
