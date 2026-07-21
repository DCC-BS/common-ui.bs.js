<script lang="ts" setup>
import type { Driver } from "driver.js";
import { useCookie } from "#app";
import "driver.js/dist/driver.css";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import type { OnboadingStepBuilder } from "../types/onboarding";

interface InputProps {
    // biome-ignore lint/suspicious/noExplicitAny: phase typing is enforced at the builder construction site, not the component boundary
    builder: OnboadingStepBuilder<any>,
}

const props = defineProps<InputProps>();

const { locale } = useI18n();

// Tour persistence — SSR-readable so first-time users skip the tour after hydration.
const tourCompleted = useCookie("tour-completed", { default: () => false });
const driverObj = ref<Driver | undefined>();

function createNewDriver() {
    return props.builder.buildDriver({
            // User-initiated exit (close/done) — mark completed, then proceed.
            // Programmatic destroy() skips this hook, so restart stays un-recorded.
            onDestroyStarted: (_el, _step, opts) => {
                tourCompleted.value = true;
                opts.driver.destroy();
        },
    });
}

function start(): void {
    driverObj.value?.destroy();
    driverObj.value = createNewDriver();
    driverObj.value?.drive();
}

function destroy(): void {
    driverObj.value?.destroy();
    driverObj.value = undefined;
}

watch(() => locale.value, () => {
    driverObj.value?.destroy();
    driverObj.value = createNewDriver();
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
    destroy
});
</script>

<template>
    <!-- Renderless: drives the driver.js onboarding overlay, no DOM of its own -->
    <span hidden aria-hidden="true" class="bg-pink-500/75" />
</template>

<style>
/* driver.js popover theming for TextMate.
   Non-scoped because driver.js renders the popover outside this component. */
.driver-popover.tm-tour-popover {
    max-width: 450px;
}

.driver-popover-navigation-btns button {
    background-color: var(--ui-primary);
    color: var(--color-white);
    border-radius: var(--radius-md);
    /* biome-ignore lint/complexity/noImportantStyles: needed to override driver.js inline styles */
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
}

.driver-popover-navigation-btns button:hover {
    background-color: color-mix(in oklab, var(--ui-primary) 75%, transparent);
    color: var(--color-white);
}

.tm-tour-popover .driver-popover-done-btn {
    background-color: var(--ui-success);
    color: var(--color-white);
    border-radius: var(--radius-md);
}

.tm-tour-popover .driver-popover-done-btn:hover {
    background-color: color-mix(in oklab, var(--ui-success) 75%, transparent);
}
</style>
