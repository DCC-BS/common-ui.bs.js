<script lang="ts" setup>
import { useCookie } from "#app";
import { type Driver } from "driver.js";
import "driver.js/dist/driver.css";
import { ref, nextTick, watch, onMounted, onUnmounted } from "vue";
import type { OnboadingStepBuilder } from "../types/onboarding";

interface InputProps {
    onboadingBuilder: OnboadingStepBuilder<any>,
}

const props = defineProps<InputProps>();

const { locale } = useI18n();

// Tour persistence — SSR-readable so first-time users skip the tour after hydration.
const tourCompleted = useCookie("tour-completed", { default: () => false });
const driverObj = ref<Driver | undefined>();

function start(): void {
    driverObj.value = props.onboadingBuilder.buildDriver();
    driverObj.value?.drive();
}

watch(() => locale.value, () => {
    driverObj.value?.destroy();
    driverObj.value = props.onboadingBuilder.buildDriver();
});

// Waits for the disclaimer modal to be accepted before auto-starting. While
// driver.js is active it sets `pointer-events: none` on every descendant
// except the highlighted element, which would make the disclaimer modal
// unclickable — so the tour must not start until the disclaimer is gone.
let readyObserver: MutationObserver | undefined;

function beginTourWhenReady(): void {
    if (tourCompleted.value) return;
    const modal = document.querySelector(".disclaimer-modal");
    if (!modal) {
        start();
        return;
    }
    readyObserver = new MutationObserver(() => {
        if (!modal.isConnected) {
            readyObserver?.disconnect();
            readyObserver = undefined;
            start();
        }
    });
    readyObserver.observe(document.body, { childList: true, subtree: true });
}

onMounted(async () => {
    await nextTick();
    beginTourWhenReady();
});

onUnmounted(() => {
    readyObserver?.disconnect();
    readyObserver = undefined;
    if (driverObj.value) {
        driverObj.value.destroy();
        driverObj.value = undefined;
    }
});


defineExpose({
    start,
})
</script>

<template>
    <!-- Renderless: drives the driver.js onboarding overlay, no DOM of its own -->
    <span hidden aria-hidden="true" />
</template>

<style>
@reference "../assets/main.css";

/* driver.js popover theming for TextMate.
   Non-scoped because driver.js renders the popover outside this component. */
.driver-popover.tm-tour-popover {
    max-width: 450px;
}

.tm-tour-popover .driver-popover-next-btn {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.tm-tour-popover .driver-popover-prev-btn {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.tm-tour-popover .driver-popover-done-btn {
    background-color: var(--color-success);
    color: var(--color-white);
}
</style>
