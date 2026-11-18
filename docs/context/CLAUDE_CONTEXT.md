# Hexora Project Context

> This file provides comprehensive context for Claude Code to understand the project architecture, design decisions, and coding patterns used in the Hexora website.

---

## Project Overview

**Hexora** is a professional, modern website for a Digital Transformation company serving MSMEs (Micro, Small, and Medium Enterprises). The company specializes in:
- Digital Transformation
- Automation Solutions
- Ecommerce Management
- Social Media Management

**Project Location:** `/Users/koushikgautham/Projects/demo/hexora`

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.2 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 11.x | Animations |
| Shadcn/ui | Latest | UI component library |
| next-themes | 0.3.x | Dark/Light mode |
| Lucide React | Latest | Icon library |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |
| Sonner | 1.x | Toast notifications |

---

## Design System

### Brand Colors: Red & White

The design uses a **bold, professional aesthetic** with red as the primary brand color and clean white/dark backgrounds for contrast.

#### Light Theme
```css
--background: oklch(1 0 0);                    /* Pure White */
--foreground: oklch(0.145 0 0);                /* Near Black */
--primary: oklch(0.577 0.245 16.439);          /* Hexora Red #E11D48 */
--primary-foreground: oklch(1 0 0);            /* White */
--secondary: oklch(0.97 0 0);                  /* Light Gray */
--accent: oklch(0.505 0.213 16.439);           /* Deep Red #B91C1C */
--muted: oklch(0.97 0 0);                      /* Light Gray */
--card: oklch(1 0 0);                          /* White */
--border: oklch(0.9 0 0);                      /* Light Border */
```

#### Dark Theme
```css
--background: oklch(0.1 0 0);                  /* Near Black #0A0A0A */
--foreground: oklch(0.98 0 0);                 /* Off White */
--primary: oklch(0.645 0.246 16.439);          /* Bright Red #F43F5E */
--secondary: oklch(0.2 0 0);                   /* Dark Gray */
--accent: oklch(0.577 0.245 16.439);           /* Red #E11D48 */
--card: oklch(0.145 0 0);                      /* Card Dark */
--border: oklch(1 0 0 / 12%);                  /* Subtle Border */
```

### Typography
- **Body Font:** Inter (via `next/font/google`)
- **Display Font:** Cabinet Grotesk (planned, variable font)
- **Font Variable:** `--font-inter`

### Custom Utility Classes (in globals.css)
```css
.text-gradient    /* Red gradient text */
.glow-red         /* Red glow shadow */
.glow-red-lg      /* Larger red glow */
.glass            /* Simple semi-transparent background (95% opacity) */
.no-scrollbar     /* Hide scrollbar */
```

---

## Project Structure

