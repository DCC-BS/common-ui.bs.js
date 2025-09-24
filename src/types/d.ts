// @ts-nocheck
/// <reference types="vite/client" />
/// <reference types="@nuxt/ui" />

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        UTooltip: typeof import("@nuxt/ui/components/Tooltip.vue")["default"];
        UButton: typeof import("@nuxt/ui/components/Button.vue")["default"];
        UCard: typeof import("@nuxt/ui/components/Card.vue")["default"];
        UIcon: typeof import("@nuxt/ui/components/Icon.vue")["default"];
        UAvatar: typeof import("@nuxt/ui/components/Avatar.vue")["default"];
        UAvatarGroup: typeof import("@nuxt/ui/components/AvatarGroup.vue")["default"];
        UBadge: typeof import("@nuxt/ui/components/Badge.vue")["default"];
        UProgress: typeof import("@nuxt/ui/components/Progress.vue")["default"];
    }
}