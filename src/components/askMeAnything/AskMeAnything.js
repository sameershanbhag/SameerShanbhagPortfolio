import React, { useRef, useState } from "react";
import "./AskMeAnything.css";
import Markdown from "./Markdown";

const API_BASE =
  import.meta.env.VITE_AMA_API_BASE || "https://ama.sameershanbhag.com";

export default function AskMeAnything({ theme }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactState, setContactState] = useState("idle"); // idle | sending | sent | error
  const [contactError, setContactError] = useState("");
  const logRef = useRef(null);

  const scrollLog = () =>
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);

  async function ask(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setOpen(true);
    setBusy(true);
    scrollLog();
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-AMA-Stream": "1" },
        body: JSON.stringify({ messages: next }),
      });
      const type = res.headers.get("content-type") || "";
      if (type.includes("application/json")) {
        // rate limit / error path returns JSON
        const data = await res.json();
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              data.reply ||
              data.error ||
              "Hmm, something went sideways — try again, or leave Sameer a message below.",
          },
        ]);
      } else {
        // streaming path: append text deltas as they arrive
        setMessages([...next, { role: "assistant", content: "" }]);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const current = acc;
          setMessages([...next, { role: "assistant", content: current }]);
          scrollLog();
        }
        if (!acc.trim()) {
          setMessages([
            ...next,
            {
              role: "assistant",
              content: "Hmm, I came up empty — try rephrasing?",
            },
          ]);
        }
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I can't reach my brain right now. Try again in a bit, or leave Sameer a message below.",
        },
      ]);
    } finally {
      setBusy(false);
      scrollLog();
    }
  }

  async function sendContact(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    setContactState("sending");
    setContactError("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          website: form.get("website"), // honeypot
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setContactState("sent");
      } else {
        setContactState("error");
        setContactError(data.error || "Couldn't send — please try again.");
      }
    } catch {
      setContactState("error");
      setContactError("Couldn't send — please try again.");
    }
  }

  return (
    <div className="ama-container">
      <form className="ama-bar" onSubmit={ask}>
        <span className="ama-spark" aria-hidden>
          ✨
        </span>
        <input
          className="ama-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Ask me anything about Sameer — his work, projects, or how to reach him (BETA)"
          maxLength={500}
          aria-label="Ask a question about Sameer"
        />
        <button className="ama-send" type="submit" disabled={busy || !input.trim()}>
          {busy ? "…" : "Ask"}
        </button>
        {open && (
          <button
            type="button"
            className="ama-close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        )}
      </form>

      {open && (
        <div className="ama-panel">
          {messages.length === 0 && !showContact && (
            <p className="ama-hint">
              Try: “What does Sameer do at Walmart?” · “Tell me about PyAutonomy”
              · “Is Sameer open to new roles?”
            </p>
          )}
          <div className="ama-log" ref={logRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ama-msg ama-msg-${m.role}`}>
                {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
                {busy &&
                  m.role === "assistant" &&
                  i === messages.length - 1 && (
                    <span className="ama-cursor" aria-hidden="true" />
                  )}
              </div>
            ))}
            {busy && messages[messages.length - 1]?.role === "user" && (
              <div className="ama-msg ama-msg-assistant">
                <span className="ama-cursor" aria-hidden="true" />
              </div>
            )}
          </div>

          {showContact ? (
            contactState === "sent" ? (
              <p className="ama-contact-done">
                📬 Sent! Sameer will get back to you soon.
              </p>
            ) : (
              <form className="ama-contact" onSubmit={sendContact}>
                <div className="ama-contact-row">
                  <input name="name" placeholder="Your name" required maxLength={80} />
                  <input name="email" type="email" placeholder="Your email" required maxLength={120} />
                </div>
                <textarea
                  name="message"
                  placeholder="Your message to Sameer…"
                  required
                  maxLength={2000}
                  rows={3}
                />
                <input
                  name="website"
                  className="ama-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {contactState === "error" && (
                  <p className="ama-contact-error">{contactError}</p>
                )}
                <div className="ama-contact-actions">
                  <button type="button" onClick={() => setShowContact(false)}>
                    Back
                  </button>
                  <button type="submit" disabled={contactState === "sending"}>
                    {contactState === "sending" ? "Sending…" : "Send to Sameer"}
                  </button>
                </div>
              </form>
            )
          ) : (
            <button className="ama-contact-open" onClick={() => setShowContact(true)}>
              📫 Leave Sameer a message
            </button>
          )}
        </div>
      )}
    </div>
  );
}
