<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { checkIsOnline } from "../utils/onlineStatus";

const isOnline = ref<boolean>();
const { t } = useI18n();

interface Props {
    showText?: boolean;
    pollInterval?: number;
    isOnlineCheckFunction?: () => Promise<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
    showText: false,
    pollInterval: 30000,
    isOnlineCheckFunction: async () => {
        return await checkIsOnline();
    },
});

onMounted(() => {
    fetchOnlineStatus();

    setInterval(() => {
        fetchOnlineStatus();
    }, props.pollInterval);
});

async function fetchOnlineStatus() {
    isOnline.value = await props.isOnlineCheckFunction();
}
</script>

<template>
    <div v-if="isOnline !== undefined" class="flex items-center gap-2">
        <UTooltip
            :text="
                isOnline
                    ? t('common-ui.health_status.online_description')
                    : t('common-ui.health_status.offline_description')
            "
        >
            <div
                class="flex items-center gap-2 text-sm"
                :class="isOnline ? 'text-green-500' : 'text-red-500'"
            >
                <span v-if="props.showText">{{
                    isOnline
                        ? t("common-ui.health_status.online_title")
                        : t("common-ui.health_status.offline_title")
                }}</span>
                <div
                    class="w-3 h-3 rounded-full transition-colors duration-300"
                    :class="
                        isOnline
                            ? 'bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]'
                            : 'bg-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]'
                    "
                />
            </div>
        </UTooltip>
    </div>
</template>
