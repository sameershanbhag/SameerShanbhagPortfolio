/* German overrides for the text-bearing content in portfolio.js.
 * Shape mirrors portfolio.js; anything not overridden falls back to English
 * via the deep merge in getPortfolio(lang). Proper nouns (companies, products,
 * degree names) stay untouched.
 */

import {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  education,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
} from "./portfolio.js";

const de = {
  greeting: {
    subTitle:
      "Ich entwickle KI-Agenten und arbeite wie ein Forward Deployed Engineer — nah am Problem, mit Verantwortung von Anfang bis Ende. Bei Walmart Global Tech war ich Gründungsingenieur von Marty, einem der größten KI-Agenten von Walmart, und habe dessen Multi-Agent-Architektur vom Konzept bis in die Produktion gebracht. Die Abende gehören PyAutonomy, meinem local-first autonomen Agenten, und meinem Blog, in dem ich über Agent Engineering und die Ökonomie von LLM-Systemen schreibe. Ein Jahrzehnt in Fintech, Bioinformatik und der Halbleiterbranche hat mich gelehrt, Software zu bauen, die Bestand hat — in Agenten läuft all das zusammen.",
  },

  skills: {
    data: [
      {
        title: "KI- & Agent-Engineering — Forward Deployed",
        skills: [
          "⚡ Produktionsreife Multi-Agent-Systeme — Orchestrierungsgraphen, Sub-Agent-Routing und Checkpointing des Zustands, damit Agenten reale Ausfälle überstehen und mitten im Gespräch wieder aufsetzen",
          "⚡ Tief in der LLM-Toolchain zu Hause: LangGraph und LangChain, strukturierte Ausgaben und grammatikbeschränktes Tool-Calling, RAG über Vektorspeicher und die Prompt-Loop-Ökonomie KV-Cache-bewussten Kontextdesigns",
          "⚡ Agenten von Anfang bis Ende ausliefern — vom Orchestrierungs-Backend bis zu reichhaltiger, interaktiver UI als Agent-Ausgabe statt Textwänden",
          "⚡ Forward deployed aus Instinkt: eingebettet ins Geschäft, übersetze ich unordentliche reale Probleme in Agenten, die ausgeliefert werden — keine Demos",
        ],
      },
      {
        title: "Full-Stack-Softwareentwicklung",
        skills: [
          "⚡ Responsive und intuitive Weboberflächen mit einem geschulten Blick für User Experience — mit gängigen Web-Frameworks sorge ich für reibungslose Funktionalität über alle Browser hinweg",
          "⚡ Robuste und sichere serverseitige Anwendungen gehören zu meinem Handwerk: Backends entstehen bei mir mit Java und Spring ebenso wie mit Node und Express oder Flask",
          "⚡ Frontends baue ich mit React und Angular, gestaltet mit Tailwind oder Bootstrap — mit Fokus auf ansprechende, interaktive und einnehmende Benutzeroberflächen",
          "⚡ Als Experte für verteilte Systeme und Microservices entwerfe ich skalierbare, resiliente Architekturen mit Docker, Kubernetes und Cloud-Plattformen — mit Blick auf Performance, nahtlose Service-Integration und effizientes Deployment",
        ],
      },
      {
        title: "Multi-Cloud-Deployment",
        skills: [
          "⚡ Erfahrung mit mehreren Cloud-Plattformen",
          "⚡ Hosting und Betrieb von Websites auf virtuellen Maschinen samt Datenbankanbindung",
          "⚡ Ereignisgesteuerte Architekturen mit AWS Simple Notification Service, Simple Queue Service und Step Functions",
          "⚡ Streaming-Jobs zwischen Datenbank und Server auf GCP und AWS",
          "⚡ Serverless Functions, Scheduler und Cron-Jobs auf AWS",
        ],
      },
    ],
  },

  education: {
    description:
      "Mein akademischer Weg war eine stetige Entdeckungsreise. Begonnen habe ich mit dem Bachelorstudium der Informationstechnologie, das mir ein solides Fundament in den Software-Grundlagen gab und mein Interesse an den Feinheiten der Hardware weckte. Um tiefer einzusteigen, folgte der Master in Informatik. Das Studium vermittelte ein umfassendes Verständnis von Softwareentwicklung und -architektur und ließ mich die vielen Facetten dieses dynamischen Felds erkunden. Eine prägende Erfahrung, die nicht nur mein Wissen vertieft, sondern auch meine Begeisterung für technologische Innovation und Problemlösung genährt hat.",
  },

  degrees: {
    degrees: [
      {
        descriptions: [
          "⚡ Spezialisierung auf KI — Masterkurse in Graph Machine Learning und Computer Vision, das Fundament der Agentensysteme, die ich heute baue.",
          "⚡ Research Assistant am Integrated Genome Browser, einem DNA-Visualisierungstool für die Genomforschung — ich baute die zugehörige Website und lernte, was es heißt, Software für praktizierende Wissenschaftler auszuliefern.",
          "⚡ Praktikum bei Qualcomm im Bereich Audio-DSP-Tooling parallel zum Studium — das Praktikum, das in meine Festanstellung dort mündete.",
        ],
      },
      {
        descriptions: [
          "⚡ Der Informatik-Kern — Datenstrukturen, Algorithmen, Datenbanken, Betriebssysteme, Rechnerarchitektur und ein erster Kontakt mit KI.",
          "⚡ Über den Lehrplan hinaus: Python, Data Science, Cloud Computing und Full-Stack-Entwicklung — das Rüstzeug, das direkt in meinen ersten Job trug.",
          "⚡ Websites für Hochschul-Events im Tech-Team des Student Council — eine frühe Lektion darin, für echte Nutzer mit echten Deadlines zu bauen.",
        ],
      },
    ],
  },

  experience: {
    title: "Erfahrung",
    subtitle: "Beruf & Praktikum",
    description:
      "Meine Laufbahn führte von Fintech bei Morgan Stanley über Bioinformatik-Forschung und Audiosysteme bei Qualcomm dorthin, wo sie heute zeigt: KI-Agenten bei Walmart Global Tech. Diese Bandbreite erwies sich als perfekte Vorbereitung — Agenten liegen am Schnittpunkt von verteilten Systemen, Dateninfrastruktur und Produkt, und jede Station hat mich eines davon gelehrt. Heute konzentriere ich mich darauf, autonome Systeme zuverlässig genug für den Produktionsbetrieb im Handelsmaßstab zu machen.",
    sections: [
      {
        title: "Berufserfahrung",
        experiences: [
          {
            points: [
              "Gründungsingenieur von Marty, einem der größten KI-Agenten von Walmart — dessen Multi-Agent-Architektur habe ich vom Konzept bis in die Produktion gebracht. Ich baute die LangGraph-Orchestrierungsschicht, die Arbeit über spezialisierte Sub-Agenten verteilt, mit Checkpointing über Redis und Postgres, damit langlaufende Agent-Workflows Ausfälle überstehen und mitten im Gespräch wieder aufsetzen.",
              "Entwarf die Component Registry, mit der Marty mit echter Produkt-UI statt Textwänden antwortet: Sub-Agenten liefern strukturierte Ausgaben, die die Registry in interaktive, direkt in der App gerenderte Komponenten auflöst.",
              "Verantwortete die Billing-Services für Walmart Connect, das Werbegeschäft von Walmart — Java-Services auf Kubernetes, die Werbeausgaben in großem Volumen abstimmen und Billing-Events über Pub/Sub nach BigQuery streamen, mit PostgreSQL als führendem System.",
            ],
          },
          {
            points: [
              "Entwickelte eine dynamische Benutzeroberfläche mit React, HTML, CSS und JavaScript und band REST-APIs auf Basis von Java, Spring, Python und Django mit MySQL und DynamoDB an — für bessere Datenvisualisierung und höhere Kundenzufriedenheit.",
              "Leitete die Entwicklung eines Python-Statistikpakets für Audio-Algorithmus-Tests mit NumPy und SciPy und steigerte die Testpräzision um 80 %. Eine CI/CD-Pipeline mit Jenkins, Docker und Terraform senkte Deployment-Fehler um 20 %.",
              "Baute eine Audio-Logging-Bibliothek mit Python und Matplotlib für Echtzeit-Visualisierung und Hardware-Tuning, halbierte damit die Audio-Verarbeitungszeit und führte Agile/Scrum-Teams zu 20 % Kostenersparnis — zur Zufriedenheit der Stakeholder.",
            ],
          },
          {
            points: [
              "Leitete Entwicklung und Wartung des Integrated Genome Browser auf Basis von Java und dem OSGi-Framework und baute robuste RESTful APIs mit Spring Boot — gemeinsam mit einem Entwicklerteam und akademischer Fachbegleitung.",
              "Maßgeblich am Aufbau eines Appstores für den Browser mit Python und Django beteiligt, integrierte Java-basierte Dienste für nahtloses Zusammenspiel und deployte mit Ansible auf Amazon AWS EC2 für bessere Skalierbarkeit.",
              "Verantwortete zudem die Webanwendung Genome Dashboard, deren UI mit Python Flask, Vanilla JavaScript und Bootstrap entstand — für zuverlässige Kommunikation mit der Desktop-Anwendung und effiziente Darstellung von Genomdaten.",
            ],
          },
          {
            description:
              "Leitete die Entwicklung eines intelligenten Dokumenten-Organizers und eines NLP-Tools, die Suchzeiten um 90 % und manuelle Analysen um 80 % reduzierten, und entwickelte eine Website für erweiterte Datenanalyse mit anspruchsvollen Visualisierungen mit. Verantwortete eine Webanwendung auf Basis von Angular 6, HTML5, CSS und Java für Morgan Stanley in Partnerschaft mit Thomson Reuters, in der D3JS die Analyseeffizienz um 50 % steigerte. Entwickelte einen Machine-Learning-Prototyp zur automatischen Erkennung von Firmennamen mit Java, Python und NLP-Bibliotheken, der Genauigkeit und Relevanz der Daten deutlich verbesserte.",
          },
        ],
      },
      {
        title: "Praktika",
        experiences: [
          {
            description:
              "Straffte die Tests der Audio-DSP-Algorithmen, indem ich die CI/CD-Pipeline des Teams aufbaute und ein Python-Analyseskript schrieb, das den alten MATLAB-Workflow ablöste — ein Effizienzgewinn von 80 %, der neue Analysen für Entwickler deutlich leichter integrierbar machte. Aus dem Praktikum wurde eine Festanstellung.",
          },
        ],
      },
    ],
  },

  projectsHeader: {
    title: "Projekte",
    description:
      "Meine Arbeit hat sich auf KI-Agenten verdichtet — Orchestrierung, Tool-Nutzung, Gedächtnis und die Infrastruktur, die autonome Systeme zuverlässig macht. In diesen Projekten denke ich diese Ideen von Anfang bis Ende durch: Agent-Daemons, die auf der eigenen Maschine laufen, RAG-Anwendungen über persönliche Daten und die Cloud- und DevOps-Klempnerei, die sie in die Produktion trägt.",
  },

  publicationsHeader: {
    title: "Publikationen",
    description:
      "Ich habe an einem Forschungspaper mitgearbeitet und es veröffentlicht.",
  },

  publications: {
    data: [
      {
        description:
          "KI-Agent, der auf Basis von Vorlieben und früheren Käufen passende Produkte empfiehlt",
      },
    ],
  },

  contactPageData: {
    contactSection: {
      title: "Kontakt",
      description:
        "Interesse an einer Zusammenarbeit oder eine spannende Gelegenheit für mich? Schreib mir gern eine Nachricht — erreichbar bin ich über die Social-Media-Kanäle unten. ",
    },
    blogSection: {
      title: "Blog",
      subtitle:
        "Ich schreibe über KI-Agenten und das Engineering dahinter — Agent-Ökonomie, Orchestrierungsmuster, Deep-Dives in Modellarchitekturen und was in der Produktion wirklich trägt. Neue Beiträge erscheinen zuerst in meinem Blog.",
    },
    addressSection: {
      title: "Adresse",
      subtitle: "Irgendwo im World Wide Web :D",
    },
  },
};

function deepMerge(baseValue, override) {
  if (override === undefined) {
    return baseValue;
  }
  if (Array.isArray(baseValue) && Array.isArray(override)) {
    return baseValue.map((item, i) => deepMerge(item, override[i]));
  }
  if (
    baseValue !== null &&
    override !== null &&
    typeof baseValue === "object" &&
    typeof override === "object" &&
    !Array.isArray(baseValue) &&
    !Array.isArray(override)
  ) {
    const merged = { ...baseValue };
    for (const key of Object.keys(override)) {
      merged[key] = deepMerge(baseValue[key], override[key]);
    }
    return merged;
  }
  return override;
}

const englishPortfolio = {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  education,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};

let germanPortfolio = null;

export function getPortfolio(lang) {
  if (lang !== "de") {
    return englishPortfolio;
  }
  if (!germanPortfolio) {
    germanPortfolio = deepMerge(englishPortfolio, de);
  }
  return germanPortfolio;
}

export { de as germanOverrides };
