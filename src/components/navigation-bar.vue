<script lang="ts" setup>
import DisclaimerButton from "./disclaimer-button.vue";
import type { DropdownMenuItem } from "@nuxt/ui";
import { useI18n } from '#imports';
import { computed } from "vue";

import UButton from "@nuxt/ui/components/Button.vue";
import UDropdownMenu from "@nuxt/ui/components/DropdownMenu.vue";


const { t, locale, locales, setLocale } = useI18n() as unknown as {
    t: (key: string) => string;
    locale: { value: string };
    locales: { value: { code: string; name: string }[] };
    setLocale: (code: string) => Promise<void>;
};

const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
});

const currentLocale = computed(() => {
    return locale.value?.toUpperCase() ?? "EN";
});

// Navigation menu items
const items = computed<DropdownMenuItem[]>(() =>
    availableLocales.value.map((locale) => ({
        label: locale.code.toUpperCase(),
        onSelect: async () => setLocale(locale.code),
    })),
);
</script>

<template>
    <div class="flex justify-between gap-2 p-2 w-full z-50">
        <div class="text-xl font-bold mt-4 ml-4">
            {{ t("navigation.app") }}
        </div>

        <slot name="center" />

        <div class="flex items-center gap-2">
            <DisclaimerButton variant="ghost" />

            <UDropdownMenu :items="items" variant="ghost">
                <UButton variant="ghost" :label="currentLocale" color="neutral">
                </UButton>
            </UDropdownMenu>

            <slot name="right" />
        </div>
    </div>
</template>