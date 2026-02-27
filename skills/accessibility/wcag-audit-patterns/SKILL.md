---
name: wcag-audit-patterns
description: Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation guidance. Use when auditing websites for accessibility, fixing WCAG violations, or implementing accessible design patterns.
---

# WCAG Audit Patterns

Comprehensive guide to auditing web content against WCAG 2.2 guidelines with actionable remediation strategies.

## When to Use This Skill

- Achieving VPAT compliance
- Meeting ADA/Section 508 requirements
- Preparing for accessibility lawsuits
- Implementing accessible components
- Fixing WCAG violations
- Conducting accessibility audits

## Core Concepts

### 1. WCAG Conformance Levels

| Level | Description | Required For |
| --- | --- | --- |
| A | Minimum accessibility | Legal baseline |
| AA | Standard conformance | Most regulations |
| AAA | Enhanced accessibility | Specialized needs |

### 2. POUR Principles

```
Perceivable:  Can users perceive the content?
Operable:     Can users operate the interface?
Understandable: Can users understand the content?
Robust:       Does it work with assistive tech?
```

### 3. Common Violations by Impact

```
Critical (Blockers):
├── Missing alt text for functional images
├── No keyboard access to interactive elements
├── Missing form labels
└── Auto-playing media without controls

Serious:
├── Insufficient color contrast
├── Missing skip links
├── Inaccessible custom widgets
└── Missing page titles

Moderate:
├── Missing language attribute
├── Unclear link text
├── Missing landmarks
└── Improper heading hierarchy
```

## Audit Checklist

### Perceivable (Principle 1)

#### 1.1 Text Alternatives

**1.1.1 Non-text Content (Level A)**

- [ ] All images have alt text
- [ ] Decorative images have alt=""
- [ ] Complex images have long descriptions
- [ ] Icons with meaning have accessible names
- [ ] CAPTCHAs have alternatives

```html
<!-- Good -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2" />
<img src="decorative-line.png" alt="" />

<!-- Bad -->
<img src="chart.png" />
<img src="decorative-line.png" alt="decorative line" />
```

#### 1.3 Info and Relationships (Level A)

- [ ] Headings use proper tags (h1-h6)
- [ ] Lists use ul/ol/dl
- [ ] Tables have headers
- [ ] Form inputs have labels
- [ ] ARIA landmarks present

#### 1.4.3 Contrast (Minimum) (Level AA)

- [ ] Text: 4.5:1 contrast ratio
- [ ] Large text (18pt+): 3:1 ratio
- [ ] UI components: 3:1 ratio

Tools: WebAIM Contrast Checker, axe DevTools

### Operable (Principle 2)

#### 2.1.1 Keyboard (Level A)

- [ ] All functionality keyboard accessible
- [ ] No keyboard traps
- [ ] Tab order is logical
- [ ] Custom widgets are keyboard operable

```javascript
// Custom button must be keyboard accessible
<div role="button" tabindex="0"
     onkeydown="if(event.key === 'Enter' || event.key === ' ') activate()">
```

#### 2.4.1 Bypass Blocks (Level A)

- [ ] Skip to main content link present
- [ ] Landmark regions defined
- [ ] Proper heading structure

```html
<a href="#main" class="skip-link">Skip to main content</a>
<main id="main">...</main>
```

#### 2.4.7 Focus Visible (Level AA)

- [ ] Focus indicator visible on all elements
- [ ] Custom focus styles meet contrast

```css
:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### Understandable (Principle 3)

#### 3.1.1 Language of Page (Level A)

- [ ] HTML lang attribute set

```html
<html lang="en">
```

#### 3.3.1 Error Identification (Level A)

- [ ] Errors clearly identified
- [ ] Error message describes problem
- [ ] Error linked to field

```html
<input aria-describedby="email-error" aria-invalid="true" />
<span id="email-error" role="alert">Please enter valid email</span>
```

### Robust (Principle 4)

#### 4.1.2 Name, Role, Value (Level A)

- [ ] ARIA roles correct
- [ ] Custom widgets have accessible names
- [ ] State changes announced

```html
<!-- Accessible custom checkbox -->
<div role="checkbox"
     aria-checked="false"
     tabindex="0"
     aria-labelledby="label">
</div>
<span id="label">Accept terms</span>
```

#### 4.1.3 Status Messages (Level AA)

- [ ] Status updates announced
- [ ] Live regions used correctly

```html
<div role="status" aria-live="polite">3 items added to cart</div>
<div role="alert" aria-live="assertive">Error: Form submission failed</div>
```

## Automated Testing

```javascript
// axe-core integration
const axe = require('axe-core');

async function runAccessibilityAudit(page) {
  await page.addScriptTag({ path: require.resolve('axe-core') });

  const results = await page.evaluate(async () => {
    return await axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
      }
    });
  });

  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete
  };
}

// Playwright test example
test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await runAccessibilityAudit(page);
  expect(results.violations).toHaveLength(0);
});
```

```bash
# CLI tools
npx @axe-core/cli https://example.com
npx pa11y https://example.com
lighthouse https://example.com --only-categories=accessibility
```

## Remediation Patterns

### Fix: Missing Form Labels

```html
<!-- Before -->
<input type="email" placeholder="Email" />

<!-- After: Option 1 - Visible label -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- After: Option 2 - aria-label -->
<input type="email" aria-label="Email address" />
```

### Fix: Insufficient Color Contrast

```css
/* Before: 2.5:1 contrast */
.text {
  color: #767676;
}

/* After: 4.5:1 contrast */
.text {
  color: #595959;
}
```

### Fix: Keyboard Navigation

```javascript
// Make custom element keyboard accessible
class AccessibleDropdown extends HTMLElement {
  connectedCallback() {
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "combobox");
    this.setAttribute("aria-expanded", "false");

    this.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
        case " ":
          this.toggle();
          e.preventDefault();
          break;
        case "Escape":
          this.close();
          break;
        case "ArrowDown":
          this.focusNext();
          e.preventDefault();
          break;
        case "ArrowUp":
          this.focusPrevious();
          e.preventDefault();
          break;
      }
    });
  }
}
```

## Best Practices

### Do's

- Start early - Accessibility from design phase
- Use semantic HTML - Reduces ARIA needs
- Automate what you can - 30-50% issues detectable
- Test with real users - Disabled users provide best feedback
- Document patterns - Build accessible component library

### Don'ts

- Don't use ARIA as first solution - Native HTML first
- Don't hide focus outlines - Keyboard users need them
- Don't disable zoom - Users need to resize
- Don't use color alone - Multiple indicators needed
- Don't rely only on automated testing - Manual testing required

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [WebAIM](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [axe DevTools](https://www.deque.com/axe/)
