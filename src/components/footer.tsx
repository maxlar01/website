import Link from "next/link";
import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="font-mono text-sm font-bold">
              maxlar<span className="text-primary/60">.dev</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground text-center px-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js & deployed on the edge.</p>
        </div>
      </div>
    </footer>
  );
}
