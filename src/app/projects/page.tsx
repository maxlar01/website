import type { Metadata } from "next";
import { ProjectsGrid } from "./projects-grid";

export const metadata: Metadata = {
  title: "Projects | Alex Morgan",
  description:
    "Open-source DevOps tools, infrastructure projects, and automation utilities built by Alex Morgan.",
};

export default function ProjectsPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-sm text-primary/70 mb-2">
            &gt; ls ~/projects -la
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of open-source tools, infrastructure modules, and
            automation utilities I&apos;ve built throughout my career.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectsGrid />
      </div>
    </div>
  );
}
