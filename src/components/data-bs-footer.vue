<script setup lang="ts">
import { ref } from "vue";
import image from "../assets/databs_log.png";

const animations = ["animate-heath-beat", "animate-rotate"];
const animation = ref("animate-heath-beat");

function onHover() {
    const randomIndex = Math.floor(Math.random() * animations.length);
    animation.value = animations[randomIndex] ?? "animate-heath-beat";
}
</script>

<template>
    <!-- Application Footer -->
    <div class="px-6 py-3">
        <div class="flex items-center justify-between gap-4 text-xs text-gray-500">
            <!-- Brand Section -->
            <div class="flex items-center gap-2">
                <a href="https://www.bs.ch/ki" target="_blank" :class="animation" @mouseenter="onHover"
                    rel="noopener noreferrer">
                    <img alt="Datenwissenschaften und Künstliche Intelligenz" :src="image" width="48">
                </a>

                <div class="hidden sm:block">
                    <div>Datenwissenschaften und KI</div>
                    <div>
                        Developed with ♥ by DCC - Data Competence Center
                    </div>
                </div>

            </div>
            <slot />
        </div>
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