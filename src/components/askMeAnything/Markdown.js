import React from "react";

/**
 * Tiny markdown renderer for the AMA bot's constrained output:
 * **bold**, *italic*, `code`, [links](url), bullet/numbered lists, paragraphs.
 * Builds React elements directly (no innerHTML), so it is XSS-safe by
 * construction even if the model emits something unexpected.
 */

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\))/g;

function renderInline(text, keyPrefix) {
  const parts = text.split(INLINE_RE).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)$/);
    if (link) {
      return (
        <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export default function Markdown({ text }) {
  const blocks = [];
  let list = null; // { ordered, items }
  const lines = String(text || "").split("\n");

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-•*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      const item = (bullet || numbered)[1];
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: "list", ordered, items: [] };
      }
      list.items.push(item);
    } else if (line.trim() === "") {
      flushList();
      blocks.push({ type: "break" });
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={i} className="ama-md-list">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
              ))}
            </Tag>
          );
        }
        if (block.type === "break") {
          return <span key={i} className="ama-md-gap" />;
        }
        return (
          <p key={i} className="ama-md-p">
            {renderInline(block.text, String(i))}
          </p>
        );
      })}
    </>
  );
}
