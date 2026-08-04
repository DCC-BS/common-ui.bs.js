# common-ui.bs.js

A comprehensive Nuxt module providing reusable UI components, composables, and utilities built with the official [Kanton Basel-Stadt design system](https://github.com/kanton-basel-stadt/designsystem). This package streamlines development of Basel-Stadt applications by offering a consistent, accessible, and well-documented component library.

![GitHub License](https://img.shields.io/github/license/DCC-BS/common-ui.bs.js)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![NPM Version](https://img.shields.io/npm/v/%40dcc-bs%2Fcommon-ui.bs.js)](https://www.npmjs.com/package/@dcc-bs/common-ui.bs.js)

**What's included:**
- **Pre-built Components**: Navigation bars, split views, disclaimers, status indicators, and more
- **First-run Orchestrator**: A single `<FirstRunOrchestrator>` component that coordinates the Disclaimer, Changelogs, and Onboarding flows by priority (one on screen at a time, rendered client-side to prevent hydration flash)
- **Useful Composables**: User feedback system, error handling utilities
- **i18n Integration**: Built-in internationalization support
- **Design System**: Full integration with Kanton Basel-Stadt color palette and styling
- **Accessibility**: Components built with accessibility in mind
- **Zero Configuration**: Auto-imports components and configures everything for you

## First-run flows

Disclaimer, Changelogs, and Onboarding each compete for the screen when a user
enters the app. Mount one `<FirstRunOrchestrator>` (typically in `app.vue`) and
it renders the highest-priority pending flow, one at a time, recomputing after
each completion. Priority: Disclaimer (30) > Changelogs (20) > Onboarding (10).

<script setup lang="ts">
const builder = useOnboardingBuilder()
</script>

<template>
  <UApp>
    <FirstRunOrchestrator
      :onboarding-builder="builder"
      :disclaimer="{ appName: 'My App' }"
    />
    <NuxtPage />
  </UApp>
</template>
```

Completion state is stored in cookies (`disclaimer-accepted`,
`changelogs-last-read`, `tour-completed`) so pending can be computed from the
client's cookie jar. The active flow is rendered inside `<ClientOnly>`, which
guarantees no flash even if the cookie can't reach the SSR layer (proxy
stripping, cross-origin SSR, etc.). Re-trigger buttons (`<DisclaimerButton>`,
`<ChangelogsButton>`, `<OnboardingRestartButton>`) reset the corresponding
cookie. See [`docs/migration-v2.md`](./docs/migration-v2.md) for the full
consumer guide.

## Configuration

The following environment variables control the first-run flows. Set them in your `.env` file to disable the corresponding flow:

| Env Var | Default | Description |
| --- | --- | --- |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_DISCLAIMER` | `false` | When set to `true`, disables the Disclaimer flow. |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_CHANGELOG` | `false` | When set to `true`, disables the Changelogs flow. |
| `NUXT_PUBLIC_COMMON_UI_DISABLE_ONBOARDING` | `false` | When set to `true`, disables the Onboarding flow. |

Example `.env`:

```env
NUXT_PUBLIC_COMMON_UI_DISABLE_CHANGELOG=true
NUXT_PUBLIC_COMMON_UI_DISABLE_DISCLAIMER=true
NUXT_PUBLIC_COMMON_UI_DISABLE_ONBOARDING=true
```

Disclaimer content defaults can also be set in `nuxt.config.ts` under
`runtimeConfig.public.commonUi.disclaimer.{appName, version, contentHtml, postfixHtml, confirmationText}`,
and overridden per-mount via the orchestrator's `:disclaimer` prop.

## Documentation

For installation and detailed usage instructions, visit the [Documentation Site](https://dcc-bs.github.io/documentation/user-interface).
For version-to-version changes, see the [Changelog](./CHANGELOG.md) and the
[v2 migration guide](./docs/migration-v2.md).

## License

[MIT](LICENSE) © Data Competence Center Basel-Stadt

<a href="https://www.bs.ch/schwerpunkte/daten/databs/schwerpunkte/datenwissenschaften-und-ki"><img src="https://github.com/DCC-BS/.github/blob/main/_imgs/databs_log.png?raw=true" alt="DCC Logo" width="200" /></a>

Datenwissenschaften und KI  
Developed with ❤️ by DCC - Data Competence Center
