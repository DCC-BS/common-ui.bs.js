<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// State for controlling modal visibility
const isDisclaimerVisible = ref(false);

// Toggle function to show/hide the disclaimer modal
function toggleDisclaimer() {
    isDisclaimerVisible.value = !isDisclaimerVisible.value;
}

// Close modal when escape key is pressed
function handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && isDisclaimerVisible.value) {
        isDisclaimerVisible.value = false;
    }
}

// Add event listener for escape key when component is mounted
onMounted(() => {
    document.addEventListener('keydown', handleEscKey);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKey);
});
</script>

<template>
    <!-- Disclaimer trigger button -->
    <a @click="toggleDisclaimer" class="flex items-center cursor-pointer text-yellow-500 hover:text-yellow-300">
        <!-- Shield exclamation icon SVG instead of UIcon -->
        <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd"
                d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                clip-rule="evenodd" />
        </svg>
        Disclaimer
    </a>

    <!-- Custom modal implementation instead of UModal -->
    <transition name="modal-fade">
        <div v-if="isDisclaimerVisible" class="modal-backdrop" @click="isDisclaimerVisible = false">
            <div class="modal-content" @click.stop>
                <!-- Custom alert implementation instead of UAlert -->
                <div class="custom-alert">
                    <div class="alert-header">
                        <!-- Shield exclamation icon -->
                        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                clip-rule="evenodd" />
                        </svg>
                        <h3>Disclaimer / Haftungsausschluss</h3>
                        <!-- Close button -->
                        <button class="close-button" @click="isDisclaimerVisible = false">×</button>
                    </div>
                    <div class="alert-body">
                        <p>
                            Diese Webanwendung verwendet interne Large Language Models (LLMs) zur Verarbeitung Ihrer
                            Anfragen.
                            Alle
                            Daten werden innerhalb des Kantons Basel-Stadt gespeichert und verarbeitet.
                        </p>

                        <p>
                            <b>Wichtiger Hinweis:</b> Diese Anwendung befindet sich im Proof-of-Concept (PoC) Stadium.
                            Es
                            wird
                            keine
                            Garantie für die Verfügbarkeit, Korrektheit oder Vollständigkeit der Ergebnisse übernommen.
                            Die
                            zugrundeliegende KI Plattform befindet sich im aktiven Aufbau, daher können die
                            Antwortzeiten
                            stark
                            variieren.
                        </p>

                        <p>
                            Bei Fehlern oder Problemen wenden Sie sich bitte an <a href="mailto:yanick.schraner@bs.ch"
                                target="_blank" rel="noopener noreferrer" class="text-blue-500">Yanick Schraner</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
p{margin-bottom:1rem}p:last-child{margin-bottom:0}.modal-backdrop{align-items:center;background-color:rgba(0,0,0,.5);display:flex;height:100%;justify-content:center;left:0;position:fixed;top:0;width:100%;z-index:100}.modal-content{background-color:#fff;border-radius:8px;max-height:90vh;max-width:90%;overflow-y:auto;width:500px}.custom-alert{background-color:#fff8e1;border-left:4px solid #ffc107;color:#333;width:100%}.alert-header{align-items:center;background-color:#ffecb3;border-bottom:1px solid #ffe082;border-top-left-radius:8px;border-top-right-radius:8px;color:#ff8f00;display:flex;padding:1rem}.alert-header h3{flex-grow:1;font-size:1.1rem;font-weight:600;margin:0}.alert-body{padding:1rem}.close-button{background:transparent;border:none;color:#ff8f00;cursor:pointer;font-size:1.5rem}.modal-fade-enter-active,.modal-fade-leave-active{transition:opacity .3s}.modal-fade-enter-from,.modal-fade-leave-to{opacity:0}
</style>