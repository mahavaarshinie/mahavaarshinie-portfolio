"use client";

/* =========================================================================
   Maha Vaarshinie — Portfolio AI Chat Widget (React / Next.js client component)
   Self-contained. Drop this file in src/components/ and render <ChatWidget />
   once inside src/app/layout.tsx (just before </body>) or in page.tsx.
   Talks to an n8n webhook; hands off to WhatsApp on request.
   ========================================================================= */

import { useEffect, useRef, useState } from "react";

// ---- CONFIG ---------------------------------------------------------------
const WEBHOOK_URL =
  "https://n8n.nareenbruce.tech/webhook/ece33bb6-6fa0-4184-8dce-34942f763e54";
const WHATSAPP_NUMBER = "60164504068"; // Maha, no + or spaces
const ACCENT = "#D4AF37"; // gold, matches the site
const WELCOME =
  "👋 Hi there! I'm Maha's assistant. Maha is a Data Scientist who builds end-to-end machine learning and computer vision systems — from deepfake detection to multilingual NLP.\n\nAsk me anything about her work, skills, or projects. And if you'd like to get in touch with her directly, just say the word — I can connect you on WhatsApp. 😊";

interface Msg {
  text: string;
  who: "bot" | "user";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>("");

  // Stable per-visitor session id for n8n memory.
  useEffect(() => {
    try {
      let s = localStorage.getItem("maha_chat_session");
      if (!s) {
        s = "sess_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("maha_chat_session", s);
      }
      sessionId.current = s;
    } catch {
      sessionId.current = "sess_" + Date.now().toString(36);
    }
  }, []);

  // Auto-scroll to newest message.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  // ---- render a bot message with markdown links + WhatsApp button ----------
  function renderBot(text: string) {
    const parts: React.ReactNode[] = [];
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      const label = m[1];
      const url = m[2];
      if (/wa\.me|api\.whatsapp\.com/i.test(url)) {
        const clean = label.replace(/^[^\w(]+/, "").trim() || "Chat on WhatsApp";
        parts.push(
          <a
            key={key++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#25D366",
              color: "#fff",
              fontWeight: 500,
              fontSize: 14,
              padding: "11px 18px",
              borderRadius: 24,
              textDecoration: "none",
              marginTop: 6,
              boxShadow: "0 2px 8px rgba(37,211,102,.3)",
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: 8, fill: "#fff", flexShrink: 0 }}>
              <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4C8.7 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            {clean}
          </a>
        );
      } else {
        parts.push(
          <a key={key++} href={url} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "underline" }}>
            {label}
          </a>
        );
      }
      last = re.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }

  function toggle() {
    setOpen((o) => {
      const next = !o;
      if (next && msgs.length === 0) setMsgs([{ text: WELCOME, who: "bot" }]);
      return next;
    });
  }

  async function send() {
    const text = input.trim();
    if (!text) return;
    setMsgs((prev) => [...prev, { text, who: "user" }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId.current,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);

      let reply = "";
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const data = await res.json();
        const pick = (o: Record<string, string> | null) =>
          o && (o.reply || o.output || o.text || o.message || o.answer);
        reply = pick(data) || (Array.isArray(data) && data[0] && pick(data[0])) || "";
        if (!reply && typeof data === "string") reply = data;
      } else {
        reply = await res.text();
      }

      setTyping(false);
      setMsgs((prev) => [
        ...prev,
        { text: reply && reply.trim() ? reply.trim() : "Hmm, I didn't catch a reply there. Mind trying again?", who: "bot" },
      ]);
    } catch {
      setTyping(false);
      setMsgs((prev) => [
        ...prev,
        {
          text:
            "⚠️ I'm having trouble reaching the server right now.\n\n[Message Maha on WhatsApp](https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=Hi%20Maha%2C%20I%20was%20on%20your%20portfolio%20and%20wanted%20to%20reach%20you.)",
          who: "bot",
        },
      ]);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: open ? ACCENT : "#12100a",
          border: `2px solid ${ACCENT}`,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99998,
          transition: "transform .2s, background .2s",
        }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" style={{ fill: open ? "#000" : ACCENT }}>
          {open ? (
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.6 1.23 4.94 3.2 6.56L4 22l4.9-1.66c.98.27 2.02.42 3.1.42 5.52 0 10-4.04 10-9S17.52 2 12 2z" />
          )}
        </svg>
      </button>

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          bottom: 96,
          right: 24,
          width: 380,
          maxWidth: "calc(100vw - 32px)",
          height: 560,
          maxHeight: "calc(100vh - 130px)",
          background: "#12100a",
          border: "1px solid rgba(212,175,55,.2)",
          borderRadius: 14,
          boxShadow: "0 16px 50px rgba(0,0,0,.6)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(.98)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .22s, transform .22s",
          fontFamily: "inherit",
        }}
      >
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${ACCENT}, #8a6d1a)`, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            🤖
          </div>
          <div>
            <h4 style={{ margin: 0, color: "#000", fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Maha&apos;s Assistant</h4>
            <span style={{ color: "rgba(0,0,0,.7)", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
              <i style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a7f37", display: "inline-block" }} /> Online — usually replies instantly
            </span>
          </div>
        </div>

        {/* Body */}
        <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#0a0a0a" }}>
          {msgs.map((msg, i) => (
            <div
              key={i}
              style={{
                maxWidth: "82%",
                padding: "11px 14px",
                fontSize: 14,
                lineHeight: 1.5,
                borderRadius: 14,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                ...(msg.who === "user"
                  ? { background: ACCENT, color: "#000", alignSelf: "flex-end", borderBottomRightRadius: 4 }
                  : { background: "#1c1a12", color: "#ede8d8", alignSelf: "flex-start", borderBottomLeftRadius: 4 }),
              }}
            >
              {msg.who === "bot" ? renderBot(msg.text) : msg.text}
            </div>
          ))}
          {typing && (
            <div style={{ alignSelf: "flex-start", background: "#1c1a12", padding: "13px 16px", borderRadius: 14, borderBottomLeftRadius: 4, display: "flex", gap: 4 }}>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#8a856f",
                    display: "inline-block",
                    animation: `mahaBounce 1.3s ${d * 0.15}s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: 12, background: "#12100a", borderTop: "1px solid rgba(212,175,55,.12)", display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask about Maha…"
            style={{
              flex: 1,
              background: "#1c1a12",
              border: "1px solid rgba(212,175,55,.15)",
              borderRadius: 10,
              color: "#ede8d8",
              fontFamily: "inherit",
              fontSize: 14,
              padding: "10px 12px",
              resize: "none",
              maxHeight: 96,
              lineHeight: 1.4,
              outline: "none",
            }}
          />
          <button
            onClick={send}
            aria-label="Send message"
            style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: ACCENT, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "#000" }}>
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#5c5647", padding: "6px 0 10px", background: "#12100a" }}>
          Powered by n8n · Maha&apos;s portfolio
        </div>
      </div>

      <style>{`@keyframes mahaBounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-6px);opacity:1}}`}</style>
    </>
  );
}