```
hexora/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── template.tsx              # Page transition wrapper
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles & design tokens
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── portfolio/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                       # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── navigation-menu.tsx
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx            # Sticky header with nav
│   │   │   ├── footer.tsx            # Footer with links
│   │   │   └── scroll-progress.tsx   # Scroll progress indicator
│   │   │
│   │   ├── sections/                 # Page section components
│   │   │   ├── index.ts              # Barrel export
│   │   │   ├── hero.tsx
│   │   │   ├── services-overview.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── portfolio-preview.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── process.tsx
│   │   │   └── cta.tsx
│   │   │
│   │   └── animations/               # Custom animation components
│   │       ├── index.ts              # Barrel export
│   │       ├── split-text.tsx        # Word-by-word reveal
│   │       ├── blur-text.tsx         # Blur-to-focus text
│   │       ├── count-up.tsx          # Animated counters
│   │       ├── fade-in.tsx           # Directional fade
│   │       ├── stagger-children.tsx  # Staggered animations
│   │       ├── spotlight-card.tsx    # Mouse spotlight effect
│   │       ├── tilted-card.tsx       # 3D tilt on hover
│   │       ├── aurora-background.tsx # Animated gradient bg
│   │       ├── particles.tsx         # Floating particles
│   │       ├── magnetic-button.tsx   # Magnetic hover
│   │       ├── splash-cursor.tsx     # Custom cursor
│   │       ├── infinite-scroll.tsx   # Logo carousel
│   │       ├── card-swap.tsx         # 3D card stack (GSAP)
│   │       ├── card-swap.css         # CardSwap styles
│   │       ├── click-spark.tsx       # Click spark effect
│   │       ├── pill-nav.tsx          # Animated pill navigation (GSAP)
│   │       ├── scroll-reveal-text.tsx # Text reveal on scroll
│   │       └── parallax-layer.tsx    # Parallax scroll effects
│   │
│   ├── providers/
│   │   └── theme-provider.tsx        # next-themes wrapper
│   │
│   ├── hooks/                        # Custom React hooks
│   │
│   ├── lib/
│   │   └── utils.ts                  # cn() utility from shadcn
│   │
│   └── data/                         # Static data/content
│       ├── services.ts               # Service definitions
│       ├── portfolio.ts              # Case study data
│       ├── testimonials.ts           # Client testimonials
│       └── team.ts                   # Team members
│
├── public/
│   ├── fonts/                        # Custom fonts (planned)
│   └── images/                       # Static images
│
├── components.json                   # Shadcn/ui configuration
├── tailwind.config.ts               # Tailwind configuration
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript config
└── package.json
```

---

## Animation Components (Reactbits-style)

All animations are in `src/components/animations/` and use Framer Motion.

### SplitText
Word-by-word 3D reveal animation for headlines.
```tsx
<SplitText text="Transform Your Business" delay={0.2} />
```

### BlurText
Blur-to-focus fade animation for subtitles.
```tsx
<BlurText text="Subtitle text here" delay={0.5} duration={0.8} />
```

### CountUp
Animated number counter that triggers on scroll.
```tsx
<CountUp end={150} suffix="+" duration={2} />
```

### FadeIn
Directional fade animation wrapper.
```tsx
<FadeIn direction="up" delay={0.2}>
  <Content />
</FadeIn>
```

### StaggerChildren
Staggered reveal for lists/grids.
```tsx
<StaggerChildren staggerDelay={0.1}>
  {items.map(item => <motion.div variants={staggerItemVariants} />)}
</StaggerChildren>
```

### SpotlightCard
Card with mouse-following spotlight effect.
```tsx
<SpotlightCard spotlightColor="rgba(225, 29, 72, 0.15)">
  <Content />
</SpotlightCard>
```

### TiltedCard
3D tilt effect on mouse move.
```tsx
<TiltedCard tiltAmount={10}>
  <Content />
</TiltedCard>
```

### AuroraBackground
Animated gradient background with floating orbs.
```tsx
<AuroraBackground>
  <HeroContent />
</AuroraBackground>
```

### MagneticButton
Button that follows cursor slightly.
```tsx
<MagneticButton strength={0.3}>
  <Button>Click me</Button>
</MagneticButton>
```

### SplashCursor
Custom cursor with trailing effect (desktop only, auto-hidden on touch).
Used in root layout globally.

### InfiniteScroll
Auto-scrolling horizontal carousel.
```tsx
<InfiniteScroll speed={40} direction="left">
  {logos}
</InfiniteScroll>
```

### CardSwap (Reactbits)
3D card stack with automatic swapping animation using GSAP. Cards cycle through with elastic/smooth easing.
```tsx
import "@/components/animations/card-swap.css";

<CardSwap
  width={400}
  height={320}
  cardDistance={50}
  verticalDistance={60}
  delay={4000}           // Time between swaps in ms
  pauseOnHover={true}
  skewAmount={4}
  easing="elastic"       // "elastic" | "smooth"
>
  <Card>Card 1 content</Card>
  <Card>Card 2 content</Card>
  <Card>Card 3 content</Card>
</CardSwap>
```
**Note:** Requires `gsap` package and CSS import. Used in PortfolioPreview section.

