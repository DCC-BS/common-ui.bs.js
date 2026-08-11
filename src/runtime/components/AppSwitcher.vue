<script setup lang="ts">
import { computed } from "vue";
import { publicAssetsURL } from "#build/paths.mjs";

/**
 * One entry in the app switcher grid.
 *
 * Visual resolution per entry (first match wins):
 *   1. `icon`  — a Nuxt Icon name (e.g. "i-lucide-mail"). Vector, SSR-safe,
 *                works without any image asset. Preferred for logos.
 *   2. `image` — URL or public/ path to a raster image (e.g. "/apps/x.png"
 *                or "https://..."). Rendered via a plain <img>; the consumer
 *                owns the asset, the library stays decoupled from bundlers.
 *   3. fallback — the first letter of `name`, shown in a tinted tile.
 */
export interface AppSwitcherApp {
    name: string;
    /** Router path (internal SPA nav) or absolute URL (full app switch). */
    to: string;
    /** Nuxt Icon name, e.g. "i-lucide-mail". Takes precedence over `image`. */
    icon?: string;
    /**
     * URL or public/ path to a raster image. Used only when `icon` is unset.
     * Relative paths are resolved against the app baseURL, not the current route.
     */
    image?: string;
    /** Optional alt text for the image; defaults to `name`. */
    alt?: string;
}

interface AppSwitcherProps {
    apps: AppSwitcherApp[];
    /** Nuxt Icon name for the trigger button. */
    triggerIcon?: string;
    /** Accessible label for the trigger button. */
    triggerLabel?: string;
    /** Number of columns in the grid. */
    columns?: number;
    /** Optional link shown in the popover footer (Google's "More from…" row). */
    footerTo?: string;
    footerLabel?: string;
}

const props = withDefaults(defineProps<AppSwitcherProps>(), {
    triggerIcon: "i-lucide-grip",
    triggerLabel: "Apps",
    columns: 3,
    footerLabel: "More",
});

const gridStyle = computed(() => ({
    gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
}));

/**
 * A complete URL ("https://…", "data:…") is used as-is; anything else is a path
 * into public/ and is anchored at the app's asset root (`cdnURL || baseURL`).
 * Without this, "app-icons/x.svg" resolves against the current route and 404s
 * on every page but "/".
 */
function imageSrc(image: string): string {
    return URL.canParse(image) ? image : publicAssetsURL(image);
}

function initials(name: string): string {
    return (name?.trim()?.[0] ?? "?").toUpperCase();
}
</script>

<template>
    <UPopover>
        <UButton :icon="triggerIcon" :aria-label="triggerLabel" color="neutral" variant="ghost" />

        <template #content>
            <div class="p-4 w-[320px] max-w-[90vw]">
                <!-- Optional top section -->
                <div v-if="$slots.top" class="mb-3">
                    <slot name="top" />
                </div>

                <!-- Middle: apps grid -->
                <div class="grid gap-1" :style="gridStyle">
                    <UButton v-for="app in apps" :key="app.to" :to="app.to" :aria-label="app.name" color="neutral"
                        variant="ghost" class="flex-col h-auto py-3 px-2 gap-2 rounded-lg whitespace-normal">
                        <template #leading>
                            <span
                                class="flex items-center justify-center w-10 h-10 rounded-lg bg-elevated/60 overflow-hidden ring-1 ring-gray-400">
                                <img v-if="!app.icon && app.image" :src="imageSrc(app.image)" :alt="app.alt ?? app.name"
                                    class="w-full h-full object-contain" />
                                <UIcon v-else-if="app.icon" :name="app.icon" class="w-6 h-6" />
                                <span v-else class="text-sm font-semibold text-muted">
                                    {{ initials(app.name) }}
                                </span>
                            </span>
                        </template>

                        <span class="text-xs text-muted text-center leading-tight line-clamp-2">
                            {{ app.name }}
                        </span>
                    </UButton>
                </div>

                <!-- Optional bottom section -->
                <div v-if="$slots.bottom || footerTo" class="mt-3 pt-3 border-t border-default">
                    <slot name="bottom">
                        <div class="flex justify-end">
                            <UButton :to="footerTo" size="xs" variant="link" color="neutral" :label="footerLabel" />
                        </div>
                    </slot>
                </div>
            </div>
        </template>
    </UPopover>
</template>
