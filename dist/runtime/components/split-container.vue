<script setup>
import { twMerge } from "tailwind-merge";
const props = defineProps({
  ui: { type: Object, required: false }
});
const headerTw = twMerge(
  "border-b-1 border-default p-4",
  props.ui?.header ?? ""
);
const leftTw = twMerge("flex-1", props.ui?.left ?? "");
const rightTw = twMerge("flex-1", props.ui?.right ?? "");
const separatorTw = twMerge(
  "border-t-1 md:border-l-1 md:border-t-0 border-default",
  props.ui?.separator ?? ""
);
</script>

<template>
    <div class="h-full w-full shadow-[2px_2px_1px_1px_#0000000D] ring-1 ring-default rounded-md flex flex-col">
        <div :class="headerTw">
            <slot name="header" />
        </div>

        <div class="grow overflow-hidden flex flex-col md:flex-row justify-stretch items-stretch">
            <div :class="leftTw">
                <slot name="left" />
            </div>

            <div :class="separatorTw"></div>

            <div :class="rightTw">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>
