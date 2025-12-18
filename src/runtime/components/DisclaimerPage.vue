<script lang="ts" setup>
import { motion } from "motion-v";
import DisclaimerView from "./DisclaimerView.vue";

interface InputProps {
    contentHtml?: string;
    postfixHtml?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
    postfixHtml: "",
});
</script>

<template>
    <div class="w-full h-full bg-gray-700 p-2 text-black">
        <motion.div class="shadow-md m-auto bg-white dark:bg-gray-700 max-w-[800px] rounded-md"
            :initial="{ opacity: 0, y: 200 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, ease: 'circInOut' }">
            <DisclaimerView app-name="" :contentHtml="props.contentHtml" :postfixHtml="props.postfixHtml"
                :showConfirmation="false" />
        </motion.div>
    </div>
</template>
