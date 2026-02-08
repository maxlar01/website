"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated";
import { siteConfig } from "@/lib/data";

const socials = [
  { icon: Github, label: "GitHub", href: siteConfig.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.linkedin },
  { icon: Twitter, label: "Twitter", href: siteConfig.twitter },
];

export function ContactSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm text-primary/70 mb-2">
            &gt; echo &quot;Let&apos;s connect&quot;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I&apos;m always interested in discussing DevOps challenges,
            infrastructure architecture, or open-source collaboration. Feel free
            to reach out!
          </p>

          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href={`mailto:${siteConfig.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                {siteConfig.email}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {socials.map((social) => (
              <Button key={social.label} variant="outline" size="lg" asChild>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="mr-2 h-4 w-4" />
                  {social.label}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
