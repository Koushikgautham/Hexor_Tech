# Hexora Website Redesign - Context & Design System

## Project Overview
Complete redesign of the Hexora Tech main website with GSAP animations, minimal matte aesthetic, and coding accents. Design direction: Clean, modern, modular with subtle tech references.

**Scope:** Main website only (NOT admin/client dashboards)

---

## Current Design Direction

### Aesthetic
- **Minimal & Matte** - Clean, uncluttered with focus on content
- **Modular** - Card-based layouts with clear sections
- **Coding Accents** - Subtle developer references (`// comments`, code font)
- **Dark Theme** - Pure black backgrounds with dark gray cards
- **Bold Typography** - Montserrat wide and bold for impact

### Key Principles
1. No unnecessary background animations (removed Threads, Star Field)
2. GSAP for entrance animations only
3. Code comment style throughout (`// section name`)
4. Matte cards with subtle borders (white/5, white/10)
5. Red primary accent color sparingly used

---

## Design System

### Color Palette
```css
/* Backgrounds */
--background: #0a0a0a;          /* Pure black background */
--card-bg: #111;                /* Card backgrounds */

/* Accent */
--primary: oklch(0.577 0.245 16.439);  /* Hexora Red */
--primary-hover: oklch(0.505 0.213 16.439); /* Darker red */

/* Text */
--text-white: #ffffff;          /* Primary text */
--text-gray-300: rgb(209 213 219);  /* Secondary text */
--text-gray-400: rgb(156 163 175);  /* Muted text */
--text-gray-500: rgb(107 114 128);  /* Very muted */
--text-gray-600: rgb(75 85 99);     /* Code comments */

/* Borders */
--border-subtle: oklch(1 0 0 / 5%);   /* Very subtle */
--border-default: oklch(1 0 0 / 10%); /* Default */
--border-hover: oklch(1 0 0 / 20%);   /* Hover state */
```

### Typography
```css
/* Primary Display Font */
font-family: 'Montserrat', sans-serif;
font-weight: 700-900; /* Bold to Black */
letter-spacing: -0.02em;

/* Code/Accent Font */
font-family: 'JetBrains Mono', monospace;
font-size: 0.75rem (12px);
letter-spacing: 0.05em;
color: gray-500 or gray-600;

/* Usage */
- Headings: Montserrat, bold (700-900)
- Body: Montserrat, regular (400-500)
- Code comments: JetBrains Mono (// comments)
- Numbers: JetBrains Mono for service numbers
```

### Component Patterns

#### Code Comments
```html
<span class="font-mono text-xs text-gray-500">
  // section name
</span>
```

#### Matte Cards
```html
<div class="rounded-2xl border border-white/5 bg-[#111] p-6">
  <!-- content -->
</div>
```

#### Numbered Lists (Services)
```
Collapsed: 01/ (primary red)
Expanded:  /01 (slash moves left, number turns white, grows larger)
```

### Animation Guidelines
```javascript
// GSAP ScrollTrigger
gsap.from(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power3.out",
});

// Stagger Animations
stagger: 0.1 to 0.15

// Transitions
duration: 0.3s to 0.5s
ease: ease-out
```

---

## Completed Sections

### 1. Hero Section ✅
**File:** `src/components/sections/hero.tsx`

**Features:**
- Code-style tag: `<hexora.tech/>`
- Large headline with red accent word
- Description text
- Two CTAs (primary button + secondary)
- Stats cards grid (4 cards):
  - Years in business
  - Projects delivered
  - Happy clients
  - Location (with green "Open for projects" indicator)
- Services preview (4 services numbered 01-04)
- GSAP entrance animations with stagger

**Typography:**
- Headline: Montserrat, bold, 4xl-6xl
- Body: Montserrat, regular, base-lg
- Code comments: JetBrains Mono, xs

### 2. Header/Navigation ✅
**File:** `src/components/layout/header.tsx`

**Features:**
- Glass morphism navbar (backdrop-blur-xl)
- Responsive collapse on scroll:
  - Expanded: Logo left, nav center, buttons right (full width)
  - Collapsed: Just nav links (auto width)
- Active section highlighting
- Mobile hamburger menu with slide-out sheet
- Smooth scroll behavior

**Animation:**
- Logo and buttons fade out (opacity, scale)
- Spacers collapse to w-0
- Duration: 500ms ease-out

### 3. Services Section ✅
**File:** `src/components/sections/services.tsx`

**Features:**
- Header with code comment (`// what we do`)
- Accordion-style expandable list
- Numbered services (01/ to 04/)
- Animated number transformation:
  - Collapsed: `01/` (red, smaller)
  - Expanded: `/01` (white, larger, slash moves to left)
- Each row shows:
  - Number + Title + Tags (desktop) + Expand icon
  - When expanded: Overview + Capabilities + Learn more link