### ClickSpark (Reactbits)
Canvas-based click spark animation that creates radiating lines on click.
```tsx
<ClickSpark
  sparkColor="hsl(var(--primary))"
  sparkCount={8}
  sparkRadius={25}
  sparkSize={10}
  duration={400}
  easing="ease-out"
>
  <Button>Click me</Button>
</ClickSpark>
```
**Note:** Used on theme toggle and CTA buttons in Header.

### PillNav (Reactbits)
Animated pill-style navigation with GSAP hover effects and mobile support.
```tsx
<PillNav
  items={[
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ]}
  baseColor="hsl(var(--primary))"
  pillColor="hsl(var(--background))"
  pillTextColor="hsl(var(--foreground))"
  hoveredPillTextColor="hsl(var(--primary-foreground))"
  initialLoadAnimation={false}
/>
```
**Note:** Converted from react-router-dom to Next.js Link. The GSAP hover animation from PillNav has been integrated directly into the Header component.

---

## Recent Updates (January 18, 2026)

### Header Enhancements

#### Scroll Hide/Show Behavior
The header now hides when scrolling down and shows when scrolling up:
```tsx
// In header.tsx
const [isHidden, setIsHidden] = React.useState(false);
const [isTransitioning, setIsTransitioning] = React.useState(false);
const lastScrollY = React.useRef(0);

// Scroll detection in useEffect
if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
  // Scrolling down - hide
  setIsHidden(true);
} else {
  // Scrolling up - show
  setIsHidden(false);
}
```

#### GSAP Pill Hover Animation
The navbar uses GSAP for Reactbits-style hover animations:
- Circle expands from bottom of pill on hover
- Text slides up and new text slides in from below
- Active indicator dot below current page
```tsx
// Refs for animation
const circleRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
const tlRefs = React.useRef<(gsap.core.Timeline | null)[]>([]);

// Hover handlers
const handlePillEnter = (index: number) => {
  tlRefs.current[index]?.tweenTo(tl.duration(), { duration: 0.3 });
};
const handlePillLeave = (index: number) => {
  tlRefs.current[index]?.tweenTo(0, { duration: 0.2 });
};
```

### ClickSpark Global Mode
The ClickSpark component now supports a `global` prop for site-wide click animations:
```tsx
// In layout.tsx
<ClickSpark
  global
  sparkColor="var(--primary)"
  sparkCount={8}
  sparkRadius={25}
  duration={400}
/>
```

**Theme-aware colors:** Canvas 2D doesn't support oklch, so the component checks the `dark` class:
```tsx
if (sparkColor.includes("var(--primary)")) {
  const isDark = document.documentElement.classList.contains("dark");
  resolvedColor = isDark ? "#F43F5E" : "#E11D48";
}
```

### Hero Button Spacing
Increased gap between CTA buttons for better visual separation:
```tsx
className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:gap-8"
```

### CardSwap TypeScript Fixes
Fixed type errors in card-swap.tsx:
- `useRef<number | undefined>(undefined)` for interval ref
- Proper typing for `cloneElement` with extracted `childProps`

---

## Coding Patterns & Conventions

### File Naming
- **Components:** PascalCase (e.g., `SpotlightCard.tsx`) - but shadcn uses kebab-case
- **Pages:** lowercase with Next.js conventions (`page.tsx`)
- **Utilities:** camelCase

### Component Structure
```tsx
"use client"; // If using hooks/interactivity

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComponentProps {
  // Props definition
}

export function Component({ prop }: ComponentProps) {
  return (
    // JSX
  );
}
```

### Framer Motion Variants (TypeScript Fix)
Due to Framer Motion v11+ type strictness, use `as const` for variants:
```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;
```

### Import Aliases
- `@/` = `src/`
- `@/components/ui/` = Shadcn components
- `@/components/animations` = Custom animations
- `@/components/sections` = Page sections
- `@/data/` = Static data

