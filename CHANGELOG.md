# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — First-run orchestrator

A coordinated first-run experience. The three entry surfaces (Disclaimer,
Changelogs, Onboarding) no longer fight for the screen or rely on DOM-coupling
between components. A single `<FirstRunOrchestrator>` owns a priority queue and
renders one flow at a time, computed during SSR.

See [`docs/adr/0001-first-run-orchestrator.md`](./docs/adr/0001-first-run-orchestrator.md)
for the architecture decision and [`docs/migration-v2.md`](./docs/migration-v2.md)
for the consumer upgrade guide.

### Added

- **`<FirstRunOrchestrator>`** — the only component a consumer needs to mount
  (typically in `app.vue`). Computes which flows are pending for the current
  user from the three completion cookies, sorts by priority
  (Disclaimer 30 > Changelogs 20 > Onboarding 10), and renders the active one.
  Re-evaluates on each flow's completion.
- **`useChangelogsPending()` composable** — encapsulates the Changelogs
  pending check (first-visit skip rule + async fetch + reactive re-evaluation
  when the `changelogs-last-read` cookie changes).
- **`<ChangelogsButton>`** — navbar affordance that re-triggers the Changelogs
  flow on demand (resets the cookie; no reload).
- **`<OnboardingRestartButton>`** — navbar affordance that re-runs the tour
  (clears `tour-completed`).
- **`disableOnboarding`** runtimeConfig flag (env:
  `NUXT_PUBLIC_COMMON_UI_DISABLE_ONBOARDING`), for parity with the existing
  `disableDisclaimer` / `disableChangelog` flags.
- **Disclaimer content defaults in runtimeConfig** —
  `commonUi.disclaimer.{appName, version, contentHtml, postfixHtml, confirmationText}`,
  overridable via the orchestrator's `:disclaimer` prop.
- **`first-run-keys` migration plugin** — auto-registers via the module; performs
  a one-time, sentinel-guarded port of the old `localStorage` values
  (`disclaimerAccepted`, `changelogs-last-read`) to the new cookies, then deletes
  the `localStorage` keys. Existing users see no regression.
- **Flow contract types** — `FirstRunFinishedPayload`, `FirstRunFlowId`,
  `FIRST_RUN_PRIORITY`, plus `CommonUiRuntimeConfig` / `DisclaimerConfig` /
  `isFlowDisabled()`, exported from the module types.
- i18n key `common-ui.tour.restart` (en: "Restart tour", de: "Tour neu starten").

### Changed

- **`<Disclaimer>`**, **`<Changelogs>`**, **`<Onboarding>`** are now
  orchestrator-owned children. They no longer self-gate, no longer read
  `runtimeConfig` disable flags, and no longer persist their own state. Each
  declares its UI and emits `finished({ completed })`; the orchestrator records
  completion and unmounts them.
- **Completion state moved to cookies** (SSR-readable, no flash):
  - `disclaimerAccepted` (localStorage, JSON-encoded) → `disclaimer-accepted` (cookie)
  - `changelogs-last-read` (localStorage, raw) → `changelogs-last-read` (cookie)
  - `tour-completed` (cookie) — unchanged
- **`<Disclaimer>` props** — `disclaimerVersion` removed (orchestrator owns the
  version via runtimeConfig). The `appName` / `contentHtml` / `postfixHtml` /
  `confirmationText` props remain; the orchestrator forwards them from
  runtimeConfig defaults or its own `:disclaimer` prop override.
- **`<Changelogs>` props** — now accepts `releases` (the fetched data) instead
  of fetching itself; the orchestrator supplies it via `useChangelogsPending()`.
- **`<Onboarding>`** — auto-starts on mount (the orchestrator gates mounting);
  the `defineExpose({ start, destroy })` API is retained but no longer required
  for normal operation.
- **`<DisclaimerButton>`** — resets the `disclaimer-accepted` cookie instead of
  the old `localStorage` key.
- **`<NavigationBar>`** — now includes `<ChangelogsButton>` and
  `<OnboardingRestartButton>` alongside `<DisclaimerButton>` in the default
  right slot.
- `CONTEXT.md` and `docs/adr/` added to record the domain language and the
  orchestrator decision.

### Removed

- **`useLocalStorage` composable** — deleted. Its only internal consumers
  (`Disclaimer`, `DisclaimerButton`) have moved to `useCookie`. **Breaking** for
  any external consumer importing it; see the migration guide.
- **`MutationObserver` in `<Onboarding>`** — the DOM-based wait on the
  `.disclaimer-modal` class is gone. Ordering is now the orchestrator's job.

### Fixed

- Double-`start()` bug where the parent page and the component's own `onMounted`
  both kicked off the tour (`playground/app/pages/onboarding.vue` no longer calls
  `start()`; the orchestrator triggers the flow by mounting).
- One source of SSR/client hydration flicker for the Disclaimer modal: pending
  state is now cookie-backed and readable during SSR.

### Migration impact

- **Breaking:** direct `<Disclaimer>` / `<Changelogs>` / `<Onboarding>` mounts
  no longer work standalone — adopt `<FirstRunOrchestrator>`.
- **Breaking:** `useLocalStorage` import path removed.
- **Non-breaking for end users:** existing `localStorage` values are migrated
  automatically on first visit after upgrade.
