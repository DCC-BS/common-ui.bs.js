<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { AppSwitcher, type AppSwitcherApp, SystemStatus } from ".";
import LanguageSelect from "./LanguageSelect.vue";
import OnboardingRestartButton from "./OnboardingRestartButton.vue";

interface InputProps {
    otherApps?: AppSwitcherApp[]
    showAppSwitcher?: boolean
    showSystemStatus?: boolean
    showLanguageSelect?: boolean
    showOnboardingRestart?: boolean
}

const { t } = useI18n();

const props = withDefaults(defineProps<InputProps>(), {
    showAppSwitcher: true,
    showSystemStatus: true,
    showLanguageSelect: true,
    showOnboardingRestart: true,
});
</script>

<template>
    <div class="flex justify-between gap-2 px-4 py-2 w-full z-50">
        <slot name="left">
            <div class="text-xl font-bold">
                {{ t("navigation.app") }}
            </div>
        </slot>

        <slot name="center" />

        <slot name="right">
            <div class="flex items-center gap-2">
                <slot name="rightPreItems" />
                <SystemStatus v-if="props.showSystemStatus" />
                <LanguageSelect v-if="props.showLanguageSelect" />
                <OnboardingRestartButton v-if="props.showOnboardingRestart" />
                <AppSwitcher v-if="props.showAppSwitcher && props.otherApps" :apps="props.otherApps" />
                <slot name="rightPostItems" />
            </div>
        </slot>
    </div>
</template>
