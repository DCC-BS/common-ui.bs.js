<script lang="ts" setup>

function clearChangelogCache() {
    localStorage.removeItem('changelogs-last-read');
    location.reload();
}

</script>

<template>
    <UButton @click="clearChangelogCache">
        Clear Changelog Cache
    </UButton>

    <Changelogs />
</template>