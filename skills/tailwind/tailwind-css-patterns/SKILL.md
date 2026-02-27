---
name: tailwind-css-patterns
description: Expert guide for building modern, responsive user interfaces with Tailwind CSS utility-first patterns and modern CSS best practices.
---

# Tailwind CSS Patterns

Expert guide for building modern, responsive user interfaces with Tailwind CSS utility-first patterns and modern CSS best practices.

## When to Use This Skill

- Building responsive layouts with Tailwind CSS
- Creating reusable component patterns
- Optimizing Tailwind configurations
- Implementing dark mode and theming
- Following utility-first best practices

## Core Principles

### 1. Mobile-First Responsive Design

Always design mobile-first, then add breakpoints for larger screens:

```html
<!-- Mobile first, then tablet, then desktop -->
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  Content
</div>
```

### 2. Component Extraction

When patterns repeat 3+ times, extract to components:

```jsx
// Instead of repeating utility classes
function Button({ children, variant = "primary" }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

### 3. Design Tokens via Config

Extend Tailwind config for consistent design tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontFamily: {
        display: ['Cal Sans', 'sans-serif'],
      },
    },
  },
};
```

## Layout Patterns

### Flexbox Containers

```html
<!-- Centered content -->
<div class="flex items-center justify-center min-h-screen">
  <div>Centered</div>
</div>

<!-- Space between items -->
<div class="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Stack with gap -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layouts

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Auto-fit grid -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- Items will auto-size -->
</div>
```

### Container Patterns

```html
<!-- Centered container with padding -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  Content
</div>

<!-- Max-width constraint -->
<div class="max-w-prose mx-auto">
  <p>Readable text content...</p>
</div>
```

## Component Patterns

### Cards

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="p-6">
    <h3 class="text-lg font-semibold text-gray-900">Title</h3>
    <p class="mt-2 text-gray-600">Description text</p>
  </div>
  <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
    <button class="text-blue-600 hover:text-blue-700 font-medium">
      Action
    </button>
  </div>
</div>
```

### Form Inputs

```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input
    type="email"
    class="w-full px-3 py-2 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           placeholder:text-gray-400"
    placeholder="you@example.com"
  />
  <p class="text-sm text-gray-500">We'll never share your email.</p>
</div>
```

### Navigation

```html
<nav class="flex items-center gap-8">
  <a href="/" class="text-gray-900 font-medium">Home</a>
  <a href="/about" class="text-gray-600 hover:text-gray-900 transition-colors">About</a>
  <a href="/contact" class="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
</nav>
```

## State & Interaction

### Hover & Focus States

```html
<button class="
  bg-blue-600 text-white px-4 py-2 rounded-lg
  hover:bg-blue-700
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:bg-blue-800
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors
">
  Click me
</button>
```

### Group Hover

```html
<div class="group p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
  <h3 class="font-medium group-hover:text-blue-600 transition-colors">
    Title
  </h3>
  <p class="text-gray-600">Description</p>
</div>
```

## Dark Mode

```html
<!-- System preference -->
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

```javascript
// tailwind.config.js for class-based dark mode
module.exports = {
  darkMode: 'class',
};
```

## Animation Patterns

```html
<!-- Transition on hover -->
<div class="transform hover:scale-105 transition-transform duration-200">
  Scales up on hover
</div>

<!-- Fade in animation -->
<div class="animate-fade-in">
  Fades in
</div>
```

```javascript
// Custom animations in config
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
```

## Best Practices

1. **Use semantic HTML** - Tailwind styles, not replaces, good markup
2. **Avoid @apply in CSS** - Keep utilities in markup for maintainability
3. **Purge unused styles** - Configure content paths correctly
4. **Use arbitrary values sparingly** - Prefer design tokens
5. **Group related utilities** - Line breaks help readability

```html
<!-- Grouped for readability -->
<div class="
  flex items-center justify-between
  p-4 space-x-4
  bg-white rounded-lg shadow-sm
  border border-gray-200
">
```

## Common Anti-Patterns

- Using `!important` via `!` prefix (fix the cascade instead)
- Inline styles mixed with Tailwind classes
- Over-customizing - use defaults when possible
- Not extracting repeated patterns into components

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
