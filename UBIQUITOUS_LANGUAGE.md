# Ubiquitous Language

Glossary for `common-ui.bs.js` — the shared Nuxt UI module (chrome, first-run
surfaces, presentational components) for Basel-Stadt consumer apps. Terms marked
canonical are the ones to use in code, issues, and conversation; the "aliases to
avoid" column lists words that mean the same thing but fragment the vocabulary.

## First-run lifecycle

| Term                        | Definition                                                                                              | Aliases to avoid           |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------- |
| **First-run flow** (**flow**) | One of the independent UI surfaces that competes for the screen when a user enters the app. Today: Disclaimer, Changelogs, Onboarding. | component, modal, gate (mechanisms, not the concept) |
| **Gate**                    | A flow that blocks interaction with the underlying UI until completed (Disclaimer). Distinct from non-blocking flows. | blocker, wall              |
| **Pending**                 | A flow whose trigger condition is satisfied for the current user, making it a candidate to show. Computed from completion cookies + disable flags during SSR. | queued, waiting            |
| **Active flow**             | The single pending flow currently rendered — the highest-priority pending one. At most one at any time. | current flow, shown flow   |
| **Priority**                | Tie-breaker ordering among pending flows. Canonical order: Disclaimer (30) > Changelogs (20) > Onboarding (10). Holds in every overlap. | rank, order, weight        |
| **Completed**               | Terminal state of a flow that sets its completion cookie so it will not re-pend. Applies whether the user finished or closed early (close = done). | done, accepted (flow-specific) |
| **Evaluating**              | A flow whose pending state is still being resolved (Changelogs needs an async fetch). The orchestrator renders nothing and blocks lower-priority flows until it resolves, so a late-resolving flow cannot yank focus. | loading, pending-loading   |
| **First-run orchestrator** (**orchestrator**) | The component (`<FirstRunOrchestrator>`) that owns the priority queue, computes pending during SSR, and renders the active flow. The only place ordering logic lives. | host, manager, coordinator |

## The built-in flows

| Term            | Definition                                                                        | Priority | Gate? |
| --------------- | --------------------------------------------------------------------------------- | -------- | ----- |
| **Disclaimer**  | The legal/acceptance flow. A gate: blocks the UI until the user accepts. Re-arms when its `version` is bumped. | 30       | Yes   |
| **Changelogs**  | The release-notes flow. Non-blocking; never shows on a brand-new user's first visit (empty read state). | 20       | No    |
| **Onboarding**  | The product-tour flow. Non-blocking; requires an onboarding builder to be supplied or it never activates. | 10       | No    |

## State & persistence

| Term                  | Definition                                                                                                       | Aliases to avoid         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Completion cookie** | The cookie that records a flow's completion (`disclaimer-accepted`, `changelogs-last-read`, `tour-completed`). All first-run state lives in cookies so pending is SSR-readable with no flash. | localStorage flag, saved state |
| **Disable flag**      | A `runtimeConfig`/env flag (`DISABLE_DISCLAIMER`, `DISABLE_CHANGELOG`, `DISABLE_ONBOARDING`) that turns a flow off entirely for all users. | toggle, switch           |
| **Re-arm**            | Bumping the Disclaimer `version` so its completion cookie no longer matches, making the gate pending again for every user (e.g. after a legal update). | reset, invalidate        |
| **Re-trigger button** | A navbar button (`<DisclaimerButton>`, `<ChangelogsButton>`, `<OnboardingRestartButton>`) that resets the corresponding completion cookie so the orchestrator re-surfaces that flow. | reopen button, show button |
| **State migration**   | The one-time copy of pre-v2 `localStorage` completion values into the new cookies on upgrade. Runs once per user, guarded by a sentinel cookie. | upgrade, port            |
| **Read state**        | For Changelogs: the `changelogs-last-read` version. The flow is pending when fetched releases exist newer than this value. | last-seen, cursor        |

## System health

| Term                        | Definition                                                                                              | Aliases to avoid           |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------- |
| **App status indicator** (`<SystemStatus>`) | The component that surfaces system-health degradation. Renders only when the readiness check fails — invisible during the initial check and when the system is healthy. | online dot, status badge   |
| **Readiness check**         | The check that determines whether the system is healthy; when it fails, the app status indicator appears. | health probe, ping         |

## Relationships

- The **orchestrator** owns the **priority queue** and renders **at most one active flow** at a time.
- A **flow** becomes **pending** when its trigger condition holds and its **disable flag** is off.
- The **active flow** is the highest-**priority** **pending** flow — unless a higher-priority flow is still **evaluating**, in which case nothing renders.
- **Completing** a flow writes its **completion cookie**, which reactively removes it from pending and lets the next flow surface.
- A **gate** (Disclaimer) is a **flow** that blocks interaction; Changelogs and Onboarding are non-blocking flows.
- A **re-trigger button** clears one **completion cookie**, making that flow **pending** again without a reload.
- **Re-arming** the Disclaimer bumps its `version`; users re-accept once because `disclaimer-accepted` no longer matches.

## Example dialogue

> **Dev:** "When a user enters the app and both Disclaimer and Onboarding are **pending**, which **flow** shows?"
> **Domain expert:** "Disclaimer — it's the only **gate** and its **priority** (30) beats Onboarding (10). The **orchestrator** renders it, and only after the user **completes** it does Onboarding become the **active flow**."
> **Dev:** "And if the user just closes the Disclaimer without reading it?"
> **Domain expert:** "Close = done. Closing **completes** the flow and sets the **completion cookie**, so it won't re-**pend**. If you want it back, the **re-trigger button** clears the cookie."
> **Dev:** "What about Changelogs — it needs a fetch. Can it yank focus from Onboarding mid-tour?"
> **Domain expert:** "No. While Changelogs is **evaluating** the orchestrator renders nothing and blocks lower-**priority** flows, so a late resolve can't interrupt a tour already on screen."
> **Dev:** "How do I force every user to re-accept the legal text after an update?"
> **Domain expert:** "**Re-arm** the Disclaimer: bump its `version`. The stored `disclaimer-accepted` no longer matches, so the **gate** goes **pending** for everyone."

## Flagged ambiguities

- **"completed" is overloaded.** As a domain state it means "the flow reached its terminal state and set its cookie" (close = done). As the `FirstRunFinishedPayload.completed` boolean it means "the user finished the intended action vs. dismissed early." Today these collapse because close always counts as done, but the boolean is preserved so a *future* flow could re-**pend** on an early close. **Recommendation:** keep "completed" for the state; in code review, say "finished vs. dismissed" when you need to distinguish the boolean's two values.

- **"pending" is tri-valued in the orchestrator** (`true` / `false` / `undefined`) but the domain term **Pending** is a binary concept ("trigger satisfied"). The `undefined` case is **evaluating**, not a third kind of pending. **Recommendation:** never call `undefined` "pending" in conversation — call it "evaluating" or "still resolving," so the domain concept stays binary.

- **"accepted" appears in code** (`disclaimer-accepted` cookie, `disclaimerAccepted` ref) but is a Disclaimer-specific word. The generic, cross-flow term is **completed**. **Recommendation:** "accepted" is fine as the Disclaimer's *cookie name*, but use "completed" when speaking about the behavior generically.

- **"modal"/"component"** are still used colloquially for the visual surfaces (and the old `.disclaimer-modal` CSS class lingers in the v1→v2 migration notes). The domain concept is **flow**. **Recommendation:** "modal" describes the mechanism; "flow" describes the concept.
