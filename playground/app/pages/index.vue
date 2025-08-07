<script lang="ts" setup>
import {
    DataBsBanner,
    DataBsFooter,
    Disclaimer,
    DisclaimerButton,
} from "@dcc-bs/common-ui.bs.js";
</script>

<template>
  <Disclaimer app-name="Test App" />
  <div>
    <DataBsBanner />

    <DisclaimerButton />

    <DataBsFooter />
  </div>
</template>
