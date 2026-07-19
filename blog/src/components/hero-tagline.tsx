"use client";

import { useLang } from "@/lib/lang";

export default function HeroTagline() {
  const lang = useLang();
  if (lang === "de") {
    return (
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted leading-relaxed">
        Texte über Software-Engineering, KI-Agenten und was ich sonst gerade
        baue. Neue Beiträge erscheinen zuerst hier — ich schreibe auf Englisch.
      </p>
    );
  }
  return (
    <p className="mx-auto mt-4 max-w-xl text-lg text-muted leading-relaxed">
      Writing on software engineering, AI agents, and whatever else I&apos;m
      building. New posts land here first.
    </p>
  );
}
