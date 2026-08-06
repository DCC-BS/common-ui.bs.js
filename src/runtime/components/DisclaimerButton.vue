<script setup lang="ts">
import { useCookie } from "#app";
import { FIRST_RUN_COOKIE_MAX_AGE } from "../types/first-run";

const disclaimerAccepted = useCookie<string>("disclaimer-accepted", {
    default: () => "",
    maxAge: FIRST_RUN_COOKIE_MAX_AGE,
});

function openDisclaimer() {
    // Reset the completion cookie so the orchestrator re-arms the Disclaimer flow.
    disclaimerAccepted.value = "";
}
</script>

<template>
    <UButton
        icon="i-lucide-circle-alert"
        variant="ghost"
        color="neutral"
        @click="openDisclaimer"
    >
        <span class="hidden md:inline">
            Disclaimer
        </span>
    </UButton>
</template>

<style scoped>
.disclaimer-trigger-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    background: linear-gradient(to right, #fefdf8, #fffbeb);
    border: 1px solid #fde68a;
    color: #b45309;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: scale(1);
    cursor: pointer;
}

.disclaimer-trigger-outline:hover {
    background: linear-gradient(to right, #fef3c7, #fef3c7);
    border-color: #fcd34d;
    color: #92400e;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: scale(1.05);
}

.disclaimer-trigger-outline:active {
    transform: scale(0.95);
}

.disclaimer-trigger-outline:focus {
    outline: none;
    box-shadow:
        0 0 0 2px #fcd34d,
        0 0 0 4px rgba(252, 211, 77, 0.5);
}

.disclaimer-trigger-ghost {
    color: #eab308;
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
}

.disclaimer-trigger-ghost:hover {
    color: #fde047;
}

.disclaimer-trigger-ghost:active {
    transform: scale(0.95);
}

.icon-wrapper {
    position: relative;
    margin-right: 0.5rem;
}

.shield-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.disclaimer-trigger-outline:hover .shield-icon {
    transform: rotate(12deg);
}

.disclaimer-text {
    font-weight: 500;
    font-size: 0.875rem;
}
</style>