### Styling Approach
1. Use Tailwind utility classes
2. Use `cn()` for conditional classes
3. CSS variables for theming (in globals.css)
4. Framer Motion for animations

---

## Key Components Details

### Header (`src/components/layout/header.tsx`)
- Sticky positioning with glass effect on scroll
- Responsive: Desktop nav + mobile Sheet menu
- Theme toggle with animated sun/moon icons
- Active route highlighting with layoutId animation

### Footer (`src/components/layout/footer.tsx`)
- Newsletter subscription form
- Contact info with icons
- Link columns (Services, Company, Resources)
- Social links with hover animations
- Staggered reveal animation

### Home Page Sections
1. **Hero** - Aurora background, SplitText headline, client logos
2. **ServicesOverview** - 4 SpotlightCards linking to services
3. **Stats** - CountUp numbers section
4. **Process** - 4-step timeline (Discovery → Strategy → Execute → Optimize)
5. **PortfolioPreview** - 3 featured TiltedCards
6. **Testimonials** - Carousel with navigation
7. **CTA** - Particles background, gradient text

---

## Data Structures

### Service (src/data/services.ts)
```typescript
{
  id: string;           // URL slug
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
}
```

### Portfolio Item (src/data/portfolio.ts)
```typescript
{
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  featured: boolean;
}
```

---

## Theme Configuration

### next-themes Setup
```tsx
// src/providers/theme-provider.tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="dark"     // Default to dark mode
  enableSystem
  disableTransitionOnChange={false}
>
```

### FOUC Prevention
Script in `<head>` of layout.tsx checks localStorage before React hydrates.

---

## Form Handling

### Contact Form Pattern
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // ...
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

// On success: toast.success("Message sent!");
```

---

## Page Transitions

### Template.tsx Pattern
```tsx
// src/app/template.tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Dynamic Routes

### Services: `/services/[slug]`
- Uses `generateStaticParams()` for SSG
- Fetches service from `services` array by slug
- Shows FAQs specific to each service

### Portfolio: `/portfolio/[slug]`
- Uses `generateStaticParams()` for SSG
- Full case study layout with results, testimonial, gallery

---

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## User Preferences Captured

1. **Tech Stack:** Next.js + React (recommended by assistant)
2. **Animations:** Framer Motion (recommended)
3. **Site Structure:** Full multi-page site
4. **Visual Style:** Both dark and light themes, professional and classy
5. **Brand Colors:** Red and White
6. **Custom Cursor:** Yes, SplashCursor enabled (desktop only)

---

## Premium Enhancements (Implemented January 18, 2026)

### Scroll Progress Indicator (`src/components/layout/scroll-progress.tsx`)
Horizontal progress bar centered at bottom with section navigation dots. Hidden on mobile, visible on md+ screens.
```tsx
<ScrollProgress
  sections={[
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "work", label: "Our Work" },
    { id: "cta", label: "Get Started" },
  ]}
  showDots={true}
/>
```
**Features:**
- Horizontal progress bar fills from left as user scrolls (bottom center of viewport)
- Section dots only appear on home page (uses `usePathname` check)
- Clickable dots navigate to sections with 80px header offset
- Active section highlighting via IntersectionObserver
- Smooth spring animation using Framer Motion
- Tooltips appear above dots on hover

**To remove:** Delete file and remove import from layout.tsx

### Scroll Reveal Text (`src/components/animations/scroll-reveal-text.tsx`)
Text that animates in as it scrolls into the viewport.
```tsx
// Word-by-word reveal
<ScrollRevealText mode="words" stagger={0.05}>
  Transform Your Business Today
</ScrollRevealText>

// Character-by-character reveal
<ScrollRevealText mode="chars" as="h1" duration={0.3}>
  Hexora
</ScrollRevealText>

// Clip-path mask reveal
<MaskRevealText direction="up" duration={0.8}>
  <h2>Section Title</h2>
</MaskRevealText>
```
**Features:**
- Two components: `ScrollRevealText` (staggered word/char) and `MaskRevealText` (clip-path)
- Configurable timing, stagger, and direction
- Uses IntersectionObserver with `-10%` margin for early trigger
- Respects `once` prop to animate only on first view

