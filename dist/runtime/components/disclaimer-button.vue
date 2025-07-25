<script setup>
import { useCookie } from "#app";
const disclaimerAccepted = useCookie("disclaimerAccepted", { default: () => false });
function openDisclaimer() {
  disclaimerAccepted.value = false;
}
</script>

<template>
    <!-- Disclaimer trigger button with enhanced styling -->
    <button @click="openDisclaimer" class="disclaimer-trigger group" aria-label="View disclaimer information">
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
</template>

<style scoped>
.disclaimer-trigger{align-items:center;background:linear-gradient(90deg,#fefdf8,#fffbeb);border:1px solid #fde68a;border-radius:.5rem;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);color:#b45309;cursor:pointer;display:inline-flex;padding:.75rem;transform:scale(1);transition:all .3s ease-in-out}.disclaimer-trigger:hover{background:linear-gradient(90deg,#fef3c7,#fef3c7);border-color:#fcd34d;box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);color:#92400e;transform:scale(1.05)}.disclaimer-trigger:active{transform:scale(.95)}.disclaimer-trigger:focus{box-shadow:0 0 0 2px #fcd34d,0 0 0 4px rgba(252,211,77,.5);outline:none}.icon-wrapper{margin-right:.5rem;position:relative}.shield-icon{filter:drop-shadow(0 1px 2px rgba(0,0,0,.1));height:1.25rem;transition:transform .3s ease;width:1.25rem}.disclaimer-trigger:hover .shield-icon{transform:rotate(12deg)}.disclaimer-text{font-size:.875rem;font-weight:500}
</style>
