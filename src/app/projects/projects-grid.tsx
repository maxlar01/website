"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
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
import { projects } from "@/lib/data";

export function ProjectsGrid() {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? projects.filter((p) => p.tags.includes(activeFilter))
    : projects;

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <Button
          variant={activeFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(null)}
          className="rounded-full"
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={activeFilter === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Project cards */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group h-full flex flex-col border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge className="ml-2 shrink-0">Featured</Badge>
                    )}
                  </div>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
