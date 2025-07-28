<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useCookie } from "#app";
import DisclaimerView from "./disclaimer-view.vue";
const DISCLAIMER_VERSION = "1.0.0";
const props = defineProps({
  appName: { type: String, required: true },
  postfixHTML: { type: String, required: false, default: "" },
  confirmationText: { type: String, required: false }
});
const isReady = ref(false);
const confirmationText = ref(props.confirmationText);
const disclaimerAcceptedVersion = useCookie("disclaimerAccepted", {
  default: () => ""
});
const disclaimerAccepted = computed(() => {
  return disclaimerAcceptedVersion.value === DISCLAIMER_VERSION;
});
const disclaimerAcceptedChecked = ref(false);
onMounted(() => {
  if (!confirmationText.value) {
    confirmationText.value = `Ich habe die Hinweise gelesen und verstanden und best\xE4tige, dass ich ${props.appName} ausschliesslich unter Einhaltung der Voraussetzungen verwende.`;
  }
  isReady.value = true;
});
onUnmounted(() => {
  if (modalContainer.value) {
    modalContainer.value.removeEventListener("scroll", handleScroll);
  }
});
const modalContainer = ref();
const showScrollButton = ref(true);
watch(
  modalContainer,
  () => {
    if (modalContainer.value) {
      modalContainer.value.addEventListener("scroll", handleScroll);
    }
  },
  { immediate: true }
);
watch(disclaimerAccepted, (newValue) => {
  if (newValue !== disclaimerAcceptedChecked.value) {
    disclaimerAcceptedChecked.value = newValue;
  }
});
watch(disclaimerAcceptedChecked, (newValue) => {
  if (newValue) {
    disclaimerAcceptedVersion.value = DISCLAIMER_VERSION;
  }
});
function scrollDown() {
  if (modalContainer.value) {
    modalContainer.value.scrollBy({
      top: 200,
      behavior: "smooth"
    });
  }
}
function handleScroll() {
  if (modalContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = modalContainer.value;
    showScrollButton.value = scrollTop < scrollHeight - clientHeight - 50;
  }
}
</script>

<template>
    <div class="disclaimer-modal" v-if="isReady && !disclaimerAccepted">
        <div ref="modalContainer" class="modal-container">
            <DisclaimerView v-model="disclaimerAcceptedChecked" :appName="props.appName" :postfixHTML="props.postfixHTML"
                :confirmationText="confirmationText" />
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
.disclaimer-modal{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background-color:hsla(0,0%,100%,.5);bottom:0;left:0;padding:1rem;position:fixed;right:0;top:0;z-index:99999}.modal-container{background-color:#fff;border:1px solid #eee;box-shadow:0 2px 8px rgba(0,0,0,.1);height:100%;margin:auto;max-width:900px;overflow-y:auto;padding:2rem;position:relative}.scroll-down-button{align-items:center;background-color:#007acc;border:none;border-radius:50%;bottom:1rem;box-shadow:0 2px 12px rgba(0,122,204,.3);color:#fff;cursor:pointer;display:flex;height:48px;justify-content:center;position:fixed;right:1rem;transition:all .3s ease;width:48px;z-index:10}.scroll-down-button:hover{background-color:#005a9e;box-shadow:0 4px 16px rgba(0,122,204,.4);transform:scale(1.1)}.scroll-down-button:active{transform:scale(.95)}.scroll-down-button svg{animation:bounce 2s infinite}@keyframes bounce{0%,20%,50%,80%,to{transform:translateY(0)}40%{transform:translateY(-3px)}60%{transform:translateY(-2px)}}
</style>
