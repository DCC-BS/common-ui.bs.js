<script setup lang="ts">
import { motion } from "motion-v";
import { ref } from "vue";
import image from "../assets/databs_logo.png";

const animations = [
    { scale: 1.1 }, // heartbeat effect
    { rotate: [0, 30, -30, 0] }, // rotation effect
];

const currentHoverAnimation = ref(animations[0]);
function onHover() {
    const randomIndex = Math.ceil(Math.random() * animations.length);

    currentHoverAnimation.value = animations[randomIndex] ?? animations[0];
}
</script>

<template>
    <div class="flex flex-col items-center text-center" @pointerover="onHover">
        <motion.a href="https://www.bs.ch/ki" target="_blank" rel="noopener noreferrer"
            :initial="{ scale: 1, rotate: 0 }" :while-hover="currentHoverAnimation" :transition="{ duration: 0.5 }">
            <img alt="Datenwissenschaften und Künstliche Intelligenz" :src="image" class="w-[100px]" />
        </motion.a>
        <p class="mt-2">Datenwissenschaften und KI</p>
        <p>Developed with ❤️ by DCC - Data Competence Center</p>
    </div>
</template>
