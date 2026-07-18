import { applyCors, clientIp, rateLimit, globalBudget } from "../_lib/guard.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  const corsOk = applyCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!corsOk) return res.status(403).json({ error: "forbidden origin" });
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const ip = clientIp(req);
  const [perDay, budgetOk] = await Promise.all([
    rateLimit(`contact:d:${ip}`, 3, 86400),
    globalBudget("contact", 50),
  ]);
  if (!perDay.allowed || !budgetOk) {
    return res.status(429).json({ error: "Too many messages today — please try again tomorrow." });
  }

  const { name, email, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot: pretend success
  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please fill in your name, a valid email, and a message." });
  }

  const clip = (s, n) => String(s).slice(0, n);
  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AMA Bot <ama@sameershanbhag.com>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: clip(email, 200),
      subject: `Portfolio AMA: message from ${clip(name, 80)}`,
      text: `Name: ${clip(name, 200)}\nEmail: ${clip(email, 200)}\nIP: ${ip}\n\n${clip(message, 2000)}`,
    }),
  });

  if (!sent.ok) {
    return res.status(502).json({ error: "Couldn't send right now — please try LinkedIn instead." });
  }
  return res.status(200).json({ ok: true });
}
