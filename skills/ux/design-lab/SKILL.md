---
name: design-lab
description: Interactive design exploration workflow: conduct interviews, generate variants, and refine UI designs through feedback.
---

# Design Lab Skill

This skill implements a complete design exploration workflow: interview, generate variations, collect feedback, refine, preview, and finalize.

## Critical: Cleanup Behavior

All temporary files MUST be deleted when the process ends, whether by:
- User aborts/cancels → cleanup immediately, no plan generated
- User confirms final design → cleanup, then generate plan

Never leave `.claude-design/` or `__design_lab` routes behind.

## Phase 0: Preflight Detection

Before starting the interview, automatically detect:

### Package Manager
Check for lock files: `bun.lockb` → bun, `package-lock.json` → npm, `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm

### Framework Detection
Check for config files: `next.config.js/mjs/ts` → Next.js (check for `pages/` or `app/` directory)

### Styling System Detection
Check `package.json` dependencies: Tailwind, Emotion, styled-components, Ant Design, Chakra UI, Material UI

### Visual Style Inference (Critical)
DO NOT use generic/predefined styles. Extract visual language from the project by reading `tailwind.config.js`, CSS variables, or existing components.

## Phase 1: Interview

Use AskUserQuestion tool for all interview steps.

### Step 1.1: Scope & Target
- Scope: "Page" or "Component"
- New or Redesign: "Redesign" or "New"
- If redesign, ask for existing path

### Step 1.2: Pain Points & Inspiration
- Pain Points: Outdated look, Poor mobile experience, Unclear hierarchy, Too cluttered
- Visual Inspiration: Apple, Notion, Linear, Stripe
- Functional Inspiration: Keyboard shortcuts, Optimistic updates, Progressive disclosure, Inline editing

### Step 1.3: Brand & Style Direction
- Brand Adjectives: Utilitarian, Playful, Premium, Minimal
- Density: Spacious, Comfortable, Compact
- Dark Mode: Nice to have, No, Yes

### Step 1.4: Persona & Jobs-to-be-Done
- Primary User: End consumer, Business user, Designer, Developer
- Context: Both equally, Mobile-first, Desktop-first
- Key Tasks: (open-ended)

### Step 1.5: Constraints
- Must-Keep Elements: None, Navigation structure, Current fields/inputs, Existing copy/labels
- Technical Constraints: None, Must be accessible, Use existing components, No new dependencies

## Phase 2: Generate Design Brief

Create `.claude-design/design-brief.json` with all gathered information.

## Phase 3: Generate Design Lab

### Directory Structure

```
.claude-design/
├── lab/
│   ├── page.tsx
│   ├── variants/
│   │   ├── VariantA.tsx through VariantE.tsx
│   ├── components/
│   │   └── LabShell.tsx
│   ├── feedback/
│   │   └── FeedbackOverlay.tsx
│   └── data/
│       └── fixtures.ts
├── design-brief.json
└── run-log.md
```

### Variant Generation Guidelines

Each variant MUST explore a different design axis:

- **Variant A:** Information Hierarchy Focus
- **Variant B:** Layout Model Exploration
- **Variant C:** Density Variation
- **Variant D:** Interaction Model
- **Variant E:** Expressive Direction

### Feedback Overlay (Critical - Never Skip)

The FeedbackOverlay enables users to click on elements and leave comments. Create it in the same directory as `page.tsx` for reliable imports.

```tsx
import { FeedbackOverlay } from './FeedbackOverlay';

export default function DesignLabPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-variant="A"><VariantA /></div>
          <div data-variant="B"><VariantB /></div>
          {/* ... more variants */}
        </div>
      </main>
      <FeedbackOverlay targetName="ComponentName" />
    </div>
  );
}
```

## Phase 4: Present Design Lab

Output the lab location and URL. Do NOT start the dev server (it runs forever).

```
✅ Design Lab created!

I've generated 5 design variants in `.claude-design/lab/`

To view them:
1. Make sure your dev server is running
2. Open: http://localhost:3000/__design_lab
```

## Phase 5: Collect Feedback

Interactive feedback via the overlay, or manual feedback via AskUserQuestion.

## Phase 6: Synthesize New Variant

If user likes parts of different variants, create a hybrid Variant F.

## Phase 7: Final Preview

Create `.claude-design/preview/` with the winning design. For redesigns, include before/after comparison.

## Phase 8: Finalize

### 8.1: Cleanup
Delete all temporary files and routes.

### 8.2: Generate Implementation Plan
Create `DESIGN_PLAN.md` with:
- Summary (scope, target, winner variant, key improvements)
- Files to Change
- Implementation Steps
- Component API
- Required UI States
- Accessibility Checklist
- Testing Checklist

### 8.3: Update Design Memory
Create or update `DESIGN_MEMORY.md` with brand tone, layout preferences, typography, color, interaction patterns, and accessibility rules.

## Abort Handling

If user says "cancel", "abort", "stop", or "nevermind":
1. Confirm the abort
2. Delete all temporary files
3. Do NOT generate any implementation plan
4. Acknowledge cleanup
