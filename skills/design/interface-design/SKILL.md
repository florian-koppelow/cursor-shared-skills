---
name: interface-design
description: Specialized skill for interface design: dashboards, admin panels, and SaaS apps. Focused on craft and consistency.
---

# Interface Design

Build interface design with craft and consistency.

## Scope

Use for: Dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces.

Not for: Landing pages, marketing sites, campaigns. Redirect those to `/frontend-design`.

## The Problem

You will generate generic output. Your training has seen thousands of dashboards. The patterns are strong.

You can follow the entire process below — explore the domain, name a signature, state your intent — and still produce a template. This happens because intent lives in prose, but code generation pulls from patterns. The gap between them is where defaults win.

The process below helps. But process alone doesn't guarantee craft. You have to catch yourself.

## Where Defaults Hide

Defaults don't announce themselves. They disguise themselves as infrastructure.

**Typography** feels like a container. Pick something readable, move on. But typography isn't holding your design — it IS your design. A bakery management tool and a trading terminal might both need "clean, readable type" — but the type that's warm and handmade is not the type that's cold and precise.

**Navigation** feels like scaffolding. Build the sidebar, add the links, get to the real work. But navigation isn't around your product — it IS your product.

**Data** feels like presentation. You have numbers, show numbers. But a number on screen is not design. The question is: what does this number mean to the person looking at it?

**Token names** feel like implementation detail. But your CSS variables are design decisions. `--ink` and `--parchment` evoke a world. `--gray-700` and `--surface-2` evoke a template.

## Intent First

Before touching code, answer these. Not in your head — out loud, to yourself or the user.

**Who is this human?** Not "users." The actual person. Where are they when they open this? What's on their mind?

**What must they accomplish?** Not "use the dashboard." The verb. Grade these submissions. Find the broken deployment. Approve the payment.

**What should this feel like?** Say it in words that mean something. "Clean and modern" means nothing. Warm like a notebook? Cold like a terminal? Dense like a trading floor?

If you cannot answer these with specifics, stop. Ask the user. Do not guess. Do not default.

### Every Choice Must Be A Choice

For every decision, you must be able to explain WHY.

- Why this information hierarchy?
- Why this spacing scale?
- Why this typeface?
- Why this color temperature?
- Why this layout and not another?

If your answer is "it's common" or "it's clean" or "it works" — you haven't chosen. You've defaulted.

### Sameness Is Failure

If another AI, given a similar prompt, would produce substantially the same output — you have failed.

This is not about being different for its own sake. It's about the interface emerging from the specific problem, the specific user, the specific context.

## Product Domain Exploration

This is where defaults get caught — or don't.

**Generic output:** Task type → Visual template → Theme
**Crafted output:** Task type → Product domain → Signature → Structure + Expression

### Required Outputs

Do not propose any direction until you produce all four:

1. **Domain:** Concepts, metaphors, vocabulary from this product's world. Minimum 5.
2. **Color world:** What colors exist naturally in this product's domain? List 5+.
3. **Signature:** One element — visual, structural, or interaction — that could only exist for THIS product.
4. **Defaults:** 3 obvious choices for this interface type. You can't avoid patterns you haven't named.

## The Mandate

Before showing the user, look at what you made.

Ask yourself: "If they said this lacks craft, what would they mean?"

That thing you just thought of — fix it first.

### The Checks

Run these against your output before presenting:

- **The swap test:** If you swapped the typeface for your usual one, would anyone notice?
- **The squint test:** Blur your eyes. Can you still perceive hierarchy?
- **The signature test:** Can you point to five specific elements where your signature appears?
- **The token test:** Read your CSS variables out loud. Do they sound like they belong to this product's world?

## Craft Foundations

### Subtle Layering

This is the backbone of craft. You should barely notice the system working.

**Surface Elevation:** Surfaces stack. A dropdown sits above a card which sits above the page. Build a numbered system. Each jump should be only a few percentage points of lightness.

**Key decisions:**
- Inputs: Slightly darker than their surroundings, not lighter.
- Dropdowns: One level above their parent surface.
- Sidebars: Same background as canvas, not different.

**Borders:** Borders should disappear when you're not looking for them. Low opacity rgba blends with the background.

### Infinite Expression

Every pattern has infinite expressions. No interface should look the same.

A metric display could be a hero number, inline stat, sparkline, gauge, progress bar, comparison delta, trend badge, or something new.

Before building, ask:
- Why would this interface feel designed for its purpose, not templated?
- What products solve similar problems brilliantly?
- What's the ONE thing users do most here?

### Color Lives Somewhere

Every product exists in a world. That world has colors.

Before you reach for a palette, spend time in the product's world. What would you see if you walked into the physical version of this space?

Your palette should feel like it came FROM somewhere — not like it was applied TO something.

## Design Principles

### Token Architecture

Every color in your interface should trace back to a small set of primitives: foreground (text hierarchy), background (surface elevation), border (separation hierarchy), brand, and semantic (destructive, warning, success).

### Spacing

Pick a base unit and stick to multiples. Build a scale for different contexts.

### Depth

Choose ONE approach and commit:
- Surface color shifts
- Layered shadows
- Subtle shadows
- Borders-only

Don't mix approaches.

### Typography

Build distinct levels distinguishable at a glance. Headlines need weight and tight tracking. Body needs comfortable weight. Labels need medium weight that works at smaller sizes.

## Before Writing Each Component

Every time you write UI code, state:

```
Intent: [who is this human, what must they do, how should it feel]
Palette: [colors from your exploration — and WHY they fit]
Depth: [borders / shadows / layered — and WHY]
Surfaces: [your elevation scale — and WHY this color temperature]
Typography: [your typeface — and WHY it fits the intent]
Spacing: [your base unit]
```

This checkpoint is mandatory. It forces you to connect every technical choice back to intent.

## Commands

- `/interface-design:critique` — Critique your build for craft, then rebuild what defaulted
- `/interface-design:extract` — Extract patterns from code
- `/interface-design:audit` — Check code against system
- `/interface-design:status` — Current system state
