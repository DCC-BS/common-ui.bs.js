# common-ui.bs.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/common-ui.bs.js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/DCC-BS/common-ui.bs.js/publish.yml)
[![codecov](https://codecov.io/gh/DCC-BS/common-ui.bs.js/graph/badge.svg)](https://codecov.io/gh/DCC-BS/common-ui.bs.js)

Common Nuxt components and UI utilts.

## Quick Setup

To install the module create a `.npmrc` next to your `package.json` file:

```txt
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@dcc-bs:registry=https://npm.pkg.github.com
```

Create a github [personal access token (classic)](https://github.com/settings/tokens/new) with `read:packages` permissions and add it to your `.env` file:

```txt
GITHUB_TOKEN='YOUR_TOKEN'
```

Install the module to your Nuxt application with:

```bash
bun add @dcc-bs/common-ui.bs.js
```

Change the `nuxt.config.ts`:
```ts
    ...
    modules: [
        ...
        '@dcc-bs/common-ui.bs.js',
    ],
    ...
```

add the following line to you css file:
```css
@source "../../node_modules/@dcc-bs/common-ui.bs.js/dist/runtime";
```

That's it! You can now use common-ui.bs.js in your Nuxt app ✨

## Components

### SplitView

The `SplitView` component allows you to create a resizable split view layout. It supports both horizontal and vertical orientations.

#### Props

- `aPaneStyle` (string, optional): Custom css classes for the first pane.
- `bPaneStyle` (string, optional): Custom css classes for the second pane.
- `spltiViewStyle` (string, optional): Custom css classes for the split view container.
- `resizerStyle` (string, optional): Custom css classes for the resizer.
- `resizerInnerStyle` (string, optional): Custom css classes for the inner resizer.
- `isHorizontal` (boolean, optional): Determines the orientation of the split view. Default is `false` (vertical).

#### Slots

- `a`: Content for the first pane.
- `b`: Content for the second pane.

#### Example Usage

```vue
<template>
  <SplitView :isHorizontal="true">
    <template #a>
      <div>Pane A Content</div>
    </template>
    <template #b>
      <div>Pane B Content</div>
    </template>
  </SplitView>
</template>
```

### DisclaimerLlm

The `DisclaimerLlm` component displays a disclamer modal which the user must accept before using the application. It is typically used for applications that involve AI or machine learning models.

#### Example Usage

```vue
<template>
  <Disclaimer
    appName="My App"
    postfixHTML="<p>Some additional information about the disclaimer.</p>"
    confirmationText="I accept the terms and conditions."
    />
</template>
```
The `postfixHTML` is optional when not set it will default to an empty string.
The `confirmationText` is also optional, if not set it will default to the default disclaimer text.

You can also use the `DisclaimerButton` component to trigger the disclaimer modal again after it has been accepted:

```vue
<template>
  <DisclaimerButton />
</template>
```

### DataBsBanner

The `DataBsBanner` component displays a banner with a link to a data science and AI page.

#### Example Usage

```vue
<template>
  <DataBsBanner />
</template>
```

## Release a new Version
Commit your changes and then:
```sh
bun release
```