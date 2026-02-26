# Refactor Summary — myBarberStudio

## 1. Framer Motion → CSS Replacements

### Removed (replaced with CSS)

| Component | Usage | Reason |
|-----------|-------|--------|
| **SectionHeading** | 6× `motion.div/span/h2/p` — tag, title, description, divider | Simple scroll-triggered fade/slide; CSS `scroll-reveal`, `scroll-reveal-x`, `scroll-reveal-scale-x` + `in-view` |
| **ServiceCard** | `motion.div` — card fade-in with index delay | Simple scroll reveal; CSS `scroll-reveal` + `scroll-reveal-delay-*` |
| **CategoryCard** | `motion.button` — card fade-in | Same; CSS `scroll-reveal` + inline `transitionDelay` |
| **Reviews** | `motion.div` per card | Staggered reveal; CSS `scroll-reveal` + inline delay |
| **Services** | `motion.div` — notes section | Simple fade; CSS `scroll-reveal` |
| **BookingFlow** | 4× `motion.div` — line, steps, CTA | Scroll reveal; CSS `scroll-reveal`, `scroll-reveal-scale-x`, `scroll-reveal-scale` |
| **Masters** | `motion.div` — card reveal | Card scroll reveal; CSS `scroll-reveal` (kept AnimatePresence for expand/collapse) |
| **Contacts** | 6× `motion.div` — info blocks, map, CTA | Scroll reveal; CSS `scroll-reveal`, `scroll-reveal-x`; hover shimmer → CSS keyframes |
| **About** | 4× `motion.div` — image clip, text, stats, divider | Image: CSS clip-path + opacity; text/stats/divider: `scroll-reveal` |
| **Tattoo** | 4× `motion.div/li` — content, list items, divider | CSS `scroll-reveal`, `scroll-reveal-x`, `scroll-reveal-scale-x` |
| **Gallery** | `motion.div` in GalleryItem | Grid item reveal; CSS `scroll-reveal-scale` |

### Kept (Framer Motion)

| Component | Usage | Reason |
|-----------|-------|--------|
| **Hero** | `motion.div`, `useTransform` | Parallax (bgY, contentY, overlayOpacity) — scroll-driven |
| **SiteLoader** | `motion`, `AnimatePresence` | Complex orchestration, exit animation |
| **Masters** | `AnimatePresence`, `motion.div/p` | Expand/collapse description with height animation |
| **Gallery** | `AnimatePresence`, `motion.div` | Lightbox modal; Before/After slider transitions |
| **PricingModal** | `AnimatePresence`, `motion.div` | Modal overlay and panel enter/exit |
| **About** | `motion.div`, `useTransform` | Parallax image (imageY) |
| **Tattoo** | `motion.div`, `useTransform` | Ink reveal clipPath, imageScale — scroll-driven |

---

## 2. CSS Motion System

- **Variables**: `--motion-ease`, `--motion-duration-fast/normal/slow`
- **Classes**: `scroll-reveal`, `scroll-reveal-x`, `scroll-reveal-scale-x`, `scroll-reveal-scale` + `in-view`
- **Delays**: `scroll-reveal-delay-1` … `scroll-reveal-delay-10`
- **prefers-reduced-motion**: All scroll-reveal classes reset to `opacity: 1`, `transform: none`

---

## 3. Summary (bullet points)

- Replaced Framer Motion with CSS for all simple scroll-triggered reveals
- Added native `useInView` (IntersectionObserver) — `use-section-in-view` no longer depends on framer-motion for inView
- Added `throttle()` for Header scroll handler (100ms)
- Added focus-on-open and `aria-hidden` for PricingModal overlay
- Kept Framer Motion only for parallax, AnimatePresence (modals, loader, Masters expand), and scroll-driven transforms

---

## 4. Changed Files by Area

### Animations
- `app/globals.css` — motion variables, scroll-reveal classes, contacts shimmer
- `components/SectionHeading.tsx`
- `components/ServiceCard.tsx`
- `components/CategoryCard.tsx`
- `components/Reviews.tsx`
- `components/Services.tsx`
- `components/BookingFlow.tsx`
- `components/Masters.tsx`
- `components/Contacts.tsx`
- `components/About.tsx`
- `components/Tattoo.tsx`
- `components/Gallery.tsx`

### Structure / Hooks
- `hooks/use-in-view.ts` — new (native IntersectionObserver)
- `hooks/use-section-in-view.ts` — uses native `useInView`

### Performance
- `lib/utils.ts` — `throttle()` helper
- `components/Header.tsx` — throttled scroll handler

### Cleanup / Accessibility
- `components/PricingModal.tsx` — focus on open, overlay `aria-hidden`

---

## 5. Confirmation

- **Visual regression**: None — same UI and behavior
- **Build**: `npm run build` passes
- **Lint**: No linter errors
- **Performance**: Less JS animation overhead — scroll reveals use CSS transitions
