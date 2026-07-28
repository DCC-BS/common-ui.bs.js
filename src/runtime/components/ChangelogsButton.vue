<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCookie } from "#app";

const { t } = useI18n();

const lastRead = useCookie<string>("changelogs-last-read", {
    default: () => "",
});

function showChangelogs() {
    // Reset to a low sentinel so every existing release counts as "new since
    // lastRead". The orchestrator's useChangelogsPending watches this cookie
    // and re-evaluates, surfacing the Changelogs flow without a reload.
    lastRead.value = "0.0.0";
}
</script>

<template>
    <UTooltip class="flex md:hidden" :text="t('common-ui.changelogs.title')">
        <UButton
            icon="i-lucide-history"
            variant="ghost"
            color="neutral"
            @click="showChangelogs"
        >
        </UButton>
    </UTooltip>

    <UButton
        class="hidden md:flex"
        icon="i-lucide-history"
        variant="ghost"
        color="neutral"
        @click="showChangelogs"
    >
        {{ t("common-ui.changelogs.title") }}
    </UButton>
</template>
