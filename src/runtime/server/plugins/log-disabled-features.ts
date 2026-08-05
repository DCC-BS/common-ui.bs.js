import { useRuntimeConfig } from "nitropack/runtime/config";
import { defineNitroPlugin } from "nitropack/runtime/plugin";
import { type CommonUiRuntimeConfig, isFlowDisabled } from "../../types";

type DisableFlag = {
    key: DisableFlagKey;
    label: string;
    env: string;
};

type DisableFlagKey =
    | "disableChangelog"
    | "disableDisclaimer"
    | "disableOnboarding"
    | "disableSystemStatus";

const FLAGS: ReadonlyArray<DisableFlag> = [
    {
        key: "disableDisclaimer",
        label: "Disclaimer flow",
        env: "NUXT_PUBLIC_COMMON_UI_DISABLE_DISCLAIMER",
    },
    {
        key: "disableChangelog",
        label: "Changelogs flow",
        env: "NUXT_PUBLIC_COMMON_UI_DISABLE_CHANGELOG",
    },
    {
        key: "disableOnboarding",
        label: "Onboarding flow",
        env: "NUXT_PUBLIC_COMMON_UI_DISABLE_ONBOARDING",
    },
    {
        key: "disableSystemStatus",
        label: "SystemStatus indicator",
        env: "NUXT_PUBLIC_COMMON_UI_DISABLE_SYSTEM_STATUS",
    },
];

/**
 * Logs one info line per disable flag that is set, at server boot, so consumers
 * can diagnose "feature X isn't showing up" from their server logs without
 * digging through runtimeConfig. Runs once per Nitro cold start.
 */
export default defineNitroPlugin(() => {
    const commonUi = (useRuntimeConfig().public.commonUi ??
        {}) as Partial<CommonUiRuntimeConfig>;

    for (const { key, label, env } of FLAGS) {
        if (isFlowDisabled(commonUi[key] as boolean | string | undefined)) {
            console.info(`[common-ui] ${label} is disabled (${env}=true)`);
        }
    }
});
