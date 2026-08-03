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

let timer: ReturnType<typeof setInterval> | undefined;

onMounted(async () => {
    await fetchOnlineStatus();

    timer = setInterval(() => {
        fetchOnlineStatus();
    }, props.pollInterval);
});

onUnmounted(() => {
    if (timer !== undefined) {
        clearInterval(timer);
    }
});

async function fetchOnlineStatus() {
    isOnline.value = await props.isOnlineCheckFunction();
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
