export const siteConfig = {
  name: "Moustafa Rakha",
  title: "DevOps Engineer",
  description:
    "Building resilient infrastructure, automating everything, and bridging the gap between development and operations.",
  email: "moustafa.hassan.rakha@gmail.com",
  github: "https://github.com/maxlar01",
  linkedin: "https://linkedin.com/moustafa-rakha",
  twitter: "https://twitter.com/maxlar01",
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
    items: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD"],
  },
  {
    category: "Infrastructure as Code",
    items: ["Terraform", "Ansible", "Pulumi", "CloudFormation"],
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
    role: "Senior DevOps Engineer",
    company: "CloudScale Inc.",
    period: "2023 – Present",
    description:
      "Leading infrastructure automation for a SaaS platform serving 2M+ users. Reduced deployment times by 80% and achieved 99.99% uptime through GitOps workflows and Kubernetes.",
  },
  {
    role: "DevOps Engineer",
    company: "DataFlow Systems",
    period: "2021 – 2023",
    description:
      "Built CI/CD pipelines, managed multi-cloud Kubernetes clusters, and implemented infrastructure as code with Terraform across 3 cloud providers.",
  },
  {
    role: "Systems Engineer",
    company: "TechStart Labs",
    period: "2019 – 2021",
    description:
      "Managed Linux server fleets, implemented configuration management with Ansible, and migrated legacy applications to containerized deployments.",
  },
];

export const projects = [
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
    featured: true,
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
    title: "Docker Image Optimizer",
    description:
      "An automated pipeline that analyzes Docker images, suggests optimizations, reduces image sizes by up to 60%, and enforces security best practices.",
    tags: ["Docker", "Python", "Security", "Automation"],
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

export const blogPosts = [
  {
    slug: "kubernetes-zero-downtime-deployments",
    title: "Zero-Downtime Deployments on Kubernetes: A Practical Guide",
    excerpt:
      "Learn how to implement rolling updates, blue-green deployments, and canary releases on Kubernetes to achieve true zero-downtime deployments for your applications.",
    date: "2026-01-15",
    readTime: "8 min read",
    tags: ["Kubernetes", "DevOps", "Deployment"],
    content: `
## Introduction

Zero-downtime deployments are critical for modern applications. Users expect services to be available 24/7, and any interruption can lead to lost revenue and damaged trust.

In this guide, we'll explore three strategies for achieving zero-downtime deployments on Kubernetes:

### 1. Rolling Updates

Rolling updates are the default deployment strategy in Kubernetes. They gradually replace old pods with new ones.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
\`\`\`

The key settings are \`maxSurge\` (extra pods during update) and \`maxUnavailable\` (pods that can be down). Setting \`maxUnavailable: 0\` ensures no downtime.

### 2. Blue-Green Deployments

Blue-green deployments maintain two identical environments. Traffic switches from blue (current) to green (new) instantly.

### 3. Canary Releases

Canary releases gradually shift traffic to the new version, allowing you to monitor for issues before full rollout.

## Conclusion

Each strategy has trade-offs. Rolling updates are simplest, blue-green gives instant rollback, and canary releases offer the most control. Choose based on your application's needs.
    `,
  },
  {
    slug: "terraform-best-practices-2026",
    title: "Terraform Best Practices for Production in 2026",
    excerpt:
      "A comprehensive guide to structuring Terraform code for large-scale production environments, including module design, state management, and testing strategies.",
    date: "2025-12-20",
    readTime: "12 min read",
    tags: ["Terraform", "IaC", "Best Practices"],
    content: `
## Why Terraform Best Practices Matter

As infrastructure grows, poorly structured Terraform code becomes a liability. Here are battle-tested practices for keeping your IaC manageable.

### Module Design

Structure your modules with clear inputs and outputs:

\`\`\`hcl
module "vpc" {
  source = "./modules/vpc"
  
  environment = var.environment
  cidr_block  = var.vpc_cidr
  
  tags = local.common_tags
}
\`\`\`

### State Management

- Use remote state with locking (S3 + DynamoDB)
- Separate state files per environment
- Never store secrets in state

### Testing

Use Terratest or OpenTofu's built-in testing framework to validate your infrastructure code before applying.

## Key Takeaways

Invest in structure early—it pays dividends as your infrastructure scales.
    `,
  },
  {
    slug: "gitops-with-argocd",
    title: "Getting Started with GitOps Using ArgoCD",
    excerpt:
      "A hands-on tutorial for implementing GitOps workflows with ArgoCD, from installation to managing production applications declaratively through Git.",
    date: "2025-11-10",
    readTime: "10 min read",
    tags: ["GitOps", "ArgoCD", "Kubernetes"],
    content: `
## What is GitOps?

GitOps is an operational framework that uses Git as the single source of truth for declarative infrastructure and applications.

### Why ArgoCD?

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It automates the deployment of applications to specified target environments.

### Installation

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
\`\`\`

### Creating Your First Application

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-app.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: production
\`\`\`

## Conclusion

GitOps with ArgoCD provides audit trails, easy rollbacks, and a consistent deployment process.
    `,
  },
  {
    slug: "monitoring-kubernetes-prometheus-grafana",
    title: "Complete Kubernetes Monitoring with Prometheus & Grafana",
    excerpt:
      "Set up comprehensive monitoring for your Kubernetes clusters using the Prometheus-Grafana stack, including custom metrics, alerts, and dashboards.",
    date: "2025-10-05",
    readTime: "15 min read",
    tags: ["Monitoring", "Prometheus", "Grafana", "Kubernetes"],
    content: `
## The Observability Stack

Modern Kubernetes monitoring requires metrics, logs, and traces. Prometheus and Grafana form the backbone of the metrics layer.

### Setting Up Prometheus

Use the kube-prometheus-stack Helm chart for a production-ready setup:

\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack
\`\`\`

### Custom Metrics

Instrument your applications with Prometheus client libraries to expose custom business metrics.

### Alert Rules

Define meaningful alerts that are actionable, not noisy:

\`\`\`yaml
groups:
  - name: app-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
\`\`\`

## Building Dashboards

Create Grafana dashboards that tell a story about your system's health, from infrastructure to application-level metrics.
    `,
  },
  {
    slug: "docker-security-best-practices",
    title: "Docker Security: Hardening Your Container Images",
    excerpt:
      "Learn essential Docker security practices including minimal base images, multi-stage builds, vulnerability scanning, and runtime security configurations.",
    date: "2025-09-18",
    readTime: "9 min read",
    tags: ["Docker", "Security", "Containers"],
    content: `
## Why Container Security Matters

Containers share the host kernel, making security crucial. A compromised container can potentially affect the entire host.

### Minimal Base Images

Use distroless or Alpine-based images to minimize attack surface:

\`\`\`dockerfile
FROM gcr.io/distroless/static-debian12
COPY --from=builder /app /app
ENTRYPOINT ["/app"]
\`\`\`

### Multi-Stage Builds

Keep build tools out of production images:

\`\`\`dockerfile
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app /app
\`\`\`

### Vulnerability Scanning

Integrate Trivy or Snyk into your CI pipeline to catch vulnerabilities early.

## Runtime Security

Run containers as non-root, use read-only filesystems, and drop unnecessary Linux capabilities.
    `,
  },
];
