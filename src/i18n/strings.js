// UI string dictionary for the portfolio. Keep keys identical across languages.

const en = {
  // Navigation
  navHome: "Home",
  navEducation: "Education",
  navExperience: "Experience",
  navProjects: "Projects",
  navBlog: "Blog",
  navContact: "Contact Me",

  // Home
  whatIDo: "What I Do?",
  starMeOnGithub: "⭐ Star Me On Github",

  // Education page
  educationHeading: "Education",
  educationSubHeading: "Basic Qualification and Certifications",
  degreesReceived: "Degrees Received",
  certifications: "Certifications",
  certificate: "Certificate",
  visitWebsite: "Visit Website",

  // Experience page (accordion titles come from portfolio data)
  accordionWork: "Work",
  accordionInternships: "Internships",

  // Projects page
  moreProjects: "More Projects",
  viewOnGithub: "View on GitHub →",
  readThePaper: "Read the paper →",
  published: "Published",

  // Contact page
  seeMyResume: "See My Resume",
  visitMyBlogsite: "Visit My Blogsite",
  visitOnGoogleMaps: "Visit on Google Maps",

  // Footer / misc
  madeWithLoveBy: "Made with", // rendered as: Made with ❤️ by {name}
  by: "by",
  goUp: "Go up",

  // 404 page
  errorWoops: "Woops",
  errorMessage: "The requested page is unavailable at the moment!",
  errorGoHome: "Go Home",
};

const de = {
  // Navigation
  navHome: "Startseite",
  navEducation: "Ausbildung",
  navExperience: "Erfahrung",
  navProjects: "Projekte",
  navBlog: "Blog",
  navContact: "Kontakt",

  // Home
  whatIDo: "Was ich mache",
  starMeOnGithub: "⭐ Auf GitHub markieren",

  // Education page
  educationHeading: "Ausbildung",
  educationSubHeading: "Abschlüsse und Zertifizierungen",
  degreesReceived: "Akademische Abschlüsse",
  certifications: "Zertifizierungen",
  certificate: "Zertifikat",
  visitWebsite: "Website besuchen",

  // Experience page
  accordionWork: "Berufserfahrung",
  accordionInternships: "Praktika",

  // Projects page
  moreProjects: "Weitere Projekte",
  viewOnGithub: "Auf GitHub ansehen →",
  readThePaper: "Zum Paper →",
  published: "Veröffentlicht",

  // Contact page
  seeMyResume: "Lebenslauf ansehen",
  visitMyBlogsite: "Zu meinem Blog",
  visitOnGoogleMaps: "Auf Google Maps ansehen",

  // Footer / misc
  madeWithLoveBy: "Gemacht mit",
  by: "von",
  goUp: "Nach oben",

  // 404 page
  errorWoops: "Hoppla",
  errorMessage: "Die angeforderte Seite ist momentan nicht verfügbar!",
  errorGoHome: "Zur Startseite",
};

const dictionaries = { en, de };

export function getStrings(lang) {
  return dictionaries[lang] || en;
}

export { en, de };