**To remove:** Delete file and remove imports where used

### Parallax Layer (`src/components/animations/parallax-layer.tsx`)
Parallax scrolling effects for background elements.
```tsx
// Basic parallax wrapper
<ParallaxLayer speed={0.5} direction="vertical">
  <BackgroundElement />
</ParallaxLayer>

// Container with multiple layers
<ParallaxContainer>
  <ParallaxBackground speed={0.3} background="bg-primary/10" />
  <FloatingElement speed={0.4} top="20%" left="10%">
    <DecorativeShape />
  </FloatingElement>
  <MainContent />
</ParallaxContainer>

// Image with parallax and zoom
<ParallaxImage src="/image.jpg" alt="Description" zoom zoomRange={[1, 1.1]} />
```
**Components:**
- `ParallaxLayer` - Base wrapper with configurable speed/direction
- `ParallaxContainer` - Relative container for multiple layers
- `ParallaxBackground` - Pre-configured background with parallax
- `FloatingElement` - Absolutely positioned decorative element
- `ParallaxImage` - Image with parallax and optional zoom effect

**To remove:** Delete file and remove imports where used

### Section IDs for Scroll Navigation
Added `id` attributes to home page sections for scroll progress navigation:
- `hero.tsx` - AuroraBackground with `id="hero"`
- `services-overview.tsx` - section with `id="services"`
- `portfolio-preview.tsx` - section with `id="work"`
- `cta.tsx` - section with `id="cta"`

**To remove:** Remove `id` props from section elements

### Removed Enhancements (for performance)
The following were removed after initial implementation:
- **Noise Overlay** - SVG-based film grain texture (removed for performance)
- **Enhanced glassmorphism** - `.glass-premium`, `.glass-card` variants (removed - no visible effect without background images)
- **Glow utilities** - `.glow-hover`, `.glow-focus`, `.glow-pulse`, `.text-glow` (removed for simplicity)

The `.glass` class now uses a simple solid background with 95% opacity instead of backdrop-filter blur.

---

## Future Enhancements (Not Yet Implemented)

### Other Planned Features
- [ ] Blog section
- [ ] Careers page
- [ ] Privacy policy page
- [ ] Actual image assets for portfolio/team
- [ ] Cabinet Grotesk font file
- [ ] Contact form backend integration
- [ ] Analytics integration
- [ ] SEO structured data

---

## Troubleshooting Notes

### Framer Motion Type Errors
If you see type errors with variants, add `as const` to the variant objects and use string literals like `"easeOut" as const`.

### Hydration Mismatches
Components that render differently on server vs client cause hydration errors. The pattern to fix this:

**SplashCursor Example (Fixed Pattern):**
```tsx
"use client";
import * as React from "react";

export function SplashCursor() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Browser-only checks go here
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsDesktop(!isTouchDevice);
  }, []);

  // Return null until mounted - matches server render (null)
  if (!isMounted) return null;
  if (!isDesktop) return null;

  return (/* cursor elements */);
}
```

**Key Points:**
1. Start with `isMounted = false`
2. Set `isMounted = true` only in useEffect (client-side)
3. Return `null` before mounted to match server render
4. Put all browser API checks (window, navigator) inside useEffect

### Theme Flash
FOUC is prevented by inline script in layout.tsx `<head>` that reads localStorage before paint.

---

## Chat Style with Claude Code

When working on this project:
1. **Be proactive** - Use TodoWrite to track multi-step tasks
2. **Test builds** - Run `npm run build` to catch TypeScript errors
3. **Use barrel exports** - Import from index files where available
4. **Follow established patterns** - Match existing component structure
5. **Prefer editing over creating** - Modify existing files when possible
6. **Keep animations performant** - Use transform/opacity only

---

*Last Updated: January 18, 2026*
*Claude Code Context File for Hexora Website Project*
