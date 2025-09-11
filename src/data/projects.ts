export type Project = {
  slug: string; title: string; excerpt: string;
  status: "draft" | "published" | "archived";
  visible: boolean; navVisible: boolean;
  cover?: string;
  metrics?: { label: string; value: string }[];
  gallery?: string[];
};

const projects: Project[] = [
  {
    slug: "ai-portfolio-booster",
    title: "AI Portfolio Booster",
    excerpt: "Landing + copy framework to lift profile→DM conversion.",
    status: "published",
    visible: true,
    navVisible: true,
    metrics: [{ label: "Profile → DM", value: "+38%" }, { label: "Time to ship", value: "48h" }],
    gallery: []
  },
  {
    slug: "clarity-first-web",
    title: "Clarity-First Web",
    excerpt: "Ultra-fast one-pager template for freelancers.",
    status: "published",
    visible: true,
    navVisible: false
  }
];

export default projects;
