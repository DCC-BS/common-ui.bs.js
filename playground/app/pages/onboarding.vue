<script lang="ts" setup>
import Onboarding from '../../../src/runtime/components/Onboarding.vue';

const onboarding = ref<InstanceType<typeof Onboarding>>();

const builder = useOnboardingBuilder()
    .addPhases<"Phase1" | "Phase2">([
        {
            name: "Phase1",
            onEnter: async () => {
                console.log("enter phase 1");
            },
            onExit: async () => {
                console.log("exit phase 1");
            }
        },
        {
            name: "Phase2",
            onEnter: async () => {
                console.log("enter phase 2")
            },
            onExit: async () => {
                console.log("exit phase 2");
            }
        }
    ])
    .switchPhase("Phase1")
    .addSteps([
        {
            popover: {
                title: "Step 1",
                description: "This is step 1",
            }
        },
        {
            popover: {
                title: "Step 2",
                description: "This is step 2",
            }
        },
    ])
    .switchPhase("Phase2")
    .addSteps([
        {
            popover: {
                title: "Step 3",
                description: "This is step 3",
            }
        },
    ]);

onMounted(() => {
    onboarding.value?.start();
});
</script>

<template>
    <Onboarding ref="onboarding" :builder="builder" />

    <div>
        <h1>Onboading</h1>
    </div>
</template>
