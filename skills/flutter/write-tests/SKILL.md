---
name: write-tests
description: Write Flutter/Dart tests following project conventions
---

# Write Flutter/Dart Tests

Complete guide for writing tests in this Flutter monorepo. Follow these patterns for consistent, maintainable tests.

## Prerequisites

Before writing tests, also read:
- The `riverpod-provider-overrides` skill — provider override patterns for tests

## Testing Philosophy

Every test should earn its place by providing **real confidence**. Focus on testing as deep as makes sense and maximizing the value of each test.

- **Test at the right depth** — test through the public API or widget surface whenever possible. Go deeper only when a specific layer has complex logic worth isolating.
- **Each test should validate meaningful outcomes** — set up a realistic scenario, then assert everything relevant about the result in one go.
- **Combine assertions that share a setup** — if multiple things should be true after the same action, assert them together rather than duplicating setup across tests.
- **Separate tests when the setup genuinely differs** — different states, different inputs, error vs. success paths each deserve their own test.
- **Test what is happening, not how it is happening** — verify results and behavior, not implementation details.

The goal: maximum confidence from every test. If a test doesn't meaningfully increase confidence in the system, reconsider whether it's needed.

## Core Principles

- Use `mocktail` for mocking
- Follow Arrange-Act-Assert pattern
- **NEVER add structural comments** like `// Arrange`, `// Act`, `// Assert`, `// 1. Variables` — structure should be self-evident through whitespace
- Match complete objects over single properties (see the `test-matching` skill)
- Avoid explicit `equals` (implicitly used in `expect`)
- Properly dispose of test resources with `addTearDown`
- Re-instantiate mocks in `setUp` to ensure clean state between tests
- **ALWAYS use spot library** instead of Flutter's native `find` and `tester` APIs

## Test Structure & Organization

### Group Hierarchy

Always follow: `ClassName` → `methodName` → individual tests

```dart
group(ClassName, () {
  group('methodName', () {
    testWidgets('GIVEN... WHEN... THEN...', (tester) async { });
  });
});
```

### File Structure Order

1. **Variable declarations** (late variables for mocks)
2. **setUp/tearDown methods**
3. **Helper methods** (all helpers together)
4. **Test groups and test cases**

```dart
late MockGoRouter goRouter;
late MockLaunchDarkly launchDarkly;
late MockSharedPreferences sharedPreferences;
late MockAnalyticsProxy analyticsProxy;

setUp(() {
  goRouter = MockGoRouter();
  launchDarkly = MockLaunchDarkly();
  sharedPreferences = MockSharedPreferences();
  analyticsProxy = MockAnalyticsProxy.globallyRegistered();
  
  when(() => launchDarkly.track(any(), data: any(named: 'data'))).thenAnswer((_) {});
});

Future<void> pumpTestWidgetAndSettle(WidgetTester tester, {bool enableFeature = true}) async {
  await tester.pumpWidget(/* ... */);
  await tester.pumpAndSettle();
}

group(ClassName, () {
  testWidgets('GIVEN...', (tester) async { /* ... */ });
});
```

## Test Descriptions

Use `GIVEN ... WHEN ... THEN` format on separate lines:

```dart
testWidgets(
  'GIVEN ${SomeEnum.someValue.name} is enabled '
  'AND initial data is loaded '
  'WHEN the method is called '
  'THEN $SomeWidget is displayed '
  'AND analytics event is tracked',
  (tester) async { /* ... */ },
);
```

Include feature flags and specific states:
```dart
'GIVEN ${FeatureFlag.someFlagName.name} is enabled'
'GIVEN controller is in error state'
```

## Widget Test Helper Pattern

Every widget test file should have a comprehensive helper method:

```dart
Future<void> pumpTestWidgetAndSettle(
  WidgetTester tester, {
  bool enableFeature = true,
  bool hasActiveContract = false,
  AsyncValueGetter<SomeData>? data,
  NetworkState? networkState,
}) async {
  await tester.pumpWidget(
    HeartbeatTestBench(
      overrides: [
        canReadContractsConditionProvider.overrideWithValue(hasActiveContract),
        someDataProvider.overrideWith((_) => data?.call() ?? defaultData),
        someControllerProvider.overrideWith(
          () => MockController(networkState: networkState),
        ),
      ],
      flagOverrides: {FeatureFlag.someFlag: enableFeature},
      child: HeartbeatWidgetTestTestBench(
        child: InheritedGoRouter(
          goRouter: goRouter,
          child: const WidgetUnderTest(),
        ),
      ),
    ),
  );
  await tester.pumpAndSettle();
}
```

