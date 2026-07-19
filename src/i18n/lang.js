import { useSyncExternalStore } from "react";

const STORAGE_KEY = "site_lang";
const EVENT_NAME = "site-lang-changed";

function detectDefault() {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.language === "string" &&
    navigator.language.toLowerCase().startsWith("de")
  ) {
    return "de";
  }
  return "en";
}

export function getLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") {
      return stored;
    }
  } catch (e) {
    // localStorage unavailable (private mode, SSR) — fall through
  }
  return detectDefault();
}

export function setLang(lang) {
  if (lang !== "en" && lang !== "de") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // ignore storage failures; still broadcast so the UI updates
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang } }));
}

function subscribe(callback) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useLang() {
  return useSyncExternalStore(subscribe, getLang, () => "en");
}
