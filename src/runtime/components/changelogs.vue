<script lang="ts" setup>
import { useFetch } from '#app';
import type { ChangelogVersionProps } from '@nuxt/ui';
import { computed } from 'vue';
import type { Changelog } from '../models/changelog.model';

const { data, error, pending } = await useFetch<Changelog[]>('/api/changelogs');

const versions = computed<ChangelogVersionProps[]>(() => data.value?.map((release) => ({
    version: release.tag_name,
    date: release.published_at,
    changes: release,
} as ChangelogVersionProps)) ?? []);
</script>

<template>

<div v-if="error">
    <p class="text-red-500">Error loading changelogs: {{ error.message }}</p>
</div>

<div v-else-if="pending">
    <p>Loading changelogs...</p>
</div>

<UChangelogVersions>
    <UChangelogVersion
        v-for="(version, index) in versions"
        :key="index"
        v-bind="version"
    />
</UChangelogVersions>
</template>
