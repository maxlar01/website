"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated";
import { projects } from "@/lib/data";

export function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <AnimatedSection className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-sm text-primary/70 mb-2">
            &gt; ls ~/projects --featured
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Open-source tools and infrastructure projects I&apos;ve built.
          </p>
        </div>

        {/* Project Cards */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project.title}>
              <Card className="group h-full flex flex-col border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-3">
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.live && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        Live
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
