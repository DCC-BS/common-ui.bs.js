<script lang="ts" setup>
import OnboardingRestartButton from "../../../src/runtime/components/OnboardingRestartButton.vue";
</script>

<template>
    <div class="p-8 flex flex-col gap-4 items-start">
        <h1 class="text-2xl font-bold">Onboarding</h1>
        <p class="text-neutral-600">
            The tour now runs globally via the
            <code>&lt;FirstRunOrchestrator&gt;</code> in
            <code>app.vue</code> — on first visit, after the Disclaimer (and
            Changelogs, if any) are dismissed.
        </p>
        <OnboardingRestartButton />
    </div>
</template>
