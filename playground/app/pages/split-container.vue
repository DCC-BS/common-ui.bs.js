<script lang="ts" setup>

</script>

<template>
    <div class="p-4">
        <SplitContainer>
            <template #header>
                <h2 class="text-lg font-bold">This is the header of the Split Container</h2>
            </template>

            <template #left>
                <div class="p-4">
                    <h3 class="text-md font-semibold">Left Side</h3>
                    <p>This is the left side content.</p>
                </div>
            </template>

            <template #right>
                <div class="p-4">
                    <h3 class="text-md font-semibold">Right Side</h3>
                    <p>This is the right side content.</p>
                </div>
            </template>
        </SplitContainer>
    </div>
</template>
