# Common UI

Shared Nuxt UI module: chrome, first-run surfaces, and presentational components
for consumer apps.

## Language

**First-run flow** (or **flow**):
One of the independent UI surfaces that competes for the screen when a user enters
the app. Today: Disclaimer, Changelogs, Onboarding.
_Avoid_: component, modal, gate (those are mechanisms, not the concept).

**Gate**:
A flow that blocks interaction with the underlying UI until completed
(Disclaimer). Distinguished from non-blocking flows (Changelogs, Onboarding).
_Avoid_: blocker, wall.

**Pending**:
A flow whose trigger condition is satisfied for the current user, making it a
candidate to show. Computed from the three completion cookies plus the disable
flags, during SSR.

**Active flow**:
The single pending flow currently rendered — the highest-priority pending one.
There is at most one active flow at any time.

**Priority**:
Tie-breaker ordering among pending flows. Canonical order:
Disclaimer (30) > Changelogs (20) > Onboarding (10). Holds in every overlap case.

**Completed**:
Terminal state of a flow that sets its completion cookie so it will not re-pend.
Applies whether the user finished or closed early (close = done).
_Avoid_: done, accepted (those are flow-specific words; "completed" is the
generic term across all flows).

**First-run orchestrator** (or **orchestrator**):
The component (`<FirstRunOrchestrator>`) that owns the priority queue, computes
pending during SSR, and renders the active flow. The only place ordering logic
lives.
_Avoid_: host, manager, coordinator.
