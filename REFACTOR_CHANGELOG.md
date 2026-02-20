# Refactor Changelog (v0 → Production)

## 1. Удалённые зависимости

| Пакет | Причина |
|-------|---------|
| `gsap` | Не использовался в коде |
| `@tailwindcss/typography` | Не использовался (plugins: []) |

## 2. Новая структура

```
constants/
  routes.ts    — SITE_URL, BOOKING_URL, SECTION_IDS, NAV_LINKS
  layout.ts    — CONTAINER_MAX_WIDTH, SECTION_PADDING_*

hooks/
  use-lock-body-scroll.ts  — перенесён из lib/
  use-section-in-view.ts   — общий useInView с once/amount/margin
  use-media-query.ts      — useIsMobile() с RAF debounce
```

## 3. Удалённые файлы

- `lib/use-lock-body-scroll.ts` → перенесён в `hooks/use-lock-body-scroll.ts`

## 4. Ключевые изменения по компонентам

| Компонент | Изменения |
|-----------|-----------|
| Header | NAV_LINKS, BOOKING_URL из constants; useLockBodyScroll из hooks |
| Hero | BOOKING_URL, SECTION_IDS из constants; href="#services" → SECTION_IDS |
| BookingFlow, Contacts | BOOKING_URL из constants |
| Services, Masters, Gallery, Reviews, Contacts | useSectionInView; SECTION_IDS для id секций |
| Masters | useIsMobile вместо resize listener |
| SectionHeading | useSectionInView |
| layout, sitemap | SITE_URL из constants |

## 5. Tailwind — удалённые неиспользуемые keyframes

- fade-in-up, reveal-left, line-grow, scanline, draw-line, flicker, light-streak

Оставлены: glitch, pulse-red, radar-spin, radar-pulse, signal-ping, marker-glow

## 6. Производительность

- **useIsMobile**: RAF вместо прямого setState на resize
- **useSectionInView**: единые опции (once, amount, margin) для всех секций
- **Scroll lock**: уже оптимизирован (overflow-only, без position:fixed)

## 7. Токены и консистентность

- Роуты и section IDs вынесены в constants
- Layout tokens в constants/layout.ts (справочно)
- CSS variables в globals.css без изменений

## 8. Модалки и scroll-lock

- useLockBodyScroll в hooks/
- GalleryModal: ESC, click outside, touchmove prevent — без изменений

## 9. Accessibility

- prefers-reduced-motion уже в globals.css
- ThemeToggle, Header hamburger — aria-label присутствуют
- Focus visible — в globals.css

## 10. Build & Lint

- `npm run build` — ✅ проходит
- `npm run lint` — может требовать настройки (Next.js 16)

## Follow-ups (опционально)

1. Вынести секционные компоненты в `components/sections/`
2. Добавить ESLint flat config (eslint-config-next)
3. Включить next/image optimization (сейчас unoptimized: true)
4. Hero video: preload="metadata" для мобильных
