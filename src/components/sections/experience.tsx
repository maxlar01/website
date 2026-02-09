"use client";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated";
import { experiences } from "@/lib/data";

export function ExperienceSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-sm text-primary/70 mb-2">
            &gt; git log --oneline
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A timeline of my career building and scaling infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <StaggerContainer className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <StaggerItem
              key={exp.company}
              className={`relative mb-12 last:mb-0 pl-8 md:pl-0 md:w-1/2 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute top-1 h-3 w-3 rounded-full border-2 border-primary bg-background ${
                  index % 2 === 0
                    ? "left-0 md:left-auto md:-right-1.5"
                    : "left-0 md:-left-1.5"
                }`}
              />

              <div className="group">
                <span className="font-mono text-xs text-muted-foreground">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold mt-1">{exp.role}</h3>
                <p className="text-sm text-primary/80 font-medium">
                  {exp.company}
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