**Use direct values** for simple booleans, **AsyncValueGetter** for Future-based providers.

## Test Utilities Decision Tree

### HeartbeatTestBench
Use when widget or children use Riverpod's `ref`. This is the **only** test bench that provides a `ProviderScope` with all necessary default overrides (feature flags, mock clients, support button visibility, etc.). If any widget in the tree watches or reads a Riverpod provider, `HeartbeatTestBench` MUST be an ancestor.

### HeartbeatWidgetTestTestBench
Provides theme, locale, and layout — but **NO `ProviderScope`**. Always wrap with `HeartbeatTestBench` if any child widget uses Riverpod providers. Use when widget or children use:
- `context.messages.*` (localizations)
- `context.harmonizedSpacing.*` (Harmonized Theme)
- Widgets prefixed with `Harmonized`

### InheritedGoRouter
Wrap when widget uses navigation. Must wrap `HeartbeatWidgetTestTestBench`.

### Common Issue: "No GoRouter found in context"
Ensure `InheritedGoRouter` wraps `HeartbeatWidgetTestTestBench` or `MaterialApp`.

## Spot Library Reference

**ALWAYS use spot library** instead of Flutter's native `find` and `tester` APIs.

```dart
import 'package:spot/spot.dart';
```

### Migration Table

| Flutter Native | Spot Library |
|----------------|--------------|
| `find.byType(Widget)` | `spot<Widget>()` |
| `find.text('text')` | `spotText('text')` |
| `find.byKey(key)` | `spotKey(key)` |
| `find.byIcon(icon)` | `spotIcon(icon)` |
| `tester.tap(finder)` | `await act.tap(selector)` |
| `tester.enterText(finder, text)` | `await act.enterText(selector, text)` |
| `expect(finder, findsOneWidget)` | `selector.existsOnce()` |
| `expect(finder, findsNothing)` | `selector.doesNotExist()` |
| `expect(finder, findsNWidgets(n))` | `selector.existsExactlyNTimes(n)` |
| `tester.element(finder)` | `selector.snapshotElement()` |
| `finder.at(n)` | `selector.atIndex(n)` or `.first()` / `.last()` |

### Basic Finding & Assertions

```dart
// Find and assert
spot<HarmonizedButton>().existsOnce();
spotText('Submit').existsOnce();
spotIcon(HarmonizedIcons.menu).existsOnce();
spotKey(K.submitButtonKey).existsOnce();

// Existence assertions
spot<MyWidget>().doesNotExist();
spot<MyWidget>().existsExactlyNTimes(3);
spot<MyWidget>().existsAtLeastOnce();
```

### Actions

```dart
await act.tap(spot<HarmonizedButton>());
await act.enterText(spot<TextField>(), 'Hello World');

// Scrolling
await act.dragUntilVisible(
  dragStart: spot<CustomScrollView>().first(),
  dragTarget: spot<SubmitButton>(),
  moveStep: const Offset(0, -50),
  maxIteration: 10,
);
```

### Selecting Specific Widgets

```dart
spot<HarmonizedListItem>().first();
spot<HarmonizedSwitch>().last();
spot<HarmonizedSwitch>().atIndex(1);
```

### Parent & Child Filtering

```dart
// Find with specific parent
spotText('Save', parents: [spot<HarmonizedButton>()]).existsOnce();

// Find with specific child
spot<HarmonizedListItem>(children: [spotText('Settings')]).existsOnce();

// Chained child selector
spot<PeakShavingToggle>().spot<HarmonizedSwitch>().existsOnce();
```

### Checking Widget Properties

```dart
spot<HarmonizedSwitch>().existsOnce().hasWidgetProp(
  prop: widgetProp('value', (widget) => widget.value),
  match: (value) => value.isTrue(),
);

// Filter by property
spot<RatingButton>().whereWidgetProp(
  widgetProp('isSelected', (button) => button.isSelected),
  (isSelected) => isSelected,
).existsOnce();
```

### Getting Context & Elements

```dart
// Get BuildContext for localization
final context = spot<MyWidget>().snapshotElement();
final messages = context.messages;

// Get widget for inspection
final widget = spot<BreadCrumbItemView>().first().snapshot().discoveredWidget!;
expect(widget.isActive, isTrue);
```

### Custom Selectors

```dart
WidgetSelector spotTitle(BuildContext context) {
  return spotText(context.messages.pageTitle, exact: true);
}

WidgetSelector spotSubmitButton() {
  return spot<HarmonizedButton>(children: [spotText('Submit')]);
}
```

## Time Manipulation

### Fixed Time with `withClock`

