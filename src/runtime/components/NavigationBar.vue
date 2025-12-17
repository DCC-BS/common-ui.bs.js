<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import DisclaimerButton from "./DisclaimerButton.vue";
import LanguageSelect from "./LanguageSelect.vue";

const { t } = useI18n();
</script>

<template>
    <div class="flex justify-between gap-2 p-2 w-full z-50">
        <slot name="left">
            <div class="text-xl font-bold mt-4 ml-4">
                {{ t("navigation.app") }}
            </div>
        </slot>

        <slot name="center" />

        <slot name="right">
            <div class="flex items-center gap-2">
                <slot name="rightPreItems" />
                <DisclaimerButton variant="ghost" />
                <LanguageSelect />

                <slot name="rightPostItems" />
            </div>
        </slot>
    </div>
</template>
