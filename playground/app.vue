<script setup lang="ts">
import DisclaimerButton from '../src/runtime/components/disclaimer-button.vue';
import Disclaimer from '../src/runtime/components/disclaimer.vue';

</script>

<template>
    <div class="bg-red">

        <Disclaimer />
        <div class="flex justify-center">
            <DisclaimerButton />
        </div>

        <div class="w-[200px]">
            <DataBsBanner />

        </div>
    </div>
</template>