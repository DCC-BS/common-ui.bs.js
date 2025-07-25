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
.disclaimer-trigger{align-items:center;background:linear-gradient(90deg,#fefdf8,#fffbeb);border:1px solid #fde68a;border-radius:.5rem;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);color:#b45309;cursor:pointer;display:inline-flex;padding:.75rem;transform:scale(1);transition:all .3s ease-in-out}.disclaimer-trigger:hover{background:linear-gradient(90deg,#fef3c7,#fef3c7);border-color:#fcd34d;box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);color:#92400e;transform:scale(1.05)}.disclaimer-trigger:active{transform:scale(.95)}.disclaimer-trigger:focus{box-shadow:0 0 0 2px #fcd34d,0 0 0 4px rgba(252,211,77,.5);outline:none}.icon-wrapper{margin-right:.5rem;position:relative}.shield-icon{filter:drop-shadow(0 1px 2px rgba(0,0,0,.1));height:1.25rem;transition:transform .3s ease;width:1.25rem}.disclaimer-trigger:hover .shield-icon{transform:rotate(12deg)}.disclaimer-text{font-size:.875rem;font-weight:500}.modal-overlay{align-items:flex-end;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);background-color:rgba(0,0,0,.5);bottom:0;display:flex;justify-content:center;left:0;padding:.5rem;position:fixed;right:0;top:0;z-index:50}@media (min-width:640px){.modal-overlay{align-items:center;padding:1rem}}.modal-container{max-width:28rem;width:100%}.modal-card{background-color:#fff;border-radius:1rem 1rem 0 0;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:95vh;overflow:hidden;transform:translateY(0);transition:all .3s ease}@media (min-width:640px){.modal-card{border-radius:1rem}}.modal-header{background:linear-gradient(90deg,#f59e0b,#eab308);color:#fff;justify-content:space-between;padding:1rem;position:relative}.header-content,.modal-header{align-items:center;display:flex}.header-content{flex:1}.header-icon{background-color:hsla(0,0%,100%,.2);border-radius:9999px;height:1.5rem;margin-right:.5rem;padding:.25rem;width:1.5rem}.header-icon svg{height:100%;width:100%}.modal-title{font-size:1.125rem;font-weight:700;line-height:1.25}.close-btn{background:none;border:none;border-radius:9999px;color:#fff;cursor:pointer;padding:.5rem;transition:background-color .2s ease}.close-btn:hover{background-color:hsla(0,0%,100%,.2)}.close-btn:focus{box-shadow:0 0 0 2px hsla(0,0%,100%,.5);outline:none}.close-btn svg{height:1.5rem;width:1.5rem}.modal-body{flex:1;gap:1rem;overflow-y:auto;padding:1rem}.content-section,.modal-body{display:flex;flex-direction:column}.content-section{gap:.75rem}.info-card{align-items:flex-start;background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:.5rem;display:flex;padding:.75rem}.info-icon{color:#3b82f6;flex-shrink:0;height:1.25rem;margin-right:.5rem;margin-top:.125rem;width:1.25rem}.info-text{color:#374151;font-size:.875rem;line-height:1.375}.warning-card{align-items:flex-start;background-color:#fffbeb;border:1px solid #fde68a;border-radius:.5rem;display:flex;padding:.75rem}.warning-icon{color:#f59e0b;flex-shrink:0;height:1.25rem;margin-right:.5rem;margin-top:.125rem;width:1.25rem}.warning-content{flex:1}.warning-title{color:#92400e;font-size:.875rem;font-weight:600;margin-bottom:.25rem}.warning-text{color:#374151;font-size:.875rem;line-height:1.375}.contact-card{align-items:flex-start;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:.5rem;display:flex;padding:.75rem}.contact-icon{color:#10b981;flex-shrink:0;height:1.25rem;margin-right:.5rem;margin-top:.125rem;width:1.25rem}.contact-text{color:#374151;font-size:.875rem;line-height:1.375}.contact-link{color:#2563eb;font-weight:500;text-decoration:underline;text-decoration-color:#93c5fd;transition:color .2s ease}.contact-link:hover{color:#1e40af;text-decoration-color:#3b82f6}.modal-footer{background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:.75rem 1rem}.understand-btn{align-items:center;background:linear-gradient(90deg,#10b981,#059669);border:none;border-radius:.5rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);color:#fff;cursor:pointer;display:flex;font-size:.875rem;font-weight:500;justify-content:center;padding:.625rem 1rem;transform:scale(1);transition:all .2s ease;width:100%}.understand-btn:hover{box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04);transform:scale(1.05)}.understand-btn:active{transform:scale(.95)}.understand-btn:focus{box-shadow:0 0 0 2px #bbf7d0,0 0 0 4px rgba(187,247,208,.5);outline:none}.understand-btn span{margin-right:.5rem}.understand-btn svg{height:1.25rem;width:1.25rem}.modal-enter-active,.modal-leave-active{transition:opacity .3s ease}.modal-enter-active .modal-card,.modal-leave-active .modal-card{transition:transform .3s ease}.modal-enter-from,.modal-leave-to{opacity:0}.modal-enter-from .modal-card,.modal-leave-to .modal-card{transform:translateY(100%) scale(.9)}@media (min-width:640px){.modal-enter-from .modal-card,.modal-leave-to .modal-card{transform:translateY(-20px) scale(.95)}}@media (max-width:639px){.modal-card{border-radius:1.5rem 1.5rem 0 0}.modal-header{padding:.75rem}.modal-title{font-size:1rem}.modal-body{gap:.75rem}.modal-body,.modal-footer{padding:.75rem}.contact-card,.info-card,.warning-card{padding:.625rem}.contact-text,.info-text,.warning-text{font-size:.75rem;line-height:1.25}.warning-title{font-size:.75rem}}p{margin-bottom:0}@media (prefers-reduced-motion:reduce){.disclaimer-trigger,.modal-card,.understand-btn{transition:none}.shield-icon{transform:none!important}}@media (prefers-color-scheme:dark){.modal-card{background-color:#1f2937;color:#fff}.modal-footer{background-color:#374151;border-color:#4b5563}.info-card{background-color:#1e3a8a;border-color:#1d4ed8;color:#dbeafe}.warning-card{background-color:#92400e;border-color:#d97706;color:#fef3c7}.contact-card{background-color:#064e3b;border-color:#059669;color:#d1fae5}}
</style>
