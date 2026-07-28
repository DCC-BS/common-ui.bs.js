# Migration guide — v1.x → v2.0

v2.0 introduces the **first-run orchestrator**: a single component that owns the
priority queue for Disclaimer, Changelogs, and Onboarding and renders one flow
at a time. This guide walks through upgrading a consumer app.

> See [`CHANGELOG.md`](../CHANGELOG.md) for the full list of changes and
> [`adr/0001-first-run-orchestrator.md`](./adr/0001-first-run-orchestrator.md)
> for the reasoning.

---

## TL;DR

1. Replace every `<Disclaimer>`, `<Changelogs>`, and `<Onboarding>` mount with a
   single `<FirstRunOrchestrator>` in `app.vue`.
2. Move Disclaimer content (appName, confirmation text, …) onto the orchestrator
   (via its `:disclaimer` prop or `runtimeConfig`).
3. Move your onboarding builder next to the orchestrator and pass it via
   `:onboarding-builder`.
4. If you imported `useLocalStorage` from this module, switch to `useCookie`
   (or your own storage).
5. Existing users' state migrates automatically — no data loss.

---

## Why this changed

In v1.x the three flows were independent. The only thing coordinating them was a
`MutationObserver` inside `<Onboarding>` that watched for a `.disclaimer-modal`
CSS class to leave the DOM. Adding Changelogs to the wait would have meant more
DOM string-contracts between components. There was also no shared state — each
flow used a different persistence mechanism (cached `localStorage`, raw
`localStorage`, and a cookie), and they were mounted manually on whichever pages
the developer remembered to mount them.

v2 replaces all of that with one orchestrator component and cookie-based state
readable during SSR. Ordering logic lives in exactly one place.

---

## Before → after

### Before (v1)

```vue
<!-- pages/index.vue (or every page that needed gating) -->
<template>
  <Changelogs />
  <Disclaimer app-name="My App" confirmation-text="…" />
  <NavigationBar />
  <!-- …page content… -->
</template>
```

```vue
<!-- pages/onboarding.vue -->
<script setup>
const onboarding = ref();
onMounted(() => onboarding.value?.start());
</script>
<template>
  <Onboarding ref="onboarding" :builder="builder" />
</template>
```

### After (v2)

```vue
<!-- app.vue — mount once, applies to every page -->
<script setup>
const builder = useOnboardingBuilder()
  .addPhases<"Intro">([/* … */])
  .switchPhase("Intro")
  .addSteps([/* … */]);
</script>

<template>
  <UApp>
    <FirstRunOrchestrator
      :onboarding-builder="builder"
      :disclaimer="{ appName: 'My App', confirmationText: '…' }"
    />
    <NuxtPage />
  </UApp>
</template>
```

That's it. The orchestrator renders Disclaimer → Changelogs → Onboarding in
priority order, one at a time, recomputing after each completion.

---

## Step-by-step

### 1. Remove per-page flow mounts

Delete any `<Disclaimer>`, `<Changelogs>`, and `<Onboarding>` tags from your
pages and layouts. These components still exist but are now orchestrator-owned
children — they no longer self-gate and won't behave correctly when mounted
directly.

Also delete any imperative `onboarding.value?.start()` calls — the orchestrator
starts the tour by mounting the component.

### 2. Add the orchestrator once

Place `<FirstRunOrchestrator>` in `app.vue` (or a top-level layout), outside of
`<NuxtPage>`:

```vue
<FirstRunOrchestrator :onboarding-builder="builder" :disclaimer="disclaimerConfig" />
```

### 3. Provide the onboarding builder

Construct the builder wherever the orchestrator lives and pass it via
`:onboarding-builder`. If you omit it, the Onboarding flow simply never
activates.

```ts
const builder = useOnboardingBuilder()
  .addPhases<"Intro">([{ name: "Intro", onEnter: async () => {} }])
  .switchPhase("Intro")
  .addSteps([{ popover: { title: "Welcome", description: "…" } }]);
```

### 4. Configure the Disclaimer

Two equivalent options:

**Option A — prop on the orchestrator (per-app):**

