/**
 * Shape of `runtimeConfig.public.commonUi`. Used by the orchestrator and
 * re-exported so consumers can type their overrides.
 *
 * Disable flags are typed `boolean | string` because env overrides land as
 * strings; use {@link isFlowDisabled} to coerce.
 */
export interface DisclaimerConfig {
    appName: string;
    /** Override the default disclaimer body HTML. Empty/undefined → built-in asset. */
    contentHtml?: string;
    postfixHtml?: string;
    confirmationText?: string;
    /** Disclaimer version; bumping this re-arms the gate for all users. */
    version: string;
}

export interface CommonUiRuntimeConfig {
    disableChangelog: boolean | string;
    disableDisclaimer: boolean | string;
    disableOnboarding: boolean | string;
    disclaimer: DisclaimerConfig;
}

/** Coerce a runtimeConfig disable flag (which may arrive as a string) to bool. */
export function isFlowDisabled(value: boolean | string | undefined): boolean {
    return value === true || value === "true";
}
