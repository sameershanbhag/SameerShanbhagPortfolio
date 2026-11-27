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
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-AMA-Stream");
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
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    return (await res.json()).result;
  } catch (err) {
    // Redis unreachable (deleted database, DNS failure, timeout). Never let
    // that take the whole endpoint down: callers fall back to local counters.
    console.error("redis unreachable:", err?.cause?.code || err?.message);
    return null;
  }
}

// Fallback counters for when Redis is unavailable. They live in this function
// instance only, so they are a weak bound, not a replacement for Redis.
const localCounts = new Map();
function localIncr(bucket) {
  if (localCounts.size > 5000) localCounts.clear();
  const count = (localCounts.get(bucket) || 0) + 1;
  localCounts.set(bucket, count);
  return count;
}

/**
 * Fixed-window counter. Returns { allowed, remaining }. If Redis is unreachable
 * it falls back to in-memory counters for this function instance.
 */
export async function rateLimit(key, limit, windowSeconds) {
  const bucket = `${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
  let count = await redis(["INCR", bucket]);
  if (count === null) count = localIncr(bucket);
  else if (count === 1) await redis(["EXPIRE", bucket, String(windowSeconds)]);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

/** Site-wide daily budget: hard-stops the whole bot no matter who is asking. */
export async function globalBudget(name, dailyLimit) {
  const day = new Date().toISOString().slice(0, 10);
  const key = `global:${name}:${day}`;
  let count = await redis(["INCR", key]);
  if (count === null) count = localIncr(key); // no Redis: per-instance cap only
  return count <= dailyLimit;
}
