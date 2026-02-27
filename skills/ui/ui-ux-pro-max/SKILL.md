---
name: ui-ux-pro-max
description: Comprehensive UI/UX design intelligence with 50+ styles, 97 palettes, and 9 technology stacks for building professional interfaces.
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 9 technology stacks.

## When to Apply

Reference these guidelines when:

- Building landing pages or dashboards
- Choosing color palettes and typography
- Implementing accessibility requirements
- Reviewing code for UX issues
- Designing new UI components or pages

## Rule Categories by Priority

| Priority | Category | Impact |
| --- | --- | --- |
| 1 | Accessibility | CRITICAL |
| 2 | Touch & Interaction | CRITICAL |
| 3 | Performance | HIGH |
| 4 | Layout & Responsive | HIGH |
| 5 | Typography & Color | MEDIUM |
| 6 | Animation | MEDIUM |
| 7 | Style Selection | MEDIUM |
| 8 | Charts & Data | LOW |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `form-labels` - Use label with for attribute
- `keyboard-nav` - Tab order matches visual order
- `aria-labels` - aria-label for icon-only buttons
- `alt-text` - Descriptive alt text for meaningful images
- `focus-states` - Visible focus rings on interactive elements
- `color-contrast` - Minimum 4.5:1 ratio for normal text

### 2. Touch & Interaction (CRITICAL)

- `cursor-pointer` - Add cursor-pointer to clickable elements
- `error-feedback` - Clear error messages near problem
- `loading-buttons` - Disable button during async operations
- `hover-vs-tap` - Use click/tap for primary interactions
- `touch-target-size` - Minimum 44x44px touch targets

### 3. Performance (HIGH)

- `content-jumping` - Reserve space for async content
- `reduced-motion` - Check prefers-reduced-motion
- `image-optimization` - Use WebP, srcset, lazy loading

### 4. Layout & Responsive (HIGH)

- `z-index-management` - Define z-index scale (10, 20, 30, 50)
- `horizontal-scroll` - Ensure content fits viewport width
- `readable-font-size` - Minimum 16px body text on mobile
- `viewport-meta` - width=device-width initial-scale=1

### 5. Typography & Color (MEDIUM)

- `font-pairing` - Match heading/body font personalities
- `line-length` - Limit to 65-75 characters per line
- `line-height` - Use 1.5-1.75 for body text

### 6. Animation (MEDIUM)

- `loading-states` - Skeleton screens or spinners
- `transform-performance` - Use transform/opacity, not width/height
- `duration-timing` - Use 150-300ms for micro-interactions

### 7. Style Selection (MEDIUM)

- `no-emoji-icons` - Use SVG icons, not emojis
- `consistency` - Use same style across all pages
- `style-match` - Match style to product type

## Common Rules for Professional UI

### Icons & Visual Elements

| Rule | Do | Don't |
| --- | --- | --- |
| No emoji icons | Use SVG icons (Heroicons, Lucide) | Use emojis as UI icons |
| Stable hover states | Use color/opacity transitions | Use scale transforms that shift layout |
| Consistent icon sizing | Use fixed viewBox (24x24) | Mix different icon sizes |

### Interaction & Cursor

| Rule | Do | Don't |
| --- | --- | --- |
| Cursor pointer | Add `cursor-pointer` to clickables | Leave default cursor on interactive elements |
| Hover feedback | Provide visual feedback | No indication element is interactive |
| Smooth transitions | Use `transition-colors duration-200` | Instant state changes |

### Light/Dark Mode Contrast

| Rule | Do | Don't |
| --- | --- | --- |
| Glass card light mode | Use `bg-white/80` or higher | Use `bg-white/10` (too transparent) |
| Text contrast light | Use `#0F172A` (slate-900) | Use `#94A3B8` (slate-400) for body |
| Border visibility | Use `border-gray-200` in light | Use `border-white/10` (invisible) |

### Layout & Spacing

| Rule | Do | Don't |
| --- | --- | --- |
| Floating navbar | Add `top-4 left-4 right-4` spacing | Stick navbar to `top-0 left-0 right-0` |
| Content padding | Account for fixed navbar height | Let content hide behind fixed elements |
| Consistent max-width | Use same `max-w-6xl` or `max-w-7xl` | Mix different container widths |

## Pre-Delivery Checklist

### Visual Quality

- [ ] Use theme colors directly (bg-primary) not var() wrapper
- [ ] Hover states don't cause layout shift
- [ ] All icons from consistent icon set
- [ ] No emojis used as icons

### Interaction

- [ ] Focus states visible for keyboard navigation
- [ ] Transitions are smooth (150-300ms)
- [ ] All clickable elements have `cursor-pointer`

### Light/Dark Mode

- [ ] Test both modes before delivery
- [ ] Borders visible in both modes
- [ ] Light mode text has sufficient contrast (4.5:1 minimum)

### Layout

- [ ] No horizontal scroll on mobile
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars

### Accessibility

- [ ] `prefers-reduced-motion` respected
- [ ] Color is not the only indicator
- [ ] Form inputs have labels
- [ ] All images have alt text

## Available Stacks

| Stack | Focus |
| --- | --- |
| `html-tailwind` | Tailwind utilities, responsive, a11y (DEFAULT) |
| `react` | State, hooks, performance, patterns |
| `nextjs` | SSR, routing, images, API routes |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `swiftui` | Views, State, Navigation, Animation |
| `react-native` | Components, Navigation, Lists |
| `flutter` | Widgets, State, Layout, Theming |
| `shadcn` | shadcn/ui components, theming, forms |

## Tips for Better Results

1. Be specific with keywords - "healthcare SaaS dashboard" > "app"
2. Always check UX - Search "animation", "z-index", "accessibility"
3. Use stack flag - Get implementation-specific best practices
4. Combine domains - Style + Typography + Color = Complete design system
