<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCookie } from "#app";

const { t } = useI18n();

const tourCompleted = useCookie<boolean>("tour-completed", {
    default: () => false,
});

function restartTour() {
    // Clearing the completion cookie makes the orchestrator's onboardingPending
    // computed flip back to true, which re-mounts the Onboarding flow.
    tourCompleted.value = false;
}
</script>

<template>
    <UTooltip class="flex md:hidden" :text="t('common-ui.tour.restart')">
        <UButton
            icon="i-lucide-graduation-cap"
            variant="ghost"
            color="neutral"
            @click="restartTour"
        >
        </UButton>
    </UTooltip>

    <UButton
        class="hidden md:flex"
        icon="i-lucide-graduation-cap"
        variant="ghost"
        color="neutral"
        @click="restartTour"
    >
        {{ t("common-ui.tour.restart") }}
    </UButton>
</template>