- CTA card at bottom
- GSAP scroll-triggered animations

**Services:**
1. Digital Transformation
2. Automation Solutions
3. E-Commerce
4. Social Media

---

## File Structure

### Modified Files
```
src/
├── app/
│   ├── page.tsx              ✅ Updated (removed Stats import)
│   └── globals.css           ✅ Updated (Montserrat + JetBrains Mono)
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx          ✅ Redesigned
│   │   ├── services.tsx      ✅ Redesigned
│   │   ├── stats.tsx         ⚠️ Not used (removed from page)
│   │   ├── projects.tsx      🔄 Next to redesign
│   │   ├── team.tsx          ⏳ Pending
│   │   ├── testimonials.tsx  ⏳ Pending
│   │   ├── globe-experiment.tsx  ⏳ Pending
│   │   └── contact.tsx       ⏳ Pending
│   │
│   ├── layout/
│   │   ├── header.tsx        ✅ Redesigned
│   │   └── footer.tsx        ⏳ Pending
│   │
│   ├── HexoraLogo3D.tsx      ✅ Created (Three.js placeholder)
│   │
│   └── animations/
│       ├── threads-background.tsx  ⚠️ Not used
│       └── star-field.tsx          ⚠️ Not used
```

### Files NOT to Touch
```
src/app/(admin)/              # Admin dashboard
src/app/(client)/             # Client dashboard
src/components/admin/         # Admin components
```

---

## Reference Images Analysis

### Design Inspirations Used

**Fortex (Landingpage.png):**
- ✅ Numbered list style for services (01/, 02/, etc.)
- ✅ Code-style accents

**Stökt (Landingpage2.png):**
- ✅ Minimal, clean aesthetic
- ✅ "Scroll for more" concept
- ✅ Contained design elements

**Modular Design (Modular_Design.png):**
- ⏳ Bento grid concept (for future sections)
- ✅ Code comment style throughout

---

## Next Steps

### 5. Projects/Portfolio Section 🔄
**File:** `src/components/sections/projects.tsx`
**Reference:** Project_Showcase.png, Project_Showcase2.png

**Requirements:**
- Project showcase grid
- Image cards with overlay
- Tags and categories
- GSAP animations
- Hover effects
- Matte card styling with code accents

### 6. Team/About Section ⏳
**File:** `src/components/sections/team.tsx`
**Reference:** Aboutus.png

**Requirements:**
- Team member cards
- Profile photos
- Bios and roles
- Code accent styling

### 7. Globe Section ⏳
**File:** `src/components/sections/globe-experiment.tsx`

**Requirements:**
- Integrate existing Globe component
- Show Chennai, India location
- "Based in Chennai, Available Worldwide"
- Match matte aesthetic

### 8. Testimonials ⏳
**File:** `src/components/sections/testimonials.tsx`
**Reference:** Client_Stories, Modular_Design.png

**Requirements:**
- Client testimonials
- Matte card design
- GSAP animations

### 9. Contact/CTA ⏳
**File:** `src/components/sections/contact.tsx`

**Requirements:**
- Contact form
- CTA messaging
- Primary red buttons
- Code accents

### 10. Footer ⏳
**File:** `src/components/layout/footer.tsx`

**Requirements:**
- Match matte theme
- Social links
- Quick navigation
- Code accent styling

---

## Design Decisions Log

| Decision | Rationale |
|----------|-----------|
| Montserrat font | User preference for wide, bold font |
| Remove background animations | User wanted minimal, clean look |
| Code comment style | Subtle tech/developer branding |
| Accordion services | More interactive than static grid |
| Remove Stats section | User decided not needed |
| Glass navbar collapse | Modern, clean navigation UX |
| Number animation (01/ → /01) | Adds delight to interaction |

---

## Technical Notes

### GSAP Setup
- ScrollTrigger plugin registered
- Context-based animations for cleanup
- Trigger points: "top 75-85%"
- Stagger delays: 0.1-0.15s
- Entrance animations: fade + translateY

### Three.js 3D Logo
- Placeholder created in HexoraLogo3D.tsx
- Ready to swap with GLB file from Blender
- Mouse interaction enabled
- Auto-rotate with floating effect

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Questions Resolved

1. ✅ Custom font preference? → **Montserrat (wide, bold)**
2. ✅ 3D logo file format? → **GLB/GLTF for Three.js**
3. ✅ Hero style preference? → **Minimal matte with modular cards**
4. ✅ Background animations? → **None, keep it clean**
5. ✅ Stats section? → **Removed**

---

## Notes
- User prefers clean, minimal design without busy animations
- Code accents should be subtle, not overwhelming
- Focus on content and typography over effects
- 3D logo GLB file still in development in Blender
- Globe component already exists and works well
