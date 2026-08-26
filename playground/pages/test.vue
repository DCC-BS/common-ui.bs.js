<script lang="ts" setup>
// The onboarding builder is app-owned (each app defines its own tour). The
// orchestrator owns *when* to mount it. Constructed once here in app.vue so the
// tour is available on every page for first-time users.
const builder = useOnboardingBuilder()
    .addPhases<"Phase1" | "Phase2">([
        {
            name: "Phase1",
            onEnter: async () => {
                console.log("enter phase 1");
            },
            onExit: async () => {
                console.log("exit phase 1");
            },
        },
        {
            name: "Phase2",
            onEnter: async () => {
                console.log("enter phase 2");
            },
            onExit: async () => {
                console.log("exit phase 2");
            },
        },
    ])
    .switchPhase("Phase1")
    .addSteps([
        {
            popover: {
                title: "Step 1",
                description: "This is step 1",
            },
        },
        {
            popover: {
                title: "Step 2",
                description: "This is step 2",
            },
        },
    ])
    .switchPhase("Phase2")
    .addSteps([
        {
            popover: {
                title: "Step 3",
                description: "This is step 3",
            },
        },
    ]);
</script>

<template>
    <UApp>
        <FirstRunOrchestrator
            :onboarding-builder="builder"
            :disclaimer="{
                appName: 'Test App',
                confirmationText:
                    'I have read and understood the instructions and confirm that I will use Test App exclusively in compliance with the stated guidelines.',
            }"
        />
        <NuxtPage />
    </UApp>
</template>
