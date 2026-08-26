# First-run flows are coordinated by a central orchestrator with cookie-based pending state

## Context

Disclaimer, Changelogs, and Onboarding each compete for the screen on entry but
had no coordination layer — the only link was a `MutationObserver` in Onboarding
keyed on the `.disclaimer-modal` CSS class, and the three used three different
persistence stores (cached localStorage, raw localStorage, a cookie). Adding
Changelogs to the wait made the DOM-coupling untenable.

## Decision

Introduce a single `<FirstRunOrchestrator>` component that owns a priority queue
of flows. Each flow declares `(id, priority, isPending)` and emits completion;
the orchestrator renders only the highest-priority pending flow and re-evaluates
on each completion. All pending/completion state moves to `useCookie` so the
orchestrator can compute pending reactively, and the active flow is rendered
inside `<ClientOnly>` so the no-flash guarantee holds even when the completion
cookie can't reach the SSR layer (reverse proxy, cross-origin SSR, etc.).
Priority order is fixed: Disclaimer > Changelogs > Onboarding.

## Considered options

- **Strict pipeline (Disclaimer → Changelogs → Onboarding).** Rejected: the
  three have different trigger frequencies (once-per-legal-version /
  every-new-release / once-ever), so most visits run empty stages and the model
  fights reality.
- **Distributed `useFirstRunQueue()` composable with self-mounting components.**
  Rejected: ordering logic stays scattered across components, the "forgot to
  mount on this page" footgun remains, and coordination is implicit.

## Consequences

- Consumer API collapses to one component in `app.vue`.
- Disclaimer/Changelogs/Onboarding become decoupled children with a uniform
  contract (no self-gating, no cross-component DOM coupling, no `MutationObserver`).
- Existing localStorage values migrate once via a client plugin.
- `useLocalStorage` composable is removed (breaking for any external importer;
  its only internal consumers were Disclaimer and DisclaimerButton, both moved
  to `useCookie`).
- Changelogs pending is async (needs a fetch); while its fetch is loading the
  orchestrator treats it as "block lower-priority flows" so Changelogs cannot
  yank focus from Onboarding mid-tour when it resolves.
