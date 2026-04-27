export const siteConfig = {
  name: "Moustafa Rakha",
  title: "Software Engineer",
  description:
    "Building reliable, scalable software — from clean APIs to polished UIs — with a focus on developer experience and shipping products that matter.",
  email: "moustafa.hassan.rakha@gmail.com",
  github: "https://github.com/maxlar01",
  linkedin: "https://www.linkedin.com/in/moustafa-rakha/",
  twitter: "https://twitter.com/maxlar_",
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "Testing", "System Design", "Agile", "CI/CD"],
  },
];

export const experiences = [
  {
    role: "Software Engineer",
    company: "b_labs",
    period: "2026 – Present",
    description:
      "Building and shipping software across the full stack, collaborating with product and design to deliver features end-to-end. Also own the infrastructure layer — managing AWS environments, Kubernetes clusters, and CI/CD pipelines to keep deployments fast, reliable, and observable.",
  },
  {
    role: "Software Engineer",
    company: "Sylndr",
    period: "2024 – 2026",
    description:
      "Worked across Sylndr's retail, wholesale, and fintech products — including the main Website, Mobile app, elAjans, and Sylndr Swift. Contributed to feature development, performance improvements, and the internal tooling that kept the engineering team moving quickly.",
  },
  {
    role: "Software Engineer",
    company: "MegaSoft IT Consulting and Training",
    period: "2023 – 2024",
    description:
      "Developed the GlowEye front-end on IBM Cognos for Telecom Egypt and built custom TypeScript data visualizations that replaced generic Cognos charts with purpose-built, interactive components tailored to client reporting needs.",
  },
];

export const projects = [
  {
    title: "maxlar.dev",
    description:
      "This portfolio — a fast, animated personal site built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, tsParticles background, Framer Motion page transitions, and statically generated blog posts from Markdown.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/maxlar01/website",
    live: "https://maxlar.dev",
    featured: true,
  },
  {
    title: "Docker Image Optimizer (DIO)",
    description:
      "A developer-productivity CLI tool written in Go that analyzes Docker images, surfaces layer-by-layer optimization opportunities, and enforces security best practices — helping teams ship smaller, safer container images.",
    tags: ["Go", "Docker", "CLI", "Developer Tools"],
    github: "https://github.com/maxlar01/docker-image-optimizer",
    live: "",
    featured: true,
  },
  {
    title: "Realtime Chat API",
    description:
      "A scalable WebSocket-based chat backend built with Node.js and Redis Pub/Sub. Supports multiple rooms, presence tracking, and message history with a PostgreSQL persistence layer.",
    tags: ["Node.js", "WebSockets", "Redis", "PostgreSQL"],
    github: "https://github.com/maxlar01",
    live: "",
    featured: true,
  },
  {
    title: "Form Builder",
    description:
      "A drag-and-drop form builder SPA with a React frontend and a REST API backend. Supports conditional logic, multi-step forms, response collection, and CSV export.",
    tags: ["React", "TypeScript", "Node.js", "REST API"],
    github: "https://github.com/maxlar01",
    live: "",
    featured: false,
  },
  {
    title: "Dev Notes",
    description:
      "A markdown-first note-taking app with full-text search, tag filtering, and syntax-highlighted code blocks. Built as a Next.js app with local-first storage using IndexedDB.",
    tags: ["Next.js", "TypeScript", "IndexedDB", "Markdown"],
    github: "https://github.com/maxlar01",
    live: "",
    featured: false,
  },
  {
    title: "Budget Tracker CLI",
    description:
      "A terminal-based personal finance tracker written in Python. Parses bank statement CSVs, categorizes transactions with a simple rules engine, and renders monthly reports in the terminal.",
    tags: ["Python", "CLI", "Data Parsing", "Finance"],
    github: "https://github.com/maxlar01",
    live: "",
    featured: false,
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "type-safe-rest-api-nodejs-typescript",
    title: "Building a Type-Safe REST API with Node.js and TypeScript",
    excerpt:
      "A practical walkthrough for setting up an Express API with end-to-end type safety using TypeScript, Zod for runtime validation, and Prisma as a type-safe ORM.",
    date: "2026-02-10",
    readTime: "10 min read",
    tags: ["Node.js", "TypeScript", "REST API", "Backend"],
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Patterns and Pitfalls",
    excerpt:
      "A deep-dive into React rendering behaviour — when to use memo, useMemo, and useCallback, how to profile with DevTools, and common mistakes that silently kill performance.",
    date: "2026-01-18",
    readTime: "12 min read",
    tags: ["React", "Performance", "Frontend"],
  },
  {
    slug: "scalable-database-schema-design",
    title: "Designing Scalable Database Schemas",
    excerpt:
      "How to design relational schemas that age well: normalization trade-offs, indexing strategies, pagination patterns, and when to reach for denormalization.",
    date: "2025-12-05",
    readTime: "11 min read",
    tags: ["Databases", "PostgreSQL", "System Design"],
  },
  {
    slug: "cicd-for-modern-web-apps",
    title: "CI/CD for Modern Web Apps: A Practical Guide",
    excerpt:
      "Setting up a production-grade CI/CD pipeline for a Next.js app — automated testing, preview deployments, semantic versioning, and rollback strategies using GitHub Actions.",
    date: "2025-11-14",
    readTime: "9 min read",
    tags: ["CI/CD", "GitHub Actions", "DevOps", "Next.js"],
  },
  {
    slug: "monolith-to-microservices",
    title: "System Design: From Monolith to Microservices",
    excerpt:
      "When a monolith stops scaling and when it doesn't. A pragmatic guide to identifying service boundaries, handling distributed data, and avoiding the common pitfalls of premature decomposition.",
    date: "2025-10-22",
    readTime: "14 min read",
    tags: ["System Design", "Microservices", "Architecture"],
  },
];
