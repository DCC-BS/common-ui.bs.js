<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCookie } from "#app";
import type { Changelog } from "../types/changelog.model";
import { FIRST_RUN_COOKIE_MAX_AGE } from "../types/first-run";

const { t } = useI18n();

const lastRead = useCookie<string>("changelogs-last-read", {
    default: () => "",
    sameSite: import.meta.dev ? 'lax' : 'none',
    secure: !import.meta.dev,
    partitioned: !import.meta.dev,
    maxAge: FIRST_RUN_COOKIE_MAX_AGE,
});

// Newest release version, shown as a badge to the right of the button. The
// changelogs endpoint returns releases sorted descending by version, so the
// first entry is always the newest.
const newestVersion = ref<string>("");

onMounted(async () => {
    try {
        const releases = await $fetch<Changelog[]>("/api/changelogs");
        newestVersion.value = releases[0]?.version ?? "";
    } catch {
        // Ignore — the badge simply won't render.
    }
});

function showChangelogs() {
    // Reset to a low sentinel so every existing release counts as "new since
    // lastRead". The orchestrator's useChangelogsPending watches this cookie
    // and re-evaluates, surfacing the Changelogs flow without a reload.
    lastRead.value = "0.0.0";
}
</script>

<template>
    <div class="flex md:hidden items-center">
        <UTooltip :text="t('common-ui.changelogs.title')">
            <UButton
                icon="i-lucide-history"
                variant="ghost"
                color="neutral"
                @click="showChangelogs"
            />
        </UTooltip>
        <UBadge
            v-if="newestVersion"
            color="primary"
            variant="subtle"
            size="sm"
            class="ml-1"
        >
            {{ newestVersion }}
        </UBadge>
    </div>

    <div class="hidden md:flex items-center gap-2">
        <UButton
            icon="i-lucide-history"
            variant="ghost"
            color="neutral"
            @click="showChangelogs"
        >
            {{ t("common-ui.changelogs.title") }}
        </UButton>
        <UBadge
            v-if="newestVersion"
            color="primary"
            variant="subtle"
        >
            {{ newestVersion }}
        </UBadge>
    </div>
</template>
