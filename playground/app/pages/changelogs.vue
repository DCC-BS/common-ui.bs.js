<script lang="ts" setup>
import ChangelogsButton from "../../../src/runtime/components/ChangelogsButton.vue";
</script>

<template>
    <div class="p-8 flex flex-col gap-4 items-start">
        <h1 class="text-2xl font-bold">Changelogs</h1>
        <p class="text-neutral-600">
            Changelogs surface automatically on return visits when new releases
            exist. Use the button below to re-trigger the flow on demand.
        </p>
        <ChangelogsButton />
    </div>
</template>
