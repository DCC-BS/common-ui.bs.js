# common-ui.bs.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/common-ui.bs.js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/DCC-BS/common-ui.bs.js/publish.yml)

Common Nuxt components and UI utilities using the official [Kanton Basel-Stadt design system](https://github.com/kanton-basel-stadt/designsystem) colors and styling.

## Quick Setup

**This package can only be used as a Nuxt module.**

1. Install the module to your Nuxt application with:
```sh
bun add git+https://github.com/DCC-BS/common-ui.bs.js.git#v1.1.0
```
replace `v1.1.0` with the latest version tag: ![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/common-ui.bs.js)

2. Add the module to your `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  modules: [
    '@dcc-bs/common-ui.bs.js'
  ]
})
```

3. Add the CSS imports to your main css file:
```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@dcc-bs/common-ui.bs.js";
```

That's it! You can now use common-ui.bs.js in your Nuxt app ✨

## Module Features

When using this Nuxt module:
- All components are automatically available globally without imports
- Internationalization (i18n) integration is automatically configured
- Design system assets are automatically included
- Kanton Basel-Stadt color palette is integrated with Tailwind CSS

## Configuration Options

The module supports configuration options in your `nuxt.config.ts` file:

```typescript
export default defineNuxtConfig({
  modules: [
    '@dcc-bs/common-ui.bs.js'
  ],
  "common-ui.bs.js": {
    path: "server/changelogs", // Path to changelog files directory
  },
})
```

### Configuration Properties

- **path** (string, optional): Path to the directory containing changelog files. This path is resolved relative to your project root. The changelog files should be markdown files with YAML frontmatter containing `title`, `version`, and `published_at` fields.

#### Example Changelog Directory Structure

```
server/changelogs/
├── v1.2.0.md
├── v1.1.0.md
└── v1.0.0.md
```

Each changelog file should follow this format:

```markdown
---
title: "Version 1.2.0"
version: "1.2.0"
published_at: "2024-01-20T10:00:00Z"
---

## New Features

- Added amazing new feature
- Improved user experience

## Bug Fixes

- Fixed critical bug
- Performance improvements
```

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

### DataBsFooter

The `DataBsFooter` component displays a footer with a link to a data science and AI page.

#### Example Usage

```vue
<template>
  <DataBsFooter>
    <!-- Optional slot for additional footer content -->
  </DataBsFooter>
</template>
```

### SplitContainer

The `SplitContainer` component provides a card-like container with a header and two side-by-side content areas separated by a border. It's responsive and stacks vertically on mobile devices.

#### Slots

- `header`: Content for the header section
- `left`: Content for the left pane
- `right`: Content for the right pane

#### Example Usage

```vue
<template>
  <SplitContainer>
    <template #header>
      <h2>My Split Container</h2>
    </template>
    <template #left>
      <div>Left content</div>
    </template>
    <template #right>
      <div>Right content</div>
    </template>
  </SplitContainer>
</template>
```

### UndoRedoButtons

The `UndoRedoButtons` component provides undo and redo functionality with keyboard shortcuts and tooltips. The buttons are automatically disabled when undo/redo actions are not available.

#### Props

- `canUndo` (boolean, required): Whether undo action is available
- `canRedo` (boolean, required): Whether redo action is available

#### Events

- `@undo`: Emitted when the undo button is clicked
- `@redo`: Emitted when the redo button is clicked

#### Example Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const canUndo = ref(false);
const canRedo = ref(false);

function handleUndo() {
  // Implement undo logic
  console.log("Undo action");
}

function handleRedo() {
  // Implement redo logic
  console.log("Redo action");
}
</script>

<template>
  <UndoRedoButtons 
    :canUndo="canUndo" 
    :canRedo="canRedo"
    @undo="handleUndo"
    @redo="handleRedo"
  />
</template>
```

### Changelogs

The `Changelogs` component displays a modal with application changelog information. It automatically fetches changelog data from the server and shows unread entries to users. The component tracks the last read version in localStorage and only shows new changelogs.

#### Features

- Automatically fetches changelog data from `/changelogs`
- Shows only unread changelogs based on stored version
- Supports Markdown content rendering
- Responsive modal design with fullscreen option
- Automatic version tracking in localStorage
- Sorts changelogs by version (newest first)

#### Changelog File Format

Changelog files should be stored in the directory configured in your Nuxt config and follow this format:

```markdown
---
title: "Version 1.1.0"
version: "1.1.0"
published_at: "2024-01-15T10:00:00Z"
---

## New Features

- Added new changelog component
- Improved performance

## Bug Fixes

- Fixed memory leak issue
```

#### Example Usage

```vue
<template>
  <!-- Simple usage - automatically handles everything -->
  <Changelogs />
</template>
```

For testing purposes, you can clear the changelog cache:

```vue
<script setup>
function clearChangelogCache() {
  localStorage.removeItem("changelogs-last-read");
  location.reload();
}
</script>

<template>
  <button @click="clearChangelogCache">
    Clear Changelog Cache
  </button>
  <Changelogs />
</template>
```

### NavigationBar

The `NavigationBar` component provides a responsive navigation bar with language switching, disclaimer button, and customizable content areas. It integrates with Nuxt i18n for internationalization.

#### Slots

- `center`: Content for the center section of the navigation
- `right`: Additional content for the right section

#### Requirements

This component requires:
- Nuxt i18n module configured
- Translation key `navigation.app` for the app name

#### Example Usage

```vue
<template>
  <NavigationBar>
    <template #center>
      <div>Custom center content</div>
    </template>
    <template #right>
      <button>Additional Button</button>
    </template>
  </NavigationBar>
</template>
```

### OnlineStatus

The `OnlineStatus` component displays a real-time health status indicator that checks whether the application is online. It automatically polls the server every 30 seconds to verify connectivity and displays a visual indicator with tooltip information.

#### Props

- `showText` (boolean, optional): Whether to display text along with the status indicator. Default is `false`.
- `pollInterval` (number, optional): The interval in milliseconds for checking online status. Default is `30000` (30 seconds).

#### Features

- Configurable automatic health status checking (default: every 30 seconds)
- Visual indicator with color-coded status (green for online, red for offline)
- Tooltip with detailed status information
- Internationalization support via i18n
- Smooth color transitions

#### Requirements

This component requires:
- Nuxt i18n module configured
- Translation keys:
  - `common-ui.health_status.online_title`
  - `common-ui.health_status.online_description`
  - `common-ui.health_status.offline_title`
  - `common-ui.health_status.offline_description`

#### Example Usage

```vue
<template>
  <!-- Simple usage with just the indicator -->
  <OnlineStatus />
  
  <!-- With text label -->
  <OnlineStatus showText />
  
  <!-- Custom poll interval (check every 60 seconds) -->
  <OnlineStatus :pollInterval="60000" />
  
  <!-- Combined: text and custom interval -->
  <OnlineStatus :showText="true" :pollInterval="60000" />
</template>
```

The component can be easily integrated into navigation bars or status displays:

```vue
<template>
  <NavigationBar>
    <template #right>
      <OnlineStatus :showText="true" />
    </template>
  </NavigationBar>
</template>
```

## Design System

This library uses the official [Kanton Basel-Stadt design system](https://github.com/kanton-basel-stadt/designsystem) colors, providing a consistent visual identity across all Basel-Stadt applications.

### Available Color Palettes

- **Green**: Primary brand colors (green-50 to green-900)
- **Blue**: Secondary colors (blue-50 to blue-900)  
- **Purple**: Accent colors (purple-50 to purple-900)
- **Red**: Error and warning states (red-50 to red-900)
- **Gray**: Neutral colors (gray-20 to gray-900)
- **Teal**: Supporting colors (teal-50 to teal-900)
- **Yellow**: Highlight colors (yellow-50 to yellow-900)
- **Brown**: Earth tone colors (brown-50 to brown-900)

The color system is fully integrated with Tailwind CSS and can be used with standard Tailwind color classes like `bg-green-500`, `text-blue-600`, etc.
