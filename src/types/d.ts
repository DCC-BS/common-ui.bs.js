/// <reference types="vite/client" />
/// <reference types="@nuxt/ui" />

declare global {
    // Extend Vue's global components interface to include Nuxt UI components
    interface GlobalComponents {
        // UButton: typeof import("@nuxt/ui/components/Button.vue")["default"];
        // Add other Nuxt UI components here as needed
        // UInput: typeof import('@nuxt/ui/dist/runtime/components/Input.vue')['default']
        // UCard: typeof import('@nuxt/ui/dist/runtime/components/Card.vue')['default']
    }
}

export {};
