/*
 * This plugin allows a clean migration form the old version to the new without the need of the users to remove old cookies themself.
 *
 * This plugin removes the two cookies for disclaimer and changelogs if there are more than one cookie with the same name.
 * This prevents a bug where the first cookie get read and the second one gets written
 * which prevents for example that the disclaimer state is ever written correctly.
 * Because cookies did not set the partition and SameSite parameters in the past this bug can appear for users which used an old version of this library.
 */

import { defineNuxtPlugin } from "#app";

/**
 * Search for the given cookeName if there are duplicates remove all; else do nothing.
 */
async function purgeDuplicates(cookeName: string, cookies: CookieList) {
    const matches = cookies
        .filter((x) => x.name === cookeName)
        .map(
            (x) =>
                x as {
                    name: string;
                    domain: string | undefined;
                    path: string | undefined;
                },
        );

    if (matches.length > 1) {
        for (const cookie of matches) {
            await cookieStore.delete({
                name: cookie.name,
                domain: cookie.domain,
                path: cookie.path,
            });
        }
    }
}

export default defineNuxtPlugin(async () => {
    if (!import.meta.client) return;

    const cookies = await cookieStore.getAll();
    await purgeDuplicates("disclaimer-accepted", cookies);
    await purgeDuplicates("changelogs-last-read", cookies);
    await purgeDuplicates("tour-completed", cookies);
});
