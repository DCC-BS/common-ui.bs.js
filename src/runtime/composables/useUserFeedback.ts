import { type Toast, useToast } from "@nuxt/ui/runtime/composables/useToast.js";
import { useI18n } from "vue-i18n";

type FeedbackType = "error" | "success" | "info" | "warning";

type NuxtColor =
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral"
    | undefined;

type ApiError = {
    $type: "ApiError";
    errorId: string;
    debugMessage?: string;
    status: number;
};

function typeToColor(type: FeedbackType): NuxtColor {
    return type as NuxtColor;
}

function typeToIcon(type: FeedbackType): string {
    switch (type) {
        case "error":
            return "i-lucide-circle-alert";
        case "success":
            return "i-lucide-circle-check";
        case "info":
            return "i-lucide-info";
        case "warning":
            return "i-lucide-triangle-alert";
        default:
            return "i-lucide-info";
    }
}

export function useUserFeedback() {
    const toast = useToast();
    const { t } = useI18n();

    function showError(error: Error | ApiError) {
        if ("$type" in error && error.$type === "ApiError") {
            showToast(t(`api_error.${error.errorId}`));
        } else {
            showToast((error as Error).message);
        }
    }

    function showToast(
        message: string,
        type: FeedbackType = "error",
        options: Partial<Omit<Toast, "description">> = {},
    ) {
        const opt = {
            description: message,
            color: typeToColor(type),
            icon: typeToIcon(type),
            duration: 8000,
            ...options,
        } as Toast;

        toast.add(opt);
    }

    return {
        showToast,
        showError,
    };
}
