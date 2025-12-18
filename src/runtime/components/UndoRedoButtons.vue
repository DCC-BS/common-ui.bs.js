<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{
    canUndo: boolean;
    canRedo: boolean;
}>();

const { t } = useI18n();
</script>

<template>
    <div class="flex">
        <UTooltip :text="t('common-ui.undo_tooltip')" :kbds="['ctrl', 'Z']">
            <UButton variant="link" color="neutral" icon="i-lucide-undo" @click="$emit('undo')"
                :disabled="!props.canUndo" />
        </UTooltip>

        <UTooltip :text="t('common-ui.redo_tooltip')" :kbds="['ctrl', 'Y']">
            <UButton variant="link" color="neutral" icon="i-lucide-redo" @click="$emit('redo')"
                :disabled="!props.canRedo" />
        </UTooltip>
    </div>
</template>
