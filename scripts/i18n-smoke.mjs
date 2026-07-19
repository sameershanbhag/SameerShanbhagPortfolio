/* Node smoke test for the i18n layer (no browser, no vitest).
 * Run: node scripts/i18n-smoke.mjs
 */
import assert from "node:assert/strict";

const { getLang, setLang, useLang } = await import("../src/i18n/lang.js");
const { getStrings, en, de } = await import("../src/i18n/strings.js");
const { getPortfolio } = await import("../src/portfolio.de.js");

// API shape
assert.equal(typeof getLang, "function", "getLang is a function");
assert.equal(typeof setLang, "function", "setLang is a function");
assert.equal(typeof useLang, "function", "useLang is a function");

// getLang default outside a browser (no navigator/localStorage) → 'en'
assert.equal(getLang(), "en", "default lang is en outside browser");

// setLang contract: writes localStorage key site_lang, dispatches site-lang-changed
const events = [];
const store = {};
globalThis.window = {
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => {
      store[k] = String(v);
    },
  },
  dispatchEvent: (e) => events.push(e),
};
globalThis.CustomEvent = class CustomEvent {
  constructor(type, opts = {}) {
    this.type = type;
    this.detail = opts.detail;
  }
};

setLang("de");
assert.equal(store.site_lang, "de", "site_lang written to localStorage");
assert.equal(events.length, 1, "one event dispatched");
assert.equal(events[0].type, "site-lang-changed", "event name");
assert.deepEqual(events[0].detail, { lang: "de" }, "event detail");
assert.equal(getLang(), "de", "getLang reads stored value");

setLang("fr"); // invalid — ignored
assert.equal(store.site_lang, "de", "invalid lang ignored");

// strings dictionaries cover the same keys
assert.deepEqual(Object.keys(en).sort(), Object.keys(de).sort(), "en/de keys match");
assert.equal(getStrings("de").navHome, "Startseite");
assert.equal(getStrings("en").navHome, "Home");
assert.equal(getStrings("xx").navHome, "Home", "unknown lang falls back to en");

// getPortfolio deep merge
const enP = getPortfolio("en");
const deP = getPortfolio("de");
assert.equal(deP.experience.title, "Erfahrung");
assert.equal(deP.experience.sections[0].title, "Berufserfahrung");
assert.equal(deP.experience.sections[1].title, "Praktika");
// untranslated structural fields fall back to English base
assert.equal(deP.greeting.title, enP.greeting.title, "name untouched");
assert.equal(
  deP.experience.sections[0].experiences[0].company,
  "Walmart Global Tech",
  "company preserved through array merge"
);
assert.equal(
  deP.skills.data[0].softwareSkills.length,
  enP.skills.data[0].softwareSkills.length,
  "softwareSkills preserved"
);
assert.notEqual(deP.greeting.subTitle, enP.greeting.subTitle, "subTitle translated");
assert.ok(deP.degrees.degrees[0].descriptions[0].includes("KI"), "degree descriptions in German");
assert.equal(deP.certifications, enP.certifications, "untouched sections shared");

delete globalThis.window;
delete globalThis.CustomEvent;

console.log("i18n smoke: all assertions passed");
