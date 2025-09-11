export type Writing = {
  slug: string; title: string; excerpt: string;
  category: "Landing" | "Case Study" | "Microcopy" | "Long-form";
  status: "draft" | "published" | "archived";
  visible: boolean; navVisible: boolean;
  pullquote?: string; readingTime?: number;
};

const writings: Writing[] = [
  {
    slug: "voice-and-clarity",
    title: "Voice & Clarity for SaaS Onboarding",
    excerpt: "Restructuring first-run with crisp, low-friction copy.",
    category: "Case Study",
    status: "published",
    visible: true,
    navVisible: true,
    pullquote: "Reduce friction, reveal intent.",
    readingTime: 6
  },
  {
    slug: "microcopy-does-the-lifting",
    title: "Microcopy Does the Lifting",
    excerpt: "Tiny words, big outcomes.",
    category: "Microcopy",
    status: "published",
    visible: true,
    navVisible: false,
    readingTime: 3
  }
];

export default writings;
