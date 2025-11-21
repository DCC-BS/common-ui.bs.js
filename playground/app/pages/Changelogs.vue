<script lang="ts" setup>
function clearChangelogCache() {
    localStorage.setItem("changelogs-last-read", "0.0.0");
    location.reload();
}
</script>

<template>
    <UButton @click="clearChangelogCache">
        Clear Changelog Cache
    </UButton>

    <Changelogs />
</template>