<script lang="ts" setup>
import type { ChangelogVersionProps } from "@nuxt/ui";
import MarkdownIt from "markdown-it";
import { computed } from "vue";
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

// Close on demand: emit `finished` so the orchestrator writes the completion
// cookie and unmounts this flow. The backdrop, the top-left X, and the
// bottom Close button all route through here.
function close() {
    emit("finished", { completed: true });
}

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
    <!-- biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close; Escape handles keyboard access -->
    <div
        class="changelogs-overlay"
        @click.self="close"
        @keydown.esc="close"
    >
        <div
            class="changelogs-panel"
            role="dialog"
            aria-modal="true"
            tabindex="-1"
            :aria-label="t('common-ui.changelogs.title')"
            @keydown.esc="close"
        >
            <div class="changelogs-close-x">
                <UButton
                    icon="i-lucide-x"
                    color="neutral"
                    variant="ghost"
                    size="xl"
                    :aria-label="t('common-ui.changelogs.close')"
                    @click="close"
                />
            </div>

            <h1 class="changelogs-title">
                {{ t("common-ui.changelogs.title") }}
            </h1>

            <div class="changelogs-body">
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

            <div class="changelogs-footer">
                <UButton color="primary" size="xl" @click="close">
                    {{ t("common-ui.changelogs.close") }}
                </UButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.changelogs-overlay {
    z-index: 99999999;
    padding: 1rem;
    position: fixed;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.5);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    display: flex;
    align-items: center;
    justify-content: center;
}

.changelogs-panel {
    position: relative;
    width: 80%;
    max-width: 1600px;
    max-height: 90vh;
    padding: 3rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: black;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.changelogs-close-x {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.changelogs-title {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
}

.changelogs-body {
    overflow-y: auto;
    padding: 0 1rem;
}

.changelogs-footer {
    display: flex;
    justify-content: center;
    padding-top: 1.5rem;
}
</style>
