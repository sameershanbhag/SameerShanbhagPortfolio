import React, { useRef, useState } from "react";
import "./AskMeAnything.css";
import Markdown from "./Markdown";

const API_BASE =
  import.meta.env.VITE_AMA_API_BASE || "https://ama.sameershanbhag.com";

const UI = {
  en: {
    placeholder:
      "Ask me anything about Sameer — his work, projects, or how to reach him (BETA)",
    ask: "Ask",
    hint: "Try: \u201cWhat does Sameer do at Walmart?\u201d \u00b7 \u201cTell me about PyAutonomy\u201d \u00b7 \u201cIs Sameer open to new roles?\u201d",
    leaveMessage: "\ud83d\udceb Leave Sameer a message",
    sent: "\ud83d\udcec Sent! Sameer will get back to you soon.",
    yourName: "Your name",
    yourEmail: "Your email",
    yourMessage: "Your message to Sameer\u2026",
    back: "Back",
    send: "Send to Sameer",
    sending: "Sending\u2026",
    netError:
      "I can't reach my brain right now. Try again in a bit, or leave Sameer a message below.",
    empty: "Hmm, I came up empty — try rephrasing?",
  },
  de: {
    placeholder:
      "Frag mich alles über Sameer — seine Arbeit, Projekte oder wie du ihn erreichst (BETA)",
    ask: "Fragen",
    hint: "Zum Beispiel: \u201eWas macht Sameer bei Walmart?\u201c \u00b7 \u201eErz\u00e4hl mir von PyAutonomy\u201c \u00b7 \u201eIst Sameer offen f\u00fcr neue Rollen?\u201c",
    leaveMessage: "\ud83d\udceb Sameer eine Nachricht hinterlassen",
    sent: "\ud83d\udcec Gesendet! Sameer meldet sich bald bei dir.",
    yourName: "Dein Name",
    yourEmail: "Deine E-Mail",
    yourMessage: "Deine Nachricht an Sameer\u2026",
    back: "Zur\u00fcck",
    send: "An Sameer senden",
    sending: "Wird gesendet\u2026",
    netError:
      "Ich komme gerade nicht an mein Gehirn. Versuch es gleich nochmal oder hinterlasse Sameer unten eine Nachricht.",
    empty: "Hmm, da kam nichts — formulier es anders?",
  },
};

function detectLang() {
  try {
    const stored = localStorage.getItem("site_lang");
    if (stored === "de" || stored === "en") return stored;
  } catch {}
  return (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
}

export default function AskMeAnything({ theme }) {
  const [lang, setLang] = useState(detectLang);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactState, setContactState] = useState("idle"); // idle | sending | sent | error
  const [contactError, setContactError] = useState("");
  const logRef = useRef(null);
  const t = UI[lang];

  React.useEffect(() => {
    const onChange = (e) => {
      const next = e?.detail?.lang;
      if (next === "de" || next === "en") setLang(next);
    };
    window.addEventListener("site-lang-changed", onChange);
    return () => window.removeEventListener("site-lang-changed", onChange);
  }, []);

  function switchLang(next) {
    setLang(next);
    try {
      localStorage.setItem("site_lang", next);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("site-lang-changed", { detail: { lang: next } })
    );
  }

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
        body: JSON.stringify({ messages: next, lang }),
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
          content: t.netError,
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
          placeholder={t.placeholder}
          maxLength={500}
          aria-label="Ask a question about Sameer"
        />
        <button className="ama-send" type="submit" disabled={busy || !input.trim()}>
          {busy ? "…" : t.ask}
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
          <div className="ama-lang-row">
            <button
              type="button"
              className={`ama-lang ${lang === "en" ? "ama-lang-active" : ""}`}
              onClick={() => switchLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`ama-lang ${lang === "de" ? "ama-lang-active" : ""}`}
              onClick={() => switchLang("de")}
            >
              DE
            </button>
          </div>
          {messages.length === 0 && !showContact && (
            <p className="ama-hint">{t.hint}</p>
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
                {t.sent}
              </p>
            ) : (
              <form className="ama-contact" onSubmit={sendContact}>
                <div className="ama-contact-row">
                  <input name="name" placeholder={t.yourName} required maxLength={80} />
                  <input name="email" type="email" placeholder={t.yourEmail} required maxLength={120} />
                </div>
                <textarea
                  name="message"
                  placeholder={t.yourMessage}
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
                    {t.back}
                  </button>
                  <button type="submit" disabled={contactState === "sending"}>
                    {contactState === "sending" ? t.sending : t.send}
                  </button>
                </div>
              </form>
            )
          ) : (
            <button className="ama-contact-open" onClick={() => setShowContact(true)}>
              {t.leaveMessage}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
