# Personal Portfolio Website

A modern, performant portfolio website showcasing projects, skills, and technical writing with an engaging user experience.

## 🚀 Technologies & Tools

### Core Framework

- **[Next.js 16](https://nextjs.org)** - React framework with App Router, server components, and Turbopack
- **[React 19](https://react.dev)** - Latest React with improved concurrent rendering and server components
- **[TypeScript 5](https://www.typescriptlang.org)** - Full type safety across the entire application

### Styling & UI Components

- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework with custom design system
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typography defaults for markdown content
- **[shadcn/ui](https://ui.shadcn.com)** - Accessible, customizable component system built on Radix UI
- **[Radix UI](https://www.radix-ui.com)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev)** - Clean, consistent icon library with 1000+ icons
- **[class-variance-authority](https://cva.style)** - Type-safe component variants
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Intelligently merge Tailwind classes
- **[clsx](https://github.com/lukeed/clsx)** - Tiny utility for constructing className strings

### Animation & Interactive Effects

- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready React animation library
- **[tsParticles](https://particles.js.org)** - Lightweight particle animations and interactive backgrounds
  - `@tsparticles/engine` - Core particle engine
  - `@tsparticles/react` - React integration
  - `@tsparticles/slim` - Optimized bundle with essential features

### Theming

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Perfect dark mode with system preference detection and no flash

### Content Processing & Markdown

- **[unified](https://unifiedjs.com)** - Interface for parsing, transforming, and serializing content
- **[remark-parse](https://github.com/remarkjs/remark)** - Markdown parser
- **[remark-rehype](https://github.com/remarkjs/remark-rehype)** - Transform markdown (remark) to HTML (rehype)
- **[rehype-highlight](https://github.com/rehypejs/rehype-highlight)** - Syntax highlighting for code blocks
- **[rehype-stringify](https://github.com/rehypejs/rehype)** - Serialize HTML

### Development Tools

- **[pnpm](https://pnpm.io)** - Fast, disk space efficient package manager
- **[ESLint 9](https://eslint.org)** - Linting with Next.js recommended configuration
- **[React Compiler](https://react.dev/learn/react-compiler)** - Automatic optimization and memoization
- **[PostCSS](https://postcss.org)** - CSS transformations with Tailwind integration

## ✨ Features

- **🎨 Modern Design** - Clean, professional interface with smooth animations
- **🌓 Dark Mode** - Seamless theme switching with system preference support
- **📝 Blog System** - Markdown-based technical writing with syntax highlighting
- **💼 Project Showcase** - Grid layout displaying featured projects
- **⚡ Performance** - Optimized with Next.js App Router and React Server Components
- **📱 Responsive** - Mobile-first design that works on all devices
- **♿ Accessible** - Built with accessibility in mind using Radix UI primitives
- **🔍 SEO Optimized** - Proper meta tags and semantic HTML structure
- **✨ Interactive UI** - Particle effects and smooth transitions

## 🏁 Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm 10.29.2 (enforced via `packageManager` field)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server with hot reload
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog listing and dynamic post pages
│   ├── projects/          # Projects showcase
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── template.tsx       # Page transition wrapper
├── components/
│   ├── sections/          # Page sections (Hero, Skills, Experience, etc.)
│   ├── ui/               # shadcn/ui components (Badge, Button, Card, etc.)
│   ├── animated.tsx       # Animated wrapper components
│   ├── footer.tsx         # Site footer
│   ├── navbar.tsx         # Navigation bar
│   ├── particles-background.tsx  # tsParticles configuration
│   ├── theme-provider.tsx # next-themes provider
│   └── theme-toggle.tsx   # Dark mode toggle
├── content/              # Markdown blog posts
│   ├── *.md
└── lib/
    ├── data.ts          # Site configuration and static content
    ├── markdown.ts      # Markdown processing utilities
    └── utils.ts         # Helper functions (cn, etc.)
```

## 📄 License

See the [LICENSE](LICENSE) file for details.
