<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// State for controlling modal visibility
const isDisclaimerVisible = ref(false);

// Toggle function to show/hide the disclaimer modal
function toggleDisclaimer() {
    isDisclaimerVisible.value = !isDisclaimerVisible.value;
    // Prevent body scroll when modal is open
    if (isDisclaimerVisible.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close modal when escape key is pressed
function handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && isDisclaimerVisible.value) {
        closeModal();
    }
}

// Close modal function
function closeModal() {
    isDisclaimerVisible.value = false;
    document.body.style.overflow = '';
}

// Add event listener for escape key when component is mounted
onMounted(() => {
    document.addEventListener('keydown', handleEscKey);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKey);
    document.body.style.overflow = '';
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
/* Disclaimer trigger button */
.disclaimer-trigger {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    background: linear-gradient(to right, #fefdf8, #fffbeb);
    border: 1px solid #fde68a;
    color: #b45309;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transform: scale(1);
    cursor: pointer;
}

.disclaimer-trigger:hover {
    background: linear-gradient(to right, #fef3c7, #fef3c7);
    border-color: #fcd34d;
    color: #92400e;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: scale(1.05);
}

.disclaimer-trigger:active {
    transform: scale(0.95);
}

.disclaimer-trigger:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fcd34d, 0 0 0 4px rgba(252, 211, 77, 0.5);
}

.icon-wrapper {
    position: relative;
    margin-right: 0.5rem;
}

.shield-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.disclaimer-trigger:hover .shield-icon {
    transform: rotate(12deg);
}

.disclaimer-text {
    font-weight: 500;
    font-size: 0.875rem;
}

/* Modal overlay and container */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}

@media (min-width: 640px) {
    .modal-overlay {
        align-items: center;
        padding: 1rem;
    }
}

.modal-container {
    width: 100%;
    max-width: 28rem;
}

.modal-card {
    background-color: white;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transform: translateY(0);
    transition: all 0.3s ease;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
}

@media (min-width: 640px) {
    .modal-card {
        border-radius: 1rem;
    }
}

/* Modal header */
.modal-header {
    background: linear-gradient(to right, #f59e0b, #eab308);
    color: white;
    padding: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-content {
    display: flex;
    align-items: center;
    flex: 1;
}

.header-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    padding: 0.25rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
}

.header-icon svg {
    width: 100%;
    height: 100%;
}

.modal-title {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.25;
}

.close-btn {
    padding: 0.5rem;
    border-radius: 9999px;
    transition: background-color 0.2s ease;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.close-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.close-btn svg {
    width: 1.5rem;
    height: 1.5rem;
}

/* Modal body */
.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.content-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* Info card */
.info-card {
    display: flex;
    align-items: flex-start;
    padding: 0.75rem;
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 0.5rem;
}

.info-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #3b82f6;
    margin-right: 0.5rem;
    margin-top: 0.125rem;
    flex-shrink: 0;
}

.info-text {
    color: #374151;
    line-height: 1.375;
    font-size: 0.875rem;
}

/* Warning card */
.warning-card {
    display: flex;
    align-items: flex-start;
    padding: 0.75rem;
    background-color: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 0.5rem;
}

.warning-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #f59e0b;
    margin-right: 0.5rem;
    margin-top: 0.125rem;
    flex-shrink: 0;
}

.warning-content {
    flex: 1;
}

.warning-title {
    font-weight: 600;
    color: #92400e;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
}

.warning-text {
    color: #374151;
    line-height: 1.375;
    font-size: 0.875rem;
}

/* Contact card */
.contact-card {
    display: flex;
    align-items: flex-start;
    padding: 0.75rem;
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 0.5rem;
}

.contact-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #10b981;
    margin-right: 0.5rem;
    margin-top: 0.125rem;
    flex-shrink: 0;
}

.contact-text {
    color: #374151;
    line-height: 1.375;
    font-size: 0.875rem;
}

.contact-link {
    color: #2563eb;
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: #93c5fd;
    transition: color 0.2s ease;
}

.contact-link:hover {
    color: #1e40af;
    text-decoration-color: #3b82f6;
}

/* Modal footer */
.modal-footer {
    padding: 0.75rem 1rem;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
}

.understand-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1rem;
    background: linear-gradient(to right, #10b981, #059669);
    color: white;
    font-weight: 500;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    transform: scale(1);
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
}

.understand-btn:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(1.05);
}

.understand-btn:active {
    transform: scale(0.95);
}

.understand-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px #bbf7d0, 0 0 0 4px rgba(187, 247, 208, 0.5);
}

.understand-btn span {
    margin-right: 0.5rem;
}

.understand-btn svg {
    width: 1.25rem;
    height: 1.25rem;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
    transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-card {
    transform: translateY(100%) scale(0.9);
}

.modal-leave-to .modal-card {
    transform: translateY(100%) scale(0.9);
}

@media (min-width: 640px) {
    .modal-enter-from .modal-card,
    .modal-leave-to .modal-card {
        transform: translateY(-20px) scale(0.95);
    }
}

/* Mobile specific improvements */
@media (max-width: 639px) {
    .modal-card {
        border-radius: 1.5rem 1.5rem 0 0;
    }
    
    .modal-header {
        padding: 0.75rem;
    }
    
    .modal-title {
        font-size: 1rem;
    }
    
    .modal-body {
        padding: 0.75rem;
        gap: 0.75rem;
    }
    
    .modal-footer {
        padding: 0.75rem;
    }
    
    .info-card,
    .warning-card,
    .contact-card {
        padding: 0.625rem;
    }
    
    .info-text,
    .warning-text,
    .contact-text {
        font-size: 0.75rem;
        line-height: 1.25;
    }
    
    .warning-title {
        font-size: 0.75rem;
    }
}

/* Typography improvements */
p {
    margin-bottom: 0;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    .disclaimer-trigger,
    .modal-card,
    .understand-btn {
        transition: none;
    }
    
    .shield-icon {
        transform: none !important;
    }
}

/* Dark mode support (if needed) */
@media (prefers-color-scheme: dark) {
    .modal-card {
        background-color: #1f2937;
        color: white;
    }
    
    .modal-footer {
        background-color: #374151;
        border-color: #4b5563;
    }
    
    .info-card {
        background-color: #1e3a8a;
        border-color: #1d4ed8;
        color: #dbeafe;
    }
    
    .warning-card {
        background-color: #92400e;
        border-color: #d97706;
        color: #fef3c7;
    }
    
    .contact-card {
        background-color: #064e3b;
        border-color: #059669;
        color: #d1fae5;
    }
}
</style>