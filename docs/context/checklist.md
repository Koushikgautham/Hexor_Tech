# Hexora Website Redesign Checklist

## Overview
Major redesign of the main Hexora website with GSAP animations, minimal matte aesthetic, and modern dark theme.

**Important:** DO NOT touch Admin or Client Dashboards!

---

## Sections to Redesign

### 1. Hero Section ✅ COMPLETED
- [x] Minimal matte design with modular cards
- [x] Montserrat font (wide and bold)
- [x] 3D Hexora logo placeholder (ready for Blender GLB file)
- [x] GSAP entrance animations
- [x] Clean, minimal design with no background animations
- [x] Code accent comments (// hexora.tech)
- [x] Stats cards (years, projects, clients, location)
- [x] Services preview section
- [x] Black matte background (#0a0a0a)

### 2. Services Section ✅ COMPLETED
- [x] Numbered list style (01/, 02/, 03/, 04/)
- [x] Accordion/expandable rows
- [x] Animated number transition (01/ → /01 when expanded)
- [x] Clean borders and dark backgrounds
- [x] Code comment accents
- [x] Tags for each service
- [x] CTA card at bottom

### 3. Header/Navigation ✅ COMPLETED
- [x] Glass navbar with backdrop blur
- [x] Collapse animation on scroll
- [x] Logo left, nav center, buttons right
- [x] Smooth transitions
- [x] Mobile responsive menu
- [x] Active section highlighting

### 4. Stats/Credibility Section ⚠️ REMOVED
- User decided not to include this section

### 5. Projects/Portfolio Section 🔄 IN PROGRESS
- [ ] Project showcase with images
- [ ] Grid layout
- [ ] Tags and categories
- [ ] GSAP animations
- [ ] Hover effects

### 6. About/Team Section
- [ ] Team member cards
- [ ] Company story
- [ ] Profile photos
- [ ] Stats integration

### 7. Globe Section
- [ ] Show Chennai, India location
- [ ] "Based in Chennai, Available Worldwide"
- [ ] Integrate existing Globe component
- [ ] Style to match new matte design

### 8. Testimonials/Client Stories
- [ ] Client testimonials display
- [ ] Matte card styling
- [ ] Code accents

### 9. Contact/CTA Section
- [ ] Contact form styling
- [ ] CTA messaging
- [ ] Primary red accent buttons

### 10. Footer
- [ ] Match new dark matte theme
- [ ] Social links
- [ ] Quick links
- [ ] Code accent styling

---

## Design Specifications

### Colors
- **Primary Background:** Near black (#0a0a0a)
- **Card Background:** Dark gray (#111)
- **Accent Color:** Hexora Red (oklch(0.577 0.245 16.439))
- **Text:** White (#ffffff)
- **Muted Text:** Gray (#gray-400, #gray-500)
- **Borders:** White with low opacity (white/5, white/10)

### Typography
- **Display Font:** Montserrat (wide, bold - weights 700-900)
- **Code/Accent Font:** JetBrains Mono
- **Style:** Minimal, matte, modular with subtle coding accents
- **Code Comments:** `// section name` style throughout

### Animations
- GSAP for scroll-triggered animations
- ScrollTrigger for entrance effects
- Smooth transitions with ease-out
- Stagger animations for lists
- Number count-up animations

---

## Progress Log

| Date | Section | Status | Notes |
|------|---------|--------|-------|
| Jan 27 | Hero Section | ✅ Complete | Minimal matte design, Montserrat font, GSAP animations, 3D logo placeholder |
| Jan 27 | Header/Nav | ✅ Complete | Glass navbar with collapse, logo/nav/buttons layout |
| Jan 27 | Services | ✅ Complete | Numbered accordion list with animated transitions |
| Jan 27 | Stats | ⚠️ Removed | User decided not to include |
| Jan 28 | Projects | 🔄 In Progress | Next section to work on |

---

## Notes
- 3D Hexora logo (hexagonal 6) being developed in Blender - GLB/GLTF format
- Reference images in `/docs/design-images/`
- Existing Globe component can be reused and styled
- Design direction: Minimal, matte, modular with subtle coding accents
- Fonts: Montserrat (primary), JetBrains Mono (code accents)
