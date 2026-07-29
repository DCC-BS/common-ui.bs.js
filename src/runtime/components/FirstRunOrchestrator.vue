<script lang="ts" setup>
import { type Component, computed } from "vue";
import { useCookie, useRuntimeConfig } from "#app";
import { useChangelogsPending } from "../composables/useChangelogsPending";
import {
    type CommonUiRuntimeConfig,
    type DisclaimerConfig,
    FIRST_RUN_COOKIE_MAX_AGE,
    FIRST_RUN_PRIORITY,
    type FirstRunFinishedPayload,
    type FirstRunFlowId,
    isFlowDisabled,
} from "../types";
import type { OnboadingStepBuilder } from "../types/onboarding";
import Changelogs from "./Changelogs.vue";
import Disclaimer from "./Disclaimer.vue";
import Onboarding from "./Onboarding.vue";

interface InputProps {
    /**
     * Onboarding builder. If omitted, the Onboarding flow never becomes pending.
     * The consumer owns constructing this (app-specific tour); the orchestrator
     * owns when to mount it.
     */
    // biome-ignore lint/suspicious/noExplicitAny: phase typing is enforced at the builder construction site
    onboardingBuilder?: OnboadingStepBuilder<any>;
    /** Optional overrides for the runtimeConfig disclaimer defaults. */
    disclaimer?: Partial<DisclaimerConfig>;
}

const props = defineProps<InputProps>();

const config = useRuntimeConfig().public.commonUi as CommonUiRuntimeConfig;

const disclaimerConfig = computed<DisclaimerConfig>(() => ({
    ...config.disclaimer,
    ...props.disclaimer,
}));

// Completion cookies — the orchestrator owns all writes (children only emit).
const disclaimerAccepted = useCookie<string>("disclaimer-accepted", {
    default: () => "",
    maxAge: FIRST_RUN_COOKIE_MAX_AGE,
});
const tourCompleted = useCookie<boolean>("tour-completed", {
    default: () => false,
    maxAge: FIRST_RUN_COOKIE_MAX_AGE,
});

// Changelogs pending is async (client fetch). `pending` is:
//   undefined = loading, true = new releases exist, false = nothing to show.
const { lastRead, releases, pending: changelogsPending } =
    useChangelogsPending();

const disclaimerPending = computed(
    () =>
        !isFlowDisabled(config.disableDisclaimer) &&
        disclaimerAccepted.value !== disclaimerConfig.value.version,
);
const onboardingPending = computed(
    () =>
        !isFlowDisabled(config.disableOnboarding) &&
        !!props.onboardingBuilder &&
        tourCompleted.value !== true,
);

interface FlowDescriptor {
    id: FirstRunFlowId;
    priority: number;
    pending: boolean | undefined;
    component: Component;
    // biome-ignore lint/suspicious/noExplicitAny: each flow has its own prop shape
    flowProps: Record<string, any>;
}

const flows = computed<FlowDescriptor[]>(() => [
    {
        id: "disclaimer",
        priority: FIRST_RUN_PRIORITY.disclaimer,
        pending: disclaimerPending.value,
        component: Disclaimer,
        flowProps: {
            appName: disclaimerConfig.value.appName,
            contentHtml: disclaimerConfig.value.contentHtml,
            postfixHtml: disclaimerConfig.value.postfixHtml,
            confirmationText: disclaimerConfig.value.confirmationText,
        },
    },
    {
        id: "changelogs",
        priority: FIRST_RUN_PRIORITY.changelogs,
        pending: isFlowDisabled(config.disableChangelog)
            ? false
            : changelogsPending.value,
        component: Changelogs,
        flowProps: { releases: releases.value },
    },
    {
        id: "onboarding",
        priority: FIRST_RUN_PRIORITY.onboarding,
        pending: onboardingPending.value,
        component: Onboarding,
        flowProps: props.onboardingBuilder
            ? { builder: props.onboardingBuilder }
            : {},
    },
]);

/**
 * The single flow to render right now.
 *
 * Iterate pending flows in priority-desc order. The first `pending === true`
 * flow is active — *unless* a higher-priority flow is still loading
 * (`pending === undefined`), in which case we render nothing and wait, so a
 * resolving flow can't yank focus from one already shown.
 */
const activeFlow = computed<FlowDescriptor | null>(() => {
    const sorted = [...flows.value].sort((a, b) => b.priority - a.priority);
    for (const flow of sorted) {
        if (flow.pending === true) {
            return flow;
        }
        if (flow.pending === undefined) {
            return null;
        }
    }
    return null;
});

function onFinished(id: FirstRunFlowId, _payload: FirstRunFinishedPayload) {
    switch (id) {
        case "disclaimer":
            disclaimerAccepted.value = disclaimerConfig.value.version;
            break;
        case "changelogs":
            // Mark everything currently fetched as read (releases are newest-first).
            lastRead.value = releases.value[0]?.version ?? lastRead.value;
            break;
        case "onboarding":
            tourCompleted.value = true;
            break;
    }
    // The cookie write flips the flow's pending flag reactively, which makes
    // `activeFlow` recompute and swap/unmount the child.
}
</script>

<template>
    <component
        v-if="activeFlow"
        :is="activeFlow.component"
        v-bind="activeFlow.flowProps"
        @finished="onFinished(activeFlow?.id, $event)"
    />
</template>
