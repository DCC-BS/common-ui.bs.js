<script setup lang="ts">
import UButton from "@nuxt/ui/components/Button.vue";
import UTooltip from "@nuxt/ui/components/Tooltip.vue";

const props = defineProps<{
    canUndo: boolean;
    canRedo: boolean;
}>();

</script>

<template>
    <div class="flex">
        <UTooltip text="Undo the last action" :kbds="['ctrl', 'x']">
            <UButton variant="link" color="neutral" icon="i-lucide-undo" @click="$emit('undo')" :disabled="!props.canUndo"/>
        </UTooltip>

        <UTooltip text="Redo the last undone action" :kbds="['ctrl', 'Y']">
            <UButton variant="link" color="neutral" icon="i-lucide-redo" @click="$emit('redo')" :disabled="!props.canRedo"/>
        </UTooltip>
    </div>
</template>