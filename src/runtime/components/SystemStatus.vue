<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { checkIsOnline } from "../utils/onlineStatus";

const isOnline = ref<boolean>();
const { t } = useI18n();

interface Props {
    pollInterval?: number;
    isOnlineCheckFunction?: () => Promise<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
    pollInterval: 30000,
    isOnlineCheckFunction: async () => {
        return await checkIsOnline();
    },
});

let timer: ReturnType<typeof setTimeout> | undefined;
let stopped = false;

onMounted(async () => {
    await fetchOnlineStatus();
    if (stopped) return;
    timer = setTimeout(poll, props.pollInterval);
});

onUnmounted(() => {
    stopped = true;
    if (timer !== undefined) {
        clearTimeout(timer);
    }
});

async function poll() {
    await fetchOnlineStatus();
    if (stopped) return;
    timer = setTimeout(poll, props.pollInterval);
}

async function fetchOnlineStatus() {
    try {
        isOnline.value = await props.isOnlineCheckFunction();
    } catch {
        // On rejection, leave isOnline at its current value so an
        // already-shown disruption indicator stays visible (and a
        // healthy state isn't flipped by a transient check failure).
    }
}
</script>

<template>
    <UTooltip
        v-if="isOnline === false"
        :text="t('common-ui.health_status.offline_description')"
    >
        <div class="flex items-center gap-2 text-sm text-red-500">
            <UIcon name="i-lucide-triangle-alert" class="w-4 h-4" />
            <span>{{ t("common-ui.health_status.offline_title") }}</span>
        </div>
    </UTooltip>
</template>
