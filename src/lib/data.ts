export const siteConfig = {
  name: "Moustafa Rakha",
  title: "DevOps Engineer",
  description:
    "Building resilient infrastructure, automating everything, and bridging the gap between development and operations.",
  email: "moustafa.hassan.rakha@gmail.com",
  github: "https://github.com/maxlar01",
  linkedin: "https://www.linkedin.com/in/moustafa-rakha/",
  twitter: "https://twitter.com/maxlar_",
};

export const skills = [
  {
    category: "Cloud Platforms",
    items: ["AWS", "Google Cloud", "Azure", "DigitalOcean"],
  },
  {
    category: "Containers & Orchestration",
    items: ["Docker", "Kubernetes", "Helm", "Podman"],
  },
  {
    category: "CI/CD",
    items: ["GitHub Actions", "GitLab CI", "ArgoCD"],
  },
  {
    category: "Infrastructure as Code",
    items: ["Terraform", "Ansible"],
  },
  {
    category: "Monitoring & Observability",
    items: ["Prometheus", "Grafana", "Datadog", "ELK Stack"],
  },
  {
    category: "Scripting & Languages",
    items: ["Python", "Bash", "Go", "TypeScript"],
  },
];

export const experiences = [
  {
    role: "DevOps Engineer",
    company: "b_labs",
    period: "2026 – Present",
    description:
      "Building and maintaining scalable infrastructure on AWS, implementing GitOps workflows with ArgoCD, and optimizing CI/CD pipelines for multiple teams. Managing Kubernetes clusters, automated deployments, and improved monitoring and alerting systems to ensure high availability and performance.",
  },
  {
    role: "Software Engineer",
    company: "Sylndr",
    period: "2024 – 2026",
    description:
      "Built CI/CD pipelines, dockerfiles, and worked on most of Sylndr's retail, wholesale and fintech products (Website, Mobile app, elAjans and Sylndr Swift).",
  },
  {
    role: "Software Engineer",
    company: "MegaSoft IT Consulting and Training",
    period: "2023 – 2024",
    description:
      "Managed Linux servers, developed GlowEye software front-end on IBM Cognos for Telecom Egypt, and developed custom TypeScript visualizations for IBM Cognos.",
  },
];

export const projects = [
  {
    title: "Docker Image Optimizer (DIO)",
    description:
      "An automated pipeline that analyzes Docker images, suggests optimizations, reduces image sizes, and enforces security best practices.",
    tags: ["Docker", "Go", "Security", "Automation"],
    github: "https://github.com/maxlar01/docker-image-optimizer",
    live: "",
    featured: true,
  },
  {
    title: "K8s Multi-Cluster Manager",
    description:
      "An open-source tool for managing deployments across multiple Kubernetes clusters with automated failover and traffic shifting. Built with Go and integrates with ArgoCD for GitOps workflows.",
    tags: ["Kubernetes", "Go", "ArgoCD", "GitOps"],
    github: "https://github.com",
    live: "",
    featured: true,
  },
  {
    title: "Terraform AWS Landing Zone",
    description:
      "A production-ready Terraform module for setting up a secure, multi-account AWS organization with VPC networking, IAM policies, and security guardrails.",
    tags: ["Terraform", "AWS", "IaC", "Security"],
    github: "https://github.com",
    live: "",
    featured: true,
  },
  {
    title: "CI/CD Pipeline Generator",
    description:
      "A CLI tool that generates optimized CI/CD pipelines for GitHub Actions, GitLab CI, and Jenkins based on your project's tech stack and requirements.",
    tags: ["Python", "GitHub Actions", "GitLab CI", "CLI"],
    github: "https://github.com",
    live: "",
    featured: false,
  },
  {
    title: "Prometheus Alert Manager Dashboard",
    description:
      "A custom Grafana dashboard and Prometheus alerting ruleset for monitoring Kubernetes clusters, with Slack and PagerDuty integrations.",
    tags: ["Prometheus", "Grafana", "Kubernetes", "Monitoring"],
    github: "https://github.com",
    live: "",
    featured: false,
  },
  {
    title: "Infrastructure Cost Analyzer",
    description:
      "A tool that analyzes cloud infrastructure spending across AWS, GCP, and Azure, providing actionable recommendations for cost optimization.",
    tags: ["Python", "AWS", "GCP", "Azure", "FinOps"],
    github: "https://github.com",
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
    slug: "kubernetes-zero-downtime-deployments",
    title: "Zero-Downtime Deployments on Kubernetes: A Practical Guide",
    excerpt:
      "Learn how to implement rolling updates, blue-green deployments, and canary releases on Kubernetes to achieve true zero-downtime deployments for your applications.",
    date: "2026-01-15",
    readTime: "8 min read",
    tags: ["Kubernetes", "DevOps", "Deployment"],
  },
  {
    slug: "terraform-best-practices-2026",
    title: "Terraform Best Practices for Production in 2026",
    excerpt:
      "A comprehensive guide to structuring Terraform code for large-scale production environments, including module design, state management, and testing strategies.",
    date: "2025-12-20",
    readTime: "12 min read",
    tags: ["Terraform", "IaC", "Best Practices"],
  },
  {
    slug: "gitops-with-argocd",
    title: "Getting Started with GitOps Using ArgoCD",
    excerpt:
      "A hands-on tutorial for implementing GitOps workflows with ArgoCD, from installation to managing production applications declaratively through Git.",
    date: "2025-11-10",
    readTime: "10 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes"],
  },
  {
    slug: "monitoring-kubernetes-prometheus-grafana",
    title: "Complete Kubernetes Monitoring with Prometheus & Grafana",
    excerpt:
      "Set up comprehensive monitoring for your Kubernetes clusters using the Prometheus-Grafana stack, including custom metrics, alerts, and dashboards.",
    date: "2025-10-05",
    readTime: "15 min read",
    tags: ["Monitoring", "Prometheus", "Grafana", "Kubernetes"],
  },
  {
    slug: "docker-security-best-practices",
    title: "Docker Security: Hardening Your Container Images",
    excerpt:
      "Learn essential Docker security practices including minimal base images, multi-stage builds, vulnerability scanning, and runtime security configurations.",
    date: "2025-09-18",
    readTime: "9 min read",
    tags: ["Docker", "Security", "Containers"],
  },
];
