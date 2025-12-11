<script lang="ts" setup>

const type = ref<"error" | "success" | "info" | "warning">("info");
const message = ref<string>("This is a user feedback message.");

const { showToast, showError } = useUserFeedback();

function showFeedback() {
    showToast(message.value, type.value, { duration: 3000 });
}



</script>

<template>

<USelectMenu
    v-model="type"
    :items="[
        'error',
        'success',
        'info' ,
        'warning'
    ]"
    label="Select Feedback Type"
    class="mb-4"
/>

<UButton @click="showFeedback">Show User Feedback</UButton>

<UButton class="mt-4" @click="showError(new Error('This is a sample error message.'))">
    Show Error Feedback
</UButton>
</template>
