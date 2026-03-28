// CHANGELOG: 19/03/2026 - Centralized data source for navigation menus (Desktop and Mobile).

export type NavSubItem = {
  label: string;
  url: string;
  badge?: { text: string; type: "new" | "saas" | "teams" };
  subtext?: string;
};

export type NavItemConfig = {
  label: string;
  url: string;
  subItems?: NavSubItem[];
  badge?: { text: string; type: "new" | "saas" | "teams" };
  subtext?: string;
  isDivider?: boolean;
  isSubtitle?: boolean;
};

export type NavColumn = {
  title: string;
  items: NavItemConfig[];
  bottomLink?: { label: string; url: string };
};

export type MainNavItem = {
  id: string;
  label: string;
  url?: string;
  type: "link" | "mega" | "dropdown";
  columns?: NavColumn[];
  bottomAction?: { label: string; url: string };
};

export const navigationLabels = {
  about: "Quiénes somos",
  clients: "Clientes y casos",
  resources: "Recursos"
} as const;

export const mainNav: MainNavItem[] = [
  {
    id: "soluciones",
    label: "Soluciones",
    type: "mega",
    columns: [
      {
        title: "Autoría & Video",
        items: [
          { label: "Articulate 360", url: "/articulate-360-mexico", subItems: [
              { label: "Rise 360", url: "/articulate-rise360" },
              { label: "Storyline 360", url: "/articulate-storyline360" },
              { label: "Review 360", url: "/articulate-review360" },
              { label: "Reach", url: "/articulate-reach", badge: { text: "Teams", type: "teams" } },
              { label: "AI Assistant", url: "/articulate-ai-assistant", badge: { text: "add-on", type: "new" } },
              { label: "Localization", url: "/articulate-localization", badge: { text: "nuevo", type: "new" } }
            ]
          },
          { label: "Vyond", url: "/vyond-mexico", subItems: [
              { label: "Vyond Go", url: "/vyond-go", badge: { text: "IA", type: "new" } },
              { label: "Vyond Studio", url: "/vyond-studio" },
              { label: "Vyond Mobile", url: "/vyond-mobile" },
              { label: "Enterprise", url: "/vyond-enterprise" },
              { label: "Professional", url: "/vyond-professional" },

            ]
          }
        ]
      },
      {
        title: "Plataformas & LMS",
        items: [
          { label: "Moodle", url: "/moodle-mexico", badge: { text: "SaaS", type: "saas" } },
          { label: "Totara", url: "/totara-lms-mexico", badge: { text: "SaaS", type: "saas" } },
          { label: "Pifini Learn", url: "/pifini-mexico", badge: { text: "SaaS", type: "saas" } },
          { label: "Ottolearn", url: "/ottolearn-mexico", badge: { text: "SaaS", type: "saas" } },
          { label: "Lys", url: "/lys-mexico", badge: { text: "SaaS", type: "saas" } }
        ]
      },
      {
        title: "Servicios & Add-ons",
        items: [
          { label: "Desarrollo de Contenidos", url: "/desarrollo-de-contenidos", badge: { text: "DDC", type: "new" } },
          { label: "divider", url: "", isDivider: true },
          { label: "Class", url: "/class-taec", subtext: "(videoclases)" },
          { label: "Proctorizer", url: "/proctorizer-mexico" },
          { label: "StrikePlagiarism", url: "/strikeplagiarism-mexico" },
          { label: "divider", url: "", isDivider: true },
          { label: "Catálogo listo", url: "", isSubtitle: true },
          { label: "7 Minutes", url: "/7minutes-learning" },
          { label: "Custom Guide", url: "/customguide-mexico" }
        ]
      }
    ],
    bottomAction: { label: "Ver todas las soluciones →", url: "/soluciones" }
  },
  {
    id: "capacitacion",
    label: "Capacitación",
    type: "dropdown",
    columns: [
      {
        title: "Cursos Abiertos",
        items: [
          { label: "Articulate 360", url: "/curso-articulate" },
          { label: "Vyond", url: "/curso-vyond" },
          { label: "Storyline Avanzado", url: "/curso-storyline" },
          { label: "Moodle", url: "/curso-moodle" },
          { label: "Fundamentos e-learning", url: "/curso-fundamentos" }
        ],
        bottomLink: { label: "Ver calendario →", url: "/capacitacion-abierta" }
      },
      {
        title: "Cursos Cerrados",
        items: [
          { label: "Para tu empresa", url: "/curso-cerrado-empresa" },
          { label: "Grupos a medida", url: "/curso-cerrado-grupos" }
        ],
        bottomLink: { label: "Solicitar programa →", url: "/contacto" }
      }
    ]
  },
  {
    id: "nosotros",
    label: navigationLabels.about,
    type: "link",
    url: "/nosotros"
  },
  {
    id: "recursos",
    label: navigationLabels.resources,
    type: "dropdown",
    columns: [
      {
        title: "",
        items: [
          { label: "Blog", url: "/blog" },
          { label: "Artículos", url: "/articulos" },
          { label: "Glosario e-learning", url: "/glosario" },
          { label: "Comparativos", url: "/comparativos" },
          { label: "Estándares", url: "/estandares" },
          { label: "Radar", url: "/radar" },
          { label: "Quiz & Flashcards", url: "/quiz" },
          { label: "divider", url: "", isDivider: true }
        ],
        bottomLink: { label: "Ver todos →", url: "/recursos" }
      }
    ]
  },
  {
    id: "clientes",
    label: navigationLabels.clients,
    type: "link",
    url: "/clientes"
  },
  {
    id: "contacto",
    label: "Contacto",
    type: "link",
    url: "/contacto"
  }
];

export const footerLinks = [
  {
    title: "Soluciones",
    items: [
      { label: "Articulate 360", url: "/articulate-360-mexico" },
      { label: "Vyond", url: "/vyond-mexico" },
      { label: "Moodle", url: "/moodle-mexico" },
      { label: "Totara LMS", url: "/totara-lms-mexico" },
      { label: "Todas las soluciones →", url: "/contacto" }
    ]
  },
  {
    title: navigationLabels.resources,
    items: [
      { label: "Blog", url: "/blog" },
      { label: "Artículos", url: "/articulos" },
      { label: "Glosario e-learning", url: "/glosario" },
      { label: "Comparativos", url: "/comparativos" },
      { label: "Ver todos →", url: "/recursos" }
    ]
  },
  {
    title: "Empresa",
    items: [
      { label: navigationLabels.about, url: "/nosotros" },
      { label: navigationLabels.clients, url: "/clientes" },
      { label: "Tienda", url: "https://tienda.taec.com.mx" },
      { label: "Contacto", url: "/contacto" },
      { label: "Soporte técnico", url: "https://www.taec.com.mx/soporte-tecnico.php" }
    ]
  }
];
