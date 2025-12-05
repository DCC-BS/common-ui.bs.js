export async function checkIsOnline(): Promise<boolean> {
    try {
        const response = await fetch("/api/health/readiness");
        return response.ok;
    } catch (_: unknown) {
        return false;
    }
}
