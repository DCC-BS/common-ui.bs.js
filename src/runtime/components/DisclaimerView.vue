<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

interface InputProps {
    appName: string;
    contentHtml?: string;
    postfixHtml?: string;
    confirmationText?: string;
    showConfirmation: boolean;
}

const props = defineProps<InputProps>();

const { t } = useI18n({ warnHtmlMessage: false });

const disclaimerAccepted = defineModel<boolean>();
const contentHtml = computed(() =>
    props.contentHtml ? props.contentHtml : t("common-ui.disclaimer.content"),
);

const confirmationText = computed(() =>
    props.confirmationText
        ? props.confirmationText
        : t("common-ui.disclaimer.confirmation_text", { appName: props.appName }),
);
</script>

<template>
    <div class="disclaimer-content">
        <div v-html="contentHtml"></div>

        <div v-if="props.postfixHtml" class="postfix">
            <span v-html="props.postfixHtml"></span>
        </div>

        <div class="confirmation" v-if="props.showConfirmation">
            <div class="confirmation-checkbox">
                <input type="checkbox" id="confirmation-checkbox" required v-model="disclaimerAccepted" />
                <label for="confirmation-checkbox">
                    {{ confirmationText }}
                </label>
            </div>
        </div>
    </div>
</template>

<style>
.disclaimer-content {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    color: black;
    background-color: white;
}

.disclaimer-content p {
    margin-bottom: 1rem;
}

.disclaimer-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.disclaimer-content h3 {
    font-size: 1.25rem;
    margin-top: 1.5rem;
}

.disclaimer-content ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
    list-style-type: disc;
}

.disclaimer-content li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.disclaimer-content .postfix {
    padding-top: 1rem;
}

.disclaimer-content .confirmation {
    padding: 2rem;
}

.disclaimer-content .confirmation-checkbox {
    display: flex;
    align-items: center;
    justify-items: stretch;
    gap: 1rem;
}

.disclaimer-content .confirmation input {
    width: 25px;
    height: 25px;
}

.disclaimer-content a {
    color: #007acc;
    text-decoration: underline;
}
</style>
