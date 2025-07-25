<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCookie } from '#app';

import DisclaimerView from './disclaimer-view.vue';

interface InputProps {
    appName: string;
    postfixHTML?: string;
    confirmationText?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
    postfixHTML: '',
});

const isReady = ref(false);
const confirmationText = ref(props.confirmationText);
const disclaimerAccepted = useCookie<boolean>("disclaimerAccepted", { default: () => false });

onMounted(() => {
    if (!confirmationText.value) {
        confirmationText.value = `Ich habe die Hinweise gelesen und verstanden und bestätige, dass ich ${props.appName} ausschliesslich unter Einhaltung der Voraussetzungen verwende.`;
    }

    if (modalContainer.value) {
        modalContainer.value.addEventListener('scroll', handleScroll);
    }

    isReady.value = true;
});

onUnmounted(() => {
    if (modalContainer.value) {
        modalContainer.value.removeEventListener('scroll', handleScroll);
    }
});

const modalContainer = ref<HTMLElement>();
const showScrollButton = ref(true);

function scrollDown() {
    if (modalContainer.value) {
        modalContainer.value.scrollBy({
            top: 200,
            behavior: 'smooth'
        });
    }
}

function handleScroll() {
    if (modalContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = modalContainer.value;
        // Hide button when near bottom (within 50px)
        showScrollButton.value = scrollTop < scrollHeight - clientHeight - 50;
    }
}
</script>

<template>
    <div class="disclaimer-modal" v-if="isReady && !disclaimerAccepted">
        <div ref="modalContainer" class="modal-container">
            <DisclaimerView v-model="disclaimerAccepted" :appName="props.appName" :postfixHTML="props.postfixHTML"
                :confirmationText="confirmationText!" />
        </div>

        <!-- Scroll Down Button -->
        <button v-if="showScrollButton" @click="scrollDown" class="scroll-down-button" aria-label="Scroll down">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
        </button>
    </div>
</template>

<style scoped>
.disclaimer-modal {
    z-index: 99999;
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.modal-container {
    position: relative;
    height: 100%;
    margin: auto;
    max-width: 900px;
    padding: 2rem;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll-down-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;

    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background-color: #007acc;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(0, 122, 204, 0.3);
}

.scroll-down-button:hover {
    background-color: #005a9e;
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(0, 122, 204, 0.4);
}

.scroll-down-button:active {
    transform: scale(0.95);
}

.scroll-down-button svg {
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-3px);
    }

    60% {
        transform: translateY(-2px);
    }
}
</style>