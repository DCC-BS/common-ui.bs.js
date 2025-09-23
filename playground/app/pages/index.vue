<script lang="ts" setup>
import {
  DataBsBanner,
  DataBsFooter,
  Disclaimer,
  DisclaimerButton,
  NavigaionBar,
  SplitContainer,
  UndoRedoButtons,
} from "../../../src/index";

const variant = ref<"link" | "outline" | "soft" | "subtle" | "ghost" | "solid">(
  "solid",
);
</script>

<template>
  <Disclaimer app-name="Test App"></Disclaimer>

  <NavigaionBar />

  <div class="h-[calc(100vh-78px)] flex flex-col">
    <div class="p-4 w-full h-full">
      <SplitContainer class="h-full">
        <template #header>
          <h2 class="text-lg font-bold">This is a split container</h2>
        </template>

        <template #left>
          <div class="relative h-full w-full p-4">
            <h3 class="text-md font-semibold">Left Side</h3>
            <p>This is the left side content.</p>

            <div class="text-neutral-500 text-sm absolute bottom-0 left-2 right-2 flex justify-between items-center">
              <UndoRedoButtons  :can-redo="true" :can-undo="true"/>
              <span> 0 / 100000 Zeichen</span>
            </div>

          </div>
        </template>

        <template #right>
          <h3 class="text-md font-semibold">Right Side</h3>
          <p>This is the right side content.</p>
        </template>
      </SplitContainer>
    </div>
    <DataBsFooter>
      <UButton icon="i-lucide-message-square">Feedback</UButton>
    </DataBsFooter>
  </div>
</template>
