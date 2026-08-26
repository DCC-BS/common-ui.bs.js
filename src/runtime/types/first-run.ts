/**
 * Canonical priority ordering for the built-in first-run flows.
 * Higher number wins. See CONTEXT.md → "Priority".
 */
export const FIRST_RUN_PRIORITY = {
    /** Disclaimer is a hard gate; always preempts the others. */
    disclaimer: 30,
    /** Changelogs outrank Onboarding so a returning user sees what's new first. */
    changelogs: 20,
    /** Onboarding is the lowest-stakes flow; runs last. */
    onboarding: 10,
} as const;

/**
 * Persistent lifetime (1 year, in seconds) for first-run completion cookies.
 * Completion state must survive browser restarts (it did under the old
 * localStorage), so every `useCookie` for these keys sets this `maxAge`.
 */
export const FIRST_RUN_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** IDs of the built-in first-run flows. Custom flows may use any string. */
export type FirstRunFlowId =
    | "disclaimer"
    | "changelogs"
    | "onboarding"
    | (string & {});

/**
 * Payload emitted by a first-run flow when it finishes — whether by completing
 * its intended action or by being dismissed. The orchestrator records
 * completion either way (close = done, see ADR-0001), but the flag is preserved
 * for future flows that may re-pend when the user skips without completing.
 */
export interface FirstRunFinishedPayload {
    completed: boolean;
}
