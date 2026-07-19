"use client";

import { useSyncExternalStore } from "react";

// Shared language contract with the portfolio app (same origin):
// localStorage key `site_lang` + `site-lang-changed` CustomEvent.
export type Lang = "en" | "de";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("site_lang");
    if (stored === "de" || stored === "en") return stored;
  } catch {}
  return (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem("site_lang", lang);
  } catch {}
  window.dispatchEvent(new CustomEvent("site-lang-changed", { detail: { lang } }));
}

function subscribe(callback: () => void) {
  window.addEventListener("site-lang-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("site-lang-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "en" as Lang);
}
