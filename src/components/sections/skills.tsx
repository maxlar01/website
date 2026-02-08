"use client";

import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated";
import { skills } from "@/lib/data";

export function SkillsSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-sm text-primary/70 mb-2">
            &gt; cat skills.yaml
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tech Stack & Skills
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Tools and technologies I use daily to build, deploy, and maintain
            scalable infrastructure.
          </p>
        </div>

        {/* Skills Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <StaggerItem key={skill.category}>
              <div className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
