import { readFileSync } from "node:fs";
import { join } from "node:path";
import { applyCors, clientIp, rateLimit, globalBudget } from "../_lib/guard.js";

export const config = { supportsResponseStreaming: true };

const KNOWLEDGE = readFileSync(join(process.cwd(), "knowledge.md"), "utf8");

const SYSTEM = `${KNOWLEDGE}

You are answering as "Sameer's assistant" inside a small chat widget on his
portfolio. Follow the Rules section strictly. Format replies in simple
markdown only: **bold**, bullet lists, and [links](url) — no headings,
tables, or code blocks unless asked about code.`;

const MAX_INPUT_CHARS = 500;
const MAX_TURNS = 6;

export default async function handler(req, res) {
  const corsOk = applyCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!corsOk) return res.status(403).json({ error: "forbidden origin" });
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const ip = clientIp(req);
  const [minute, day, budgetOk] = await Promise.all([
    rateLimit(`chat:m:${ip}`, 10, 60),
    rateLimit(`chat:d:${ip}`, 40, 86400),
    globalBudget("chat", 1500),
  ]);
  if (!budgetOk) {
    return res.status(429).json({
      reply: "I've hit my daily chat budget — I'm taking a break until tomorrow. Meanwhile, everything about Sameer is on this site!",
    });
  }
  if (!minute.allowed || !day.allowed) {
    return res.status(429).json({
      reply: "Whoa, that's a lot of questions! Give me a minute to catch my breath.",
    });
  }

  const { messages, lang } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages[] required" });
  }
  const trimmed = messages.slice(-MAX_TURNS).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, MAX_INPUT_CHARS),
  }));

  const anthropic = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      stream: true,
      system:
        SYSTEM +
        (lang === "de"
          ? "\n\npreferred_language: German — antworte auf Deutsch, außer der Besucher schreibt ausdrücklich auf Englisch."
          : "\n\npreferred_language: English — reply in English unless the visitor writes in German."),
      messages: trimmed,
    }),
  });

  if (!anthropic.ok || !anthropic.body) {
    return res.status(502).json({
      reply: "I'm having trouble thinking right now — try again in a moment, or use the Leave a message button.",
    });
  }

  // Content negotiation: only stream when the client opts in. Older cached
  // frontend bundles call res.json() and would choke on a text stream.
  const wantsStream = req.headers["x-ama-stream"] === "1";
  if (!wantsStream) {
    const decoder = new TextDecoder();
    let buffer = "";
    let full = "";
    for await (const chunk of anthropic.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const event = JSON.parse(line.slice(6));
          if (event.type === "content_block_delta" && event.delta?.text) {
            full += event.delta.text;
          }
        } catch {}
      }
    }
    return res.status(200).json({ reply: full.trim() });
  }

  // Re-stream Anthropic's SSE as plain text chunks (just the text deltas).
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no",
  });

  const decoder = new TextDecoder();
  let buffer = "";
  for await (const chunk of anthropic.body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      try {
        const event = JSON.parse(line.slice(6));
        if (event.type === "content_block_delta" && event.delta?.text) {
          res.write(event.delta.text);
        }
      } catch {
        // ignore malformed keepalive lines
      }
    }
  }
  res.end();
}
