<script setup lang="ts">
import type { AppSwitcherApp } from "../../src/runtime/components/AppSwitcher.vue";

// Three kinds of image sources, all supported by AppSwitcher:
//  - icon:  Nuxt Icon name (vector, SSR-safe, no asset needed)   -> Mail, Calendar
//  - image: external URL                                          -> Maps
//  - image: public/ path the consumer owns                        -> Photos
//  - neither: fallback initial tile                               -> Drive
const apps: AppSwitcherApp[] = [
    { name: "Mail", to: "https://mail.google.com", icon: "i-lucide-mail" },
    { name: "Calendar", to: "https://calendar.google.com", icon: "i-lucide-calendar" },
    {
        name: "Maps",
        to: "https://maps.google.com",
        image: "https://www.google.com/images/branding/product/1x/maps_64dp.png",
    },
    {
        name: "Photos",
        to: "https://photos.google.com",
        image: "https://www.google.com/images/branding/product/1x/photos_64dp.png",
    },
    { name: "Drive", to: "https://drive.google.com" },
    { name: "Docs", to: "https://docs.google.com", icon: "i-lucide-file-text" },
];
</script>

<template>
    <NavigationBar>
        <template #rightPreItems>
            <AppSwitcher
                :apps="apps"
                footer-to="https://about.google/products/"
                footer-label="More" />
        </template>
    </NavigationBar>

    <div class="p-8">
        <h1 class="text-2xl font-bold mb-4">App Switcher</h1>
        <p class="text-muted mb-6 max-w-prose">
            A Google-style app switcher. Each tile resolves in this priority:
            <code>icon</code> (Nuxt Icon) → <code>image</code> (URL or public/ path) →
            initials fallback. Tiles use <code>to</code>, so internal paths do SPA nav
            and absolute URLs do a full switch.
        </p>

        <div class="flex flex-wrap gap-4">
            <AppSwitcher :apps="apps" />
            <AppSwitcher :apps="apps" trigger-icon="i-lucide-layout-grid" :columns="2" />
        </div>
    </div>
</template>
