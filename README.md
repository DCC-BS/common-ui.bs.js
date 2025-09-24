# common-ui.bs.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/common-ui.bs.js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/DCC-BS/common-ui.bs.js/publish.yml)

Common Nuxt components and UI utilities using the official [Kanton Basel-Stadt design system](https://github.com/kanton-basel-stadt/designsystem) colors and styling.

## Quick Setup
Install the module to your Nuxt application with:
```sh
bun add git+https://github.com/DCC-BS/common-ui.bs.js.git#v1.1.0
```
replace `v1.1.0` with the latest version tag: ![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/common-ui.bs.js)

Add to your main css file:
```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@dcc-bs/common-ui.bs.js";
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
<script setup lang="ts">
import { SplitView } from "@dcc-bs/common-ui.bs.js";
</script>

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
<script setup lang="ts">
import { Disclaimer } from "@dcc-bs/common-ui.bs.js";
</script>

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
<script setup lang="ts">
import { DisclaimerButton } from "@dcc-bs/common-ui.bs.js";
</script>

<template>
  <DisclaimerButton />
</template>
```

### DataBsBanner

The `DataBsBanner` component displays a banner with a link to a data science and AI page.

#### Example Usage

```vue
<script setup lang="ts">
import { DataBsBanner } from "@dcc-bs/common-ui.bs.js";
</script>

<template>
  <DataBsBanner />
</template>
```

### DataBsFooter

The `DataBsFooter` component displays a footer with a link to a data science and AI page.

#### Example Usage

```vue
<script setup lang="ts">
import { DataBsFooter } from "@dcc-bs/common-ui.bs.js";
</script>

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
<script setup lang="ts">
import { SplitContainer } from "@dcc-bs/common-ui.bs.js";
</script>

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
import { UndoRedoButtons } from "@dcc-bs/common-ui.bs.js";
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
<script setup lang="ts">
import { NavigationBar } from "@dcc-bs/common-ui.bs.js";
</script>

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