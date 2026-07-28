import { defineNuxtPlugin, useCookie } from "#app";

/**
 * One-time client migration of the old localStorage-based first-run flags to
 * the new cookie-based ones (see ADR-0001). Runs once per user, guarded by a
 * sentinel cookie, then deletes the localStorage keys.
 *
 * SSR cannot see localStorage, so existing users get a one-time flash on their
 * first visit after upgrade (the SSR HTML may render a flow that the migrated
 * cookie then dismisses during hydration). New users never hit this path.
 */
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    const SENTINEL_KEY = "first-run-migrated";
    const migrated = useCookie<string>(SENTINEL_KEY, { default: () => "" });
    if (migrated.value === "1") return;

    // Disclaimer: old key was JSON-encoded (`"1.0.0"` with quotes).
    const oldDisclaimer = localStorage.getItem("disclaimerAccepted");
    if (oldDisclaimer !== null) {
        try {
            const decoded = JSON.parse(oldDisclaimer);
            if (typeof decoded === "string" && decoded !== "") {
                const cookie = useCookie<string>("disclaimer-accepted", {
                    default: () => "",
                });
                if (cookie.value === "") {
                    cookie.value = decoded;
                }
            }
        } catch {
            // Corrupt entry — leave it; the cookie stays empty and the flow re-runs.
        }
        localStorage.removeItem("disclaimerAccepted");
    }

    // Changelogs: old key was a raw version string (no JSON encoding).
    const oldChangelogs = localStorage.getItem("changelogs-last-read");
    if (oldChangelogs !== null && oldChangelogs !== "") {
        const cookie = useCookie<string>("changelogs-last-read", {
            default: () => "",
        });
        if (cookie.value === "") {
            cookie.value = oldChangelogs;
        }
        localStorage.removeItem("changelogs-last-read");
    }

    migrated.value = "1";
});
