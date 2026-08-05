<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();
const cookie = useCookie("i18n_redirected");

const availableLocales = computed(() => {
    return locales?.value?.filter((i) => i?.code !== locale.value) ?? [];
});

const currentLocale = computed(() => {
    return locale?.value?.toUpperCase() ?? "EN";
});

// Navigation menu items
const items = computed<DropdownMenuItem[]>(() =>
    availableLocales.value.map((locale) => ({
        label: locale.code.toUpperCase(),
        onSelect: async () => {
            await setLocale(locale.code as "de" | "en");
            cookie.value = locale.code;
        },
    })),
);
</script>

<template>
    <UDropdownMenu :items="items" variant="ghost">
        <UButton variant="ghost" :label="currentLocale" color="neutral" trailing-icon="i-lucide-chevron-down">
        </UButton>
    </UDropdownMenu>
</template>
