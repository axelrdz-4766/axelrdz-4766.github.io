export const siteUrl = 'https://axelrdz-4766.github.io';
export const name = 'Axel Rodriguez';
export const githubHandle = 'axelrdz-4766';
export const professionalProfiles = {
  github: { label: 'GitHub', url: 'https://github.com/' + githubHandle },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/axel-rodr%C3%ADguez-pati%C3%B1o/' },
  hackTheBox: { label: 'Hack The Box', url: 'https://app.hackthebox.com/public/users/1799296' },
} as const;

export const languages = ['en', 'es'] as const;
export type Language = (typeof languages)[number];

const paths = {
  home: { en: '/', es: '/es/' },
  about: { en: '/about/', es: '/es/sobre-mi/' },
  projects: { en: '/projects/', es: '/es/proyectos/' },
  writing: { en: '/writing/', es: '/es/articulos/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  research: { en: '/research/', es: '/es/investigacion/' },
} as const;

export type Page = keyof typeof paths;
export type Alternates = Partial<Record<Language, string>>;
export const corePages = ['home', 'about', 'projects', 'writing', 'contact'] as const;
export const navigation = ['about', 'projects', 'writing', 'contact'] as const;
export const pagePath = (page: Page, language: Language) => paths[page][language];
export const infinitePath = (language: Language) => pagePath('projects', language) + 'infinite/';
export const absolute = (path: string) => new URL(path, siteUrl).href;

export const content = {
  en: {
    pages: {
      home: ['Axel Rodriguez', 'Axel Rodriguez develops software, co-founded Octopus Labs, and studies computer science independently. He writes about engineering and research.'],
      about: ['About', 'How Axel Rodriguez learns across disciplines, what penetration testing taught him about perspective, and how he applies those ideas to building Infinite.'],
      projects: ['Projects', 'Projects by Axel Rodriguez, featuring Infinite, the main project of Octopus Labs.'],
      writing: ['Writing', 'Technical articles, notes, and experiments by Axel Rodriguez.'],
      contact: ['Contact', 'Find Axel Rodriguez on GitHub, LinkedIn, and Hack The Box.'],
      research: ['Research', 'Research notes, experiments, and scientific publications by Axel Rodriguez.'],
    },
    homeTitle: 'Axel Rodriguez | Engineering and research · Octopus Labs',
    intro: [
      'I develop software, co-founded Octopus Labs, and study computer science on my own. I like understanding how things work under the hood, from hardware to artificial intelligence.',
      'I’m obsessed with understanding why something works the way it does and what I could do to improve it. The harder it looks to fix, the more I want to try. Building and experimenting is my favorite way to find out.',
    ],
    homeQuote: 'We must know, we will know.',
    interestsTitle: 'Interests',
    interests: ['Computer Science', 'Artificial Intelligence', 'Software Engineering', 'Software Architecture', 'Cybersecurity', 'AI Security', 'Scientific Research'],
    selected: 'Selected project',
    infinite: 'An agentic system from Octopus Labs for coordinating marketing work.',
    viewProject: 'View',
    githubLabel: 'GitHub profile',
    professionalProfiles: 'Professional profiles',
    contact: 'You can find me on these professional profiles.',
    writingEmpty: 'No articles have been published yet.',
    recent: 'Recent writing',
    references: 'References',
    repository: 'Related repository',
    updated: 'Updated',
    onThisPage: 'On this page',
    skip: 'Skip to content',
    primaryNavigation: 'Main navigation',
    languageNavigation: 'Language',
    darkTheme: 'Dark theme',
    theme: 'Theme',
    notFound: 'Page not found',
    returnHome: 'Return to the home page',
  },
  es: {
    pages: {
      home: ['Axel Rodriguez', 'Axel Rodriguez desarrolla software, es cofundador de Octopus Labs y estudia ciencias de la computación por su cuenta. Escribe sobre ingeniería e investigación.'],
      about: ['Sobre mí', 'Cómo aprende Axel Rodriguez entre disciplinas, qué le enseñó su formación como pentester y cómo aplica esas ideas al desarrollar Infinite.'],
      projects: ['Proyectos', 'Proyectos de Axel Rodriguez, incluido Infinite, el proyecto principal de Octopus Labs.'],
      writing: ['Artículos', 'Artículos técnicos, notas y experimentos de Axel Rodriguez.'],
      contact: ['Contacto', 'Encuentra a Axel Rodriguez en GitHub, LinkedIn y Hack The Box.'],
      research: ['Investigación', 'Notas de investigación, experimentos y publicaciones científicas de Axel Rodriguez.'],
    },
    homeTitle: 'Axel Rodriguez | Ingeniería e investigación · Octopus Labs',
    intro: [
      'Desarrollo software, soy cofundador de Octopus Labs y estudio ciencias de la computación por mi cuenta. Me gusta entender cómo funcionan las cosas por dentro, desde el hardware hasta la inteligencia artificial.',
      'Me obsesiona entender por qué algo funciona como funciona y qué podría hacer para mejorarlo. Cuanto más difícil parece arreglarlo, más ganas me dan de intentarlo. Construir y experimentar es mi forma favorita de averiguarlo.',
    ],
    homeQuote: 'Debemos saber, sabremos',
    interestsTitle: 'Intereses',
    interests: ['Ciencias de la computación', 'Inteligencia artificial', 'Ingeniería de software', 'Arquitectura de software', 'Ciberseguridad', 'Seguridad de IA', 'Investigación científica'],
    selected: 'Proyecto destacado',
    infinite: 'Sistema agéntico de Octopus Labs para coordinar trabajo de marketing.',
    viewProject: 'Ver',
    githubLabel: 'Perfil de GitHub',
    professionalProfiles: 'Perfiles profesionales',
    contact: 'Puedes encontrarme en estos perfiles profesionales.',
    writingEmpty: 'Todavía no hay artículos publicados.',
    recent: 'Publicaciones recientes',
    references: 'Referencias',
    repository: 'Repositorio relacionado',
    updated: 'Actualizado',
    onThisPage: 'En esta página',
    skip: 'Ir al contenido',
    primaryNavigation: 'Navegación principal',
    languageNavigation: 'Idioma',
    darkTheme: 'Tema oscuro',
    theme: 'Tema',
    notFound: 'Página no encontrada',
    returnHome: 'Volver al inicio',
  },
} as const;

export function formatDate(value: string, language: Language) {
  return new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(value));
}