```dart
await withClock(Clock.fixed(DateTime(2024, 3, 15)), () async {
  final result = await someTimeBasedFunction();
  expect(result, expectedValueBasedOnFixedTime);
});
```

### Async Time Control with `fakeAsync`

```dart
fakeAsync((async) {
  expect(subscription.read(), initialValue);
  
  async.flushMicrotasks();
  async.elapse(Duration(minutes: 5));
  
  expect(subscription.read(), updatedValue);
}, initialTime: DateTime(2024, 3, 15));
```

## Screen Size Testing

```dart
tester.view.physicalSize = const Size(500, 1000);
tester.view.devicePixelRatio = 1.0;
addTearDown(tester.view.reset);
```

## Locale Override in Tests

```dart
setUp(() {
  HarmonizedDateFormat.localeOverride = const Locale('de', 'DE');
  HarmonizedNumberFormat.localeOverride = const Locale('de', 'DE');
});

tearDown(() {
  HarmonizedDateFormat.localeOverride = null;
  HarmonizedNumberFormat.localeOverride = null;
});
```

## State Simulation

### Loading State

```dart
testWidgets('GIVEN data is loading WHEN displayed THEN shows indicator', (tester) async {
  await pumpWidget(tester, data: () => Completer<SomeData>().future);
  await tester.pump(); // Don't use pumpAndSettle - would timeout
  spot<CircularProgressIndicator>().existsOnce();
});
```

### Error State

```dart
testWidgets('GIVEN fetch fails WHEN displayed THEN shows error', (tester) async {
  await pumpWidget(tester, data: () async => throw Exception('Network error'));
  spot<ErrorWidget>().existsOnce();
});
```

## Available Mocks

The `heartbeat_app_testing` package provides mocks. Check before creating new ones:

- `src/data/` - Test data (`mockBasicSystem`, `mockTimestamps`, `mockIds`)
- `src/clients/` - API client mocks
- `src/controllers/` - State management mocks
- `src/globals/` - System service mocks (Firebase, Router)
- `src/repositories/` - Data storage mocks

### Common Test Data

```dart
final now = mockNow; // 2024-05-24 09:18
final systemCreated = mockSystemCreationTime; // 2024-01-01
final userCreated = mockUserCreationTime; // 2024-02-01
```

## Complete Test Setup Example

```dart
void main() {
  late MockGoRouter goRouter;
  late MockLaunchDarkly launchDarkly;
  late MockSharedPreferences sharedPreferences;
  late MockAnalyticsProxy analyticsProxy;

  setUp(() {
    goRouter = MockGoRouter();
    launchDarkly = MockLaunchDarkly();
    sharedPreferences = MockSharedPreferences();
    analyticsProxy = MockAnalyticsProxy.globallyRegistered();
    
    when(() => launchDarkly.track(any(), data: any(named: 'data'))).thenAnswer((_) {});
  });

  Future<void> pumpTestWidgetAndSettle(
    WidgetTester tester, {
    bool allowFeature = true,
  }) async {
    await tester.pumpWidget(
      HeartbeatTestBench(
        overrides: [
          launchDarklyProvider.overrideWithValue(launchDarkly),
          sharedPreferencesProvider.overrideWithValue(sharedPreferences),
        ],
        flagOverrides: {FeatureFlag.allowFeature: allowFeature},
        child: HeartbeatWidgetTestTestBench(
          child: InheritedGoRouter(
            goRouter: goRouter,
            child: const WidgetUnderTest(),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  WidgetSelector spotTitle(BuildContext context) {
    return spotText(context.messages.someText, exact: true);
  }

  group(ClassName, () {
    testWidgets(
      'GIVEN initial state '
      'WHEN widget is rendered '
      'THEN $ExpectedWidget is shown',
      (tester) async {
        await pumpTestWidgetAndSettle(tester);
        spot<ExpectedWidget>().existsOnce();
        verify(() => mockDependency.method()).called(1);
      },
    );
  });
}
```

## Key Best Practices Summary

- Declare mock variables at top, re-instantiate in `setUp`
- Create helpers with named parameters and sensible defaults
- Use `HeartbeatTestBench.flagOverrides` instead of `MockLaunchDarkly` for boolean flags
- Pump and settle after widget changes (except infinite animations, use `pump`)
- Clean up resources with `addTearDown`
- Search codebase for existing mocks before creating new ones

## Debugging with Spot Timeline

When tests fail, output includes:
```
View timeline here: file:///path/to/timeline.html
```

**Use this HTML file** to see widget tree state at each test step. Timeline generation is automatic when running from IDE or via Dart MCP tool.
