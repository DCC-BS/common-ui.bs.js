<script lang="ts" setup>
import { motion } from "motion-v";
import DisclaimerView from "./DisclaimerView.vue";

interface InputProps {
    appName: string;
    confirmationText?: string;
    postfixHTML?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
    confirmationText: "",
    postfixHTML: "",
});
</script>

<template>
    <div class="w-full h-full bg-gray-700 p-2">
        <motion.div
            class="shadow-md m-auto bg-white max-w-[800px] rounded-md"
            :initial="{ opacity: 0, y: 200 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, ease: 'circInOut' }"
        >
            <DisclaimerView
                app-name="test-app"
                :confirmation-text="props.confirmationText"
                :postfixHTML="props.postfixHTML"
                :showConfirmation="false"
            />
        </motion.div>
    </div>
</template>
