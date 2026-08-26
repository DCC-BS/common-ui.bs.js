<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

/**
 * Cog-trigger dropdown for settings/options menus.
 *
 * Pass menu entries via the `items` prop (idiomatic Nuxt UI). For fully custom
 * dropdown content, use the `items` slot override instead.
 */
export interface SettingsButtonProps {
    /** Dropdown menu entries. */
    items?: DropdownMenuItem[];
    /** Nuxt Icon name for the trigger button. */
    triggerIcon?: string;
    /** Accessible label / tooltip for the trigger button. */
    triggerLabel?: string;
    /** Optional visible label next to the icon. */
    label?: string;
    /** Dropdown popover alignment. */
    align?: "start" | "center" | "end";
}

withDefaults(defineProps<SettingsButtonProps>(), {
    triggerIcon: "i-lucide-settings",
    triggerLabel: "Settings",
    align: "end",
});
</script>

<template>
    <UDropdownMenu :items="items" :content="{ align }" :ui="{ content: 'w-48' }">
        <UTooltip v-if="!label" :text="triggerLabel">
            <UButton :icon="triggerIcon" :aria-label="triggerLabel" color="neutral" variant="ghost" />
        </UTooltip>

        <UButton v-else :icon="triggerIcon" :aria-label="triggerLabel" :label="label" color="neutral" variant="ghost" />
    </UDropdownMenu>
</template>
