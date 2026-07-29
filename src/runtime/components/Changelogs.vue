<script lang="ts" setup>
import type { ChangelogVersionProps } from "@nuxt/ui";
import MarkdownIt from "markdown-it";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import type { Changelog } from "../types/changelog.model";
import type { FirstRunFinishedPayload } from "../types/first-run";

const md = new MarkdownIt();

interface InputProps {
    releases: Changelog[];
}

const props = defineProps<InputProps>();
const emit = defineEmits<{ finished: [FirstRunFinishedPayload] }>();

const { t } = useI18n();

// Open on mount — the orchestrator only mounts this component when Changelogs
// is the active flow, so it should be visible immediately.
const isOpen = ref<boolean>(true);

watch(isOpen, (open) => {
    if (!open) {
        emit("finished", { completed: true });
    }
});

const versions = computed<ChangelogVersionProps[]>(
    () =>
        props.releases.map(
            (release) =>
                ({
                    title: release.title,
                    version: release.version,
                    date: release.published_at,
                    description: release.body,
                }) as ChangelogVersionProps,
        ) ?? [],
);
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :title="t('common-ui.changelogs.title')"
        size="lg"
        :closeable="true"
    >
        <template #body>
            <div class="p-2 overflow-y-auto">
                <UChangelogVersions :versions="versions" :indicator="false">
                    <template #date="{ version }">
                        <span v-if="version.date">{{
                            new Date(version.date).toLocaleDateString("de-CH")
                        }}</span>
                    </template>
                    <template #description="{ version }">
                        <div
                            v-if="version.description"
                            class="prose-changelog"
                            v-html="md.render(version.description)"
                        />
                    </template>
                </UChangelogVersions>
            </div>

            <div class="flex justify-center">
                <UButton color="primary" class="mt-4" @click="isOpen = false">
                    {{ t("common-ui.changelogs.close") }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
