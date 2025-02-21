<script setup lang="ts">
import { ref } from 'vue';
import image from '../assets/databs_log.png';

const animations = ['animate-heath-beat', 'animate-rotate'];
const animation = ref('animate-heath-beat');

function onHover(e: MouseEvent) {
    const randomIndex = Math.floor(Math.random() * animations.length);
    animation.value = animations[randomIndex];
}
</script>

<template>
    <div class="flex flex-col items-center">
        <a :class="animation" @mouseenter="onHover"
            href="https://www.bs.ch/schwerpunkte/daten-und-statistiken/databs/schwerpunkte/datenwissenschaften-und-ki"
            target="_blank" rel="noopener noreferrer">
            <img alt="Datenwissenschaften und Künstliche Intelligenz" :src="image" width="100">
        </a>
        <p class="mt-2">Datenwissenschaften und KI</p>
        <p>Developed with ❤️ by Data Alchemy Team</p>
    </div>
</template>


<style scoped>
.animate-heath-beat {
    transform: scale(1);
}

.animate-heath-beat:hover {
    animation: heartbeat 1.5s ease-out;
}

@keyframes heartbeat {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.animate-rotate {
    transform: rotate(0deg);
}

.animate-rotate:hover {
    animation: rotate 1.5s;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(30deg);
    }

    75% {
        transform: rotate(-30deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>