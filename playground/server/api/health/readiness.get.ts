type ReadinessCheck = {
    status: "ready" | "unhealthy";
    checks: {
        api: "connected" | "disconnected" | "unknown";
    };
};

export default defineEventHandler(async (event) => {
    const healthCheck: ReadinessCheck = {
        status: "ready",
        checks: {
            api: "unknown",
        },
    };

    const random = Math.random();

    if (random < 0.3) {
        healthCheck.checks.api = "connected";
        return healthCheck;
    }
    if (random < 0.8) {
        healthCheck.status = "unhealthy";
        healthCheck.checks.api = "disconnected";

        event.node.res.statusCode = 503;
        return healthCheck;
    }

    throw createError({
        statusCode: 500,
        statusMessage: "Readiness check failed unexpectedly",
    });
});
