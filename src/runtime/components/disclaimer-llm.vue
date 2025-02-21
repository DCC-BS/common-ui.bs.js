<script setup lang="ts">
import { ref } from 'vue';

const isDisclaimerVisible = ref(false);

function toggleDisclaimer() {
    isDisclaimerVisible.value = !isDisclaimerVisible.value;
}

</script>

<template>
    <div class="w-full flex flex-col space-y-4">
        <a @click="toggleDisclaimer"
            class="flex items-center space-x-2 cursor-pointer text-yellow-500 hover:text-yellow-300">
            <UIcon name="i-heroicons-shield-exclamation-16-solid" color="yellow"></UIcon> Disclaimer
        </a>

        <UAlert v-if="isDisclaimerVisible" icon="i-heroicons-shield-exclamation-16-solid"
            title="Disclaimer / Haftungsausschluss" class="w-full" color="yellow">
            <template #description>
                <p>
                    Diese Webanwendung verwendet interne Large Language Models (LLMs) zur Verarbeitung Ihrer
                    Anfragen.
                    Alle
                    Daten werden innerhalb des Kantons Basel-Stadt gespeichert und verarbeitet.
                </p>

                <p>
                    <b>Wichtiger Hinweis:</b> Diese Anwendung befindet sich im Proof-of-Concept (PoC) Stadium. Es
                    wird
                    keine
                    Garantie für die Verfügbarkeit, Korrektheit oder Vollständigkeit der Ergebnisse übernommen. Die
                    zugrundeliegende KI Plattform befindet sich im aktiven Aufbau, daher können die Antwortzeiten
                    stark
                    variieren.
                </p>

                <p>
                    Bei Fehlern oder Problemen wenden Sie sich bitte an <a href="mailto:yanick.schraner@bs.ch"
                        target="_blank" rel="noopener noreferrer">Yanick Schraner</a>.
                </p>
            </template>
        </UAlert>
    </div>
</template>

<style scoped>
p {
    margin-bottom: 1rem;
}

p:last-child {
    margin-bottom: 0;
}
</style>