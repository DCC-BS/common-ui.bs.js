<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const isDisclaimerVisible = ref(false);
function toggleDisclaimer() {
  isDisclaimerVisible.value = !isDisclaimerVisible.value;
  if (isDisclaimerVisible.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
function handleEscKey(event) {
  if (event.key === "Escape" && isDisclaimerVisible.value) {
    closeModal();
  }
}
function closeModal() {
  isDisclaimerVisible.value = false;
  document.body.style.overflow = "";
}
onMounted(() => {
  document.addEventListener("keydown", handleEscKey);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKey);
  document.body.style.overflow = "";
});
</script>

<template>
    <!-- Disclaimer trigger button with enhanced styling -->
    <button 
        @click="toggleDisclaimer" 
        class="disclaimer-trigger group"
        aria-label="View disclaimer information"
    >
        <!-- Enhanced shield icon with gradient -->
        <div class="icon-wrapper">
            <svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                    clip-rule="evenodd" />
            </svg>
        </div>
        <span class="disclaimer-text">Disclaimer</span>
    </button>

    <!-- Enhanced modal with better mobile support -->
    <teleport to="body">
        <transition name="modal" appear>
            <div v-if="isDisclaimerVisible" class="modal-overlay" @click="closeModal">
                <div class="modal-container" @click.stop>
                    <div class="modal-card">
                        <!-- Header with gradient background -->
                        <div class="modal-header">
                            <div class="header-content">
                                <div class="header-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <h2 class="modal-title">Disclaimer / Haftungsausschluss</h2>
                            </div>
                            <button class="close-btn" @click="closeModal" aria-label="Close disclaimer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Body with improved typography and spacing -->
                        <div class="modal-body">
                            <div class="content-section">
                                <div class="info-card">
                                    <div class="info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p class="info-text">
                                        Diese Webanwendung verwendet interne Large Language Models (LLMs) zur Verarbeitung Ihrer Anfragen.
                                        Alle Daten werden innerhalb des Kantons Basel-Stadt gespeichert und verarbeitet.
                                    </p>
                                </div>
                            </div>

                            <div class="content-section">
                                <div class="warning-card">
                                    <div class="warning-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div class="warning-content">
                                        <h3 class="warning-title">Wichtiger Hinweis</h3>
                                        <p class="warning-text">
                                            Diese Anwendung befindet sich im Proof-of-Concept (PoC) Stadium.
                                            Es wird keine Garantie für die Verfügbarkeit, Korrektheit oder Vollständigkeit der Ergebnisse übernommen.
                                            Die zugrundeliegende KI Plattform befindet sich im aktiven Aufbau, daher können die Antwortzeiten stark variieren.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="content-section">
                                <div class="contact-card">
                                    <div class="contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <p class="contact-text">
                                        Bei Fehlern oder Problemen wenden Sie sich bitte an 
                                        <a href="mailto:yanick.schraner@bs.ch" target="_blank" rel="noopener noreferrer" class="contact-link">
                                            Yanick Schraner
                                        </a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Footer with action button -->
                        <div class="modal-footer">
                            <button class="understand-btn" @click="closeModal">
                                <span>Verstanden</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.disclaimer-trigger{@apply inline-flex items-center px-3 py-2 rounded-lg transition-all duration-300 ease-in-out;@apply bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100;@apply border border-amber-200 hover:border-amber-300;@apply text-amber-700 hover:text-amber-800;@apply shadow-sm hover:shadow-md;@apply transform hover:scale-105 active:scale-95;@apply focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2}.icon-wrapper{@apply relative mr-2}.shield-icon{@apply w-5 h-5 transition-transform duration-300 group-hover:rotate-12;filter:drop-shadow(0 1px 2px rgba(0,0,0,.1))}.disclaimer-text{@apply font-medium text-sm}.modal-overlay{@apply fixed inset-0 z-50 flex items-end justify-center p-2 bg-black/50;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}@media (min-width:640px){.modal-overlay{@apply items-center p-4}}.modal-container{@apply w-full max-w-md}.modal-card{@apply bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden;@apply transform transition-all duration-300;display:flex;flex-direction:column;max-height:95vh}.modal-header{@apply bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 relative;@apply flex items-center justify-between}.header-content{@apply flex items-center flex-1}.header-icon{@apply w-6 h-6 mr-2 p-1 bg-white/20 rounded-full}.header-icon svg{@apply w-full h-full}.modal-title{@apply text-lg font-bold leading-tight}.close-btn{@apply p-2 rounded-full hover:bg-white/20 transition-colors duration-200;@apply focus:outline-none focus:ring-2 focus:ring-white/50}.close-btn svg{@apply w-6 h-6}.modal-body{@apply flex-1 overflow-y-auto p-4 space-y-4}.content-section{@apply space-y-3}.info-card{@apply flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg}.info-icon{@apply w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0}.info-text{@apply text-gray-700 leading-snug text-sm}.warning-card{@apply flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg}.warning-icon{@apply w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0}.warning-content{@apply flex-1}.warning-title{@apply font-semibold text-amber-800 mb-1 text-sm}.warning-text{@apply text-gray-700 leading-snug text-sm}.contact-card{@apply flex items-start p-3 bg-green-50 border border-green-200 rounded-lg}.contact-icon{@apply w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0}.contact-text{@apply text-gray-700 leading-snug text-sm}.contact-link{@apply text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-500;@apply transition-colors duration-200}.modal-footer{@apply px-4 py-3 bg-gray-50 border-t border-gray-200}.understand-btn{@apply w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500;@apply text-white font-medium rounded-lg shadow-lg hover:shadow-xl text-sm;@apply transform transition-all duration-200 hover:scale-105 active:scale-95;@apply focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2}.understand-btn span{@apply mr-2}.understand-btn svg{@apply w-5 h-5}.modal-enter-active,.modal-leave-active{transition:opacity .3s ease}.modal-enter-active .modal-card,.modal-leave-active .modal-card{transition:transform .3s ease}.modal-enter-from,.modal-leave-to{opacity:0}.modal-enter-from .modal-card,.modal-leave-to .modal-card{transform:translateY(100%) scale(.9)}@media (min-width:640px){.modal-enter-from .modal-card,.modal-leave-to .modal-card{transform:translateY(-20px) scale(.95)}}@media (max-width:639px){.modal-card{@apply rounded-t-3xl}.modal-header{@apply px-3 py-3}.modal-title{@apply text-base}.modal-body{@apply px-3 py-3 space-y-3}.modal-footer{@apply px-3 py-3}.contact-card,.info-card,.warning-card{@apply p-2.5}.contact-text,.info-text,.warning-text{@apply text-xs leading-tight}.warning-title{@apply text-xs}}p{@apply mb-0}@media (prefers-reduced-motion:reduce){.disclaimer-trigger,.modal-card,.understand-btn{transition:none}.shield-icon{transform:none!important}}@media (prefers-color-scheme:dark){.modal-card{@apply bg-gray-800 text-white}.modal-footer{@apply bg-gray-700 border-gray-600}.info-card{@apply bg-blue-900 border-blue-700 text-blue-100}.warning-card{@apply bg-amber-900 border-amber-700 text-amber-100}.contact-card{@apply bg-green-900 border-green-700 text-green-100}}
</style>
