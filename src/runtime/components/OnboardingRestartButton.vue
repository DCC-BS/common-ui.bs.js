<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCookie } from "#app";
import { FIRST_RUN_COOKIE_MAX_AGE } from "../types/first-run";

const { t } = useI18n();

const tourCompleted = useCookie<boolean>("tour-completed", {
    default: () => false,
    sameSite: import.meta.dev ? 'lax' : 'none',
    secure: !import.meta.dev,
    partitioned: !import.meta.dev,
    maxAge: FIRST_RUN_COOKIE_MAX_AGE,
});

function restartTour() {
    // Clearing the completion cookie makes the orchestrator's onboardingPending
    // computed flip back to true, which re-mounts the Onboarding flow.
    tourCompleted.value = false;
}
</script>

<template>
    <div data-tour="start-tour">
        <UTooltip class="flex md:hidden" :text="t('common-ui.tour.restart')">
            <UButton icon="i-lucide-graduation-cap" variant="ghost" color="neutral" @click="restartTour">
            </UButton>
        </UTooltip>

        <UButton class="hidden md:flex" icon="i-lucide-graduation-cap" variant="ghost" color="neutral"
            @click="restartTour">
            {{ t("common-ui.tour.restart") }}
        </UButton>
    </div>
</template>