```vue
<FirstRunOrchestrator
  :onboarding-builder="builder"
  :disclaimer="{ appName: 'My App', confirmationText: '…', version: '1.0.0' }"
/>
```

**Option B — `runtimeConfig` (in `nuxt.config.ts`):**

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      commonUi: {
        disclaimer: {
          appName: "My App",
          confirmationText: "…",
          version: "1.0.0",
        },
      },
    },
  },
});
```

Prop values override runtimeConfig defaults. `version` defaults to `"1.0.0"`;
bump it to re-arm the Disclaimer gate for all users (e.g. after a legal update).

### 5. Handle `useLocalStorage` (if you imported it)

The `useLocalStorage` composable is **removed** in v2. Replace it:

```ts
// before
import { useLocalStorage } from "@dcc-bs/common-ui.bs.js/composables";
const flag = useLocalStorage("my-key", "");

// after — use Nuxt's built-in cookie (SSR-readable) or your own storage
const flag = useCookie<string>("my-key", { default: () => "" });
```

If you only used it indirectly through `<Disclaimer>` / `<DisclaimerButton>`,
you don't need to do anything — those components moved to cookies internally.

---

## State migration (automatic)

Existing users have their completion state in `localStorage`. On first visit
after upgrade, the `migrate-first-run-keys` plugin (auto-registered by the
module) copies the old values to the new cookies and deletes the `localStorage`
keys:

| Old (localStorage)                | New (cookie)            | Encoding change |
| --------------------------------- | ----------------------- | --------------- |
| `disclaimerAccepted` (`"1.0.0"`)  | `disclaimer-accepted`   | JSON-decoded → raw string |
| `changelogs-last-read` (`0.0.0`)  | `changelogs-last-read`  | none (already raw) |
| `tour-completed` (cookie)         | `tour-completed`        | unchanged |

The migration runs once per user, guarded by a `first-run-migrated` sentinel
cookie.

> **One-time UX note:** `localStorage` is not readable during SSR, so an
> existing user's *first* visit after upgrade may briefly render a flow in the
> SSR HTML that the migrated cookie then dismisses during hydration. This
> affects only that single transitional visit; new users and all subsequent
> visits render correctly server-side with no flash.

---

## Environment variables

A new flag joins the existing two:

| Env Var | Default | Description |
| --- | --- | --- |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_CHANGELOG` | `false` | Disables the Changelogs flow. |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_DISCLAIMER` | `false` | Disables the Disclaimer flow. |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_ONBOARDING` | `false` | **New.** Disables the Onboarding flow. |

---

## Optional: navbar re-trigger buttons

`<NavigationBar>` now includes three ghost buttons in its default right slot:
Disclaimer, Changelogs, and Restart-tour. They reset the corresponding cookie so
the orchestrator re-surfaces the flow. If you override the `right` slot, you can
mount them individually:

```vue
<NavigationBar>
  <template #right>
    <DisclaimerButton variant="ghost" />
    <ChangelogsButton />
    <OnboardingRestartButton />
    <LanguageSelect />
  </template>
</NavigationBar>
```

---

## Troubleshooting

**A flow isn't appearing.** Check, in order:
1. Is `<FirstRunOrchestrator>` mounted (and not inside a `v-if` that's false)?
2. Is the flow's disable flag set in `runtimeConfig` / env?
3. For Onboarding — did you pass `:onboarding-builder`?
4. For Changelogs on a brand-new user — by design it never shows on the very
   first visit (empty `changelogs-last-read`). It activates on the second visit
   when new releases exist.

**The Disclaimer keeps re-appearing.** The `disclaimer-accepted` cookie value
must equal the configured `version`. If you bump `version` (or the migration
didn't run), users re-accept once. Check the `first-run-migrated` sentinel
cookie wasn't deleted out from under the migration.

**Onboarding yanks focus from Changelogs (or vice-versa).** It shouldn't — the
orchestrator treats Changelogs' loading state as blocking for lower-priority
flows. If you observe otherwise, confirm you're on v2.0+ of both the module and
your orchestrator mount.

**`useLocalStorage` import error after upgrade.** You had a direct import — see
step 5 above.
