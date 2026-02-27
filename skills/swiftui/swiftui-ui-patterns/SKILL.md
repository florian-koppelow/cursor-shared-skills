---
name: swiftui-ui-patterns
description: Best practices and example-driven guidance for building SwiftUI views and components. Includes tab architecture and screen composition.
---

# SwiftUI UI Patterns

## Quick start

Choose a track based on your goal:

### Existing project

- Build the view with small, focused subviews and SwiftUI-native data flow.
- Choose the relevant component reference from `references/components-index.md` and follow its guidance.
- Apply local conventions: prefer SwiftUI-native state, keep state local when possible, and use environment injection for shared dependencies.
- Find a nearby example in the repo with `rg "TabView\("` or similar, then read the closest SwiftUI view.
- Identify the feature or screen and the primary interaction model (list, detail, editor, settings, tabbed).

### New project scaffolding

- Expand the route and sheet enums as new screens are added.
- Choose the next component reference based on the UI you need first (TabView, NavigationStack, Sheets).
- Add a minimal `AppTab` and `RouterPath` based on the provided skeletons.
- Start with `references/app-scaffolding-wiring.md` to wire TabView + NavigationStack + sheets.

## General rules to follow

- Sheets: Prefer `.sheet(item:)` over `.sheet(isPresented:)` when state represents a selected model. Avoid `if let` inside a sheet body. Sheets should own their actions and call `dismiss()` internally instead of forwarding `onCancel`/`onConfirm` closures.
- Follow the project's formatter and style guide.
- Maintain existing legacy patterns only when editing legacy files.
- Use async/await with `.task` and explicit loading/error states.
- Prefer composition; keep views small and focused.
- Use modern SwiftUI state (`@State`, `@Binding`, `@Observable`, `@Environment`) and avoid unnecessary view models.

## Workflow for a new SwiftUI view

1. Validate with a build and update usage callsites if needed.
2. Add accessibility labels or identifiers when the UI is interactive.
3. Implement async loading with `.task` and explicit state enum if needed.
4. Sketch the view hierarchy and extract repeated parts into subviews.
5. Identify dependencies to inject via `@Environment`.
6. Define the view's state and its ownership location.

## Component references

Use `references/components-index.md` as the entry point. Each component reference should include:

- Paths to existing examples in the current repo.
- Pitfalls and performance notes.
- Minimal usage pattern with local conventions.
- Intent and best-fit scenarios.

## Sheet patterns

### Item-driven sheet (preferred)

```swift
@State private var selectedItem: Item?

.sheet(item: $selectedItem) { item in
    EditItemSheet(item: item)
}
```

### Sheet owns its actions

```swift
struct EditItemSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(Store.self) private var store

    let item: Item
    @State private var isSaving = false

    var body: some View {
        VStack {
            Button(isSaving ? "Saving…" : "Save") {
                Task { await save() }
            }
        }
    }

    private func save() async {
        isSaving = true
        await store.save(item)
        dismiss()
    }
}
```

## Adding a new component reference

- Update `references/components-index.md` with the new entry.
- Keep it short and actionable; link to concrete files in the current repo.
- Create `references/<component>.md`.
