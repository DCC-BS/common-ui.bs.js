import { onMounted, ref, watch } from "vue";
import { useCookie } from "#app";
import { type Changelog, ChangelogSchema } from "../types/changelog.model";
import { FIRST_RUN_COOKIE_MAX_AGE } from "../types/first-run";

/**
 * Determines whether the Changelogs flow is pending for the current user and,
 * if so, the releases to show.
 *
 * - First-ever visit (`changelogs-last-read` empty) → `pending = false`
 *   immediately (SSR-readable, no fetch). See CONTEXT.md: Changelogs never
 *   shows on the very first visit.
 * - Returning visit → fetch `/api/changelogs?lastRead=…`. `pending` is
 *   `undefined` (loading) until the fetch resolves, then becomes
 *   `true` (new releases exist) or `false` (none).
 *
 * Re-evaluates when the `changelogs-last-read` cookie changes, so a
 * "show changelogs" affordance can reset the cookie and trigger the flow
 * without a reload.
 *
 * The orchestrator treats `pending === undefined` as "block lower-priority
 * flows" so a resolving Changelogs cannot yank focus from Onboarding.
 */
export function useChangelogsPending() {
    const lastRead = useCookie<string>("changelogs-last-read", {
        default: () => "",
        maxAge: FIRST_RUN_COOKIE_MAX_AGE,
    });
    const releases = ref<Changelog[]>([]);
    const pending = ref<boolean | undefined>(
        lastRead.value === "" ? false : undefined,
    );

    async function evaluate() {
        if (lastRead.value === "") {
            releases.value = [];
            pending.value = false;
            return;
        }
        pending.value = undefined;
        try {
            const data = await $fetch<Changelog[]>("/api/changelogs", {
                method: "GET",
                query: { lastRead: lastRead.value },
            });
            releases.value = ChangelogSchema.array().parse(data);
            pending.value = releases.value.length > 0;
        } catch {
            pending.value = false;
        }
    }

    onMounted(evaluate);
    // Re-evaluate when the cookie changes (e.g. ChangelogsButton reset).
    watch(lastRead, evaluate);

    return { lastRead, releases, pending };
}
