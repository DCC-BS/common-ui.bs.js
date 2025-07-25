<script lang="ts" setup>
interface InputProps {
    appName: string;
    postfixHTML: string;
    confirmationText: string;
}

const props = defineProps<InputProps>();

const disclaimerAccepted = defineModel<boolean>();
</script>

<template>
    <div class="disclaimer-content">
        <h2>Disclaimer und Wichtige Nutzungshinweise für die KI-Prototypen</h2>

        <p>Bevor Sie diese Anwendung nutzen, lesen Sie bitte die folgenden Hinweise sorgfältig durch.</p>

        <h3>1. Zweck und Status der Anwendung (Proof of Concept)</h3>
        <ul>
            <li>Diese Anwendung ist ein Proof of Concept (PoC). Sie befindet sich in der Entwicklung und ist noch nicht
                komplett ausgereift. Geben Sie uns jederzeit mittels der Feedback-funktion Rückmeldung und Anregungen.
            </li>
            <li>Es wird keine Garantie für die Verfügbarkeit, die technische Fehlerfreiheit oder die inhaltliche
                Korrektheit und Vollständigkeit der generierten Ergebnisse übernommen. Die Resultate können
                Ungenauigkeiten oder Fehler enthalten.</li>
        </ul>

        <h3>2. Datenschutz und Datenverarbeitung</h3>
        <ul>
            <li>Die Verarbeitung Ihrer Eingaben erfolgt ausschliesslich auf der IT-Infrastruktur des Kantons
                Basel-Stadt.</li>
            <li>Der vorliegende KI-Prototyp speichert Ihre Eingaben nicht permanent. Als Nutzer:in dieser Anwendung sind
                Sie dafür verantwortlich, die korrekte Aufbewahrung der generierten Resultate sowie die Einhaltung der
                damit verbundenen Pflichten zur Löschung, Archivierung und Gewährleistung des Öffentlichkeitsprinzips
                sicherzustellen.</li>
            <li>Transkripte und andere temporäre Daten werden im Cache Ihres lokalen Geräts zwischengespeichert. Diese
                Zwischenspeicherung allein erfüllt die genannten Anforderungen nicht.</li>
        </ul>

        <h3>3. Ihre Verantwortung als Nutzerin oder Nutzer</h3>
        <p>Die Nutzung dieses Prototyps entbindet Sie nicht von Ihrer fachlichen und rechtlichen Verantwortung.
            Insbesondere sind Sie für Folgendes verantwortlich:</p>
        <ul>
            <li><strong>Rechtliche Grundlage:</strong> Die datenschutzkonforme Nutzung der KI-Prototypen liegt in der
                Verantwortung der Leitung Ihres jeweiligen öffentlichen Organs. Sie müssen insbesondere die
                Sicherstellung einer genügenden Rechtsgrundlage für die Datenbearbeitung im Einzelfall gewährleisten.
            </li>
            <li><strong>Prüfung der Ergebnisse:</strong> Die von der KI generierten Resultate sind als Entwürfe zu
                verstehen. Sie müssen diese vor der weiteren Verwendung sorgfältig auf inhaltliche Richtigkeit,
                Vollständigkeit und Angemessenheit überprüfen.</li>
            <li><strong>Umgang mit Resultaten:</strong> Sie sind für die weitere Verarbeitung der erzeugten Ergebnisse
                verantwortlich. Dies umfasst die korrekte Speicherung in den dafür vorgesehenen Fachanwendungen sowie
                die Einhaltung der kantonalen Vorschriften zur Aufbewahrung, Archivierung, Löschung und zur Einhaltung
                des Öffentlichkeitsprinzips.</li>
        </ul>

        <div v-if="props.postfixHTML" class="postfix">
            <span v-html="props.postfixHTML"></span>
        </div>

        <div class="confirmation">
            <div class="confirmation-checkbox">
                <input type="checkbox" id="confirmation-checkbox" required v-model="disclaimerAccepted" />
                <label for="confirmation-checkbox">
                    {{ confirmationText }}
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.disclaimer-content {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

h3 {
    font-size: 1.25rem;
    margin-top: 1.5rem;
}

.postfix {
    padding-top: 1rem;
}

.confirmation {
    padding: 2rem;
}

.confirmation-checkbox {
    display: flex;
    align-items: center;
    justify-items: stretch;
    gap: 1rem;
}

.confirmation input {
    width: 25px;
    height: 25px;
}
</style>