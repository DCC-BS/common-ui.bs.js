<script lang="ts" setup>
import type { Driver } from "driver.js";
import { useI18n } from "vue-i18n";
import "driver.js/dist/driver.css";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import type { FirstRunFinishedPayload } from "../types/first-run";
import type { OnboadingStepBuilder } from "../types/onboarding";

interface InputProps {
    // biome-ignore lint/suspicious/noExplicitAny: phase typing is enforced at the builder construction site, not the component boundary
    builder: OnboadingStepBuilder<any>,
}

const props = defineProps<InputProps>();
const emit = defineEmits<{ finished: [FirstRunFinishedPayload] }>();

const { locale } = useI18n();

const driverObj = ref<Driver | undefined>();

function createNewDriver() {
    return props.builder.buildDriver({
        // User-initiated exit (close/done) — signal completion to the orchestrator,
        // which records the completion cookie and unmounts this component.
        onDestroyStarted: (_el, _step, opts) => {
            opts.driver.destroy();
            emit("finished", { completed: true });
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

// Auto-start on mount. The orchestrator only mounts this component when
// Onboarding is the active flow, so being mounted === "run the tour now".
onMounted(async () => {
    await nextTick();
    start();
});

onUnmounted(() => {
    if (driverObj.value) {
        driverObj.value.destroy();
        driverObj.value = undefined;
    }
});

defineExpose({ start, destroy });
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
