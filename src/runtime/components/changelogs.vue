<script lang="ts" setup>
import type { ChangelogVersionProps } from "@nuxt/ui";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { type Changelog, ChangelogSchema } from "../models/changelog.model";

const data = ref<Changelog[]>();
const error = ref<Error>();
const isOpen = ref<boolean>(false);

const { t } = useI18n();

onMounted(async () => {
    const lastRead = localStorage.getItem("changelogs-last-read") || "";

    try {
        const fetchData = await $fetch<Changelog[]>(
            `/api/changelogs?lastRead=${lastRead}`,
            {
                method: "GET",
            },
        );

        data.value = ChangelogSchema.array().parse(fetchData);
    } catch (e) {
        error.value = e as Error;
    } finally {
        isOpen.value = !!lastRead && (data.value?.length ?? 0) > 0;
    }

    if (data.value && data.value.length > 0 && data.value[0]) {
        localStorage.setItem(
            "changelogs-last-read",
            String(data.value[0].version),
        );
    }
});

const versions = computed<ChangelogVersionProps[]>(
    () =>
        data.value?.map(
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
<UModal v-model:open="isOpen" :title="t('common-ui.changelogs.title')" size="lg" :closeable="true" fullscreen>
    <template #body>
        <div class="p-2 overflow-y-auto">
            <div v-if="error">
                <p class="text-red-500">Error loading changelogs: {{ error.message }}</p>
            </div>

            <UChangelogVersions :versions="versions" :indicator="false">
                <template #date="{ version }">
                    <span v-if="version.date">{{ new Date(version.date).toLocaleDateString('de-CH') }}</span>
                </template>
                <template #description="{ version }">
                    <MDC v-if="version.description" :value="version.description" class="prose-changelog" />
                </template>
            </UChangelogVersions>
        </div>

        <div class="flex justify-center">
            <UButton color="primary" class="mt-4" @click="isOpen = false">
                {{ t('common-ui.changelogs.close') }}
            </UButton>
        </div>
    </template>
</UModal>
</template>
