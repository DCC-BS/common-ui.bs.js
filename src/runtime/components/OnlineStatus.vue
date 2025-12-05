<script setup lang="ts">
import { onMounted, ref } from "vue";
import { checkIsOnline } from "../utils/onlineStatus";
import { useI18n } from "vue-i18n";

const isOnline = ref<boolean>();
const { t } = useI18n();

onMounted(() => {
    fetchOnlineStatus();

    setInterval(() => {
        fetchOnlineStatus();
    }, 30000); // 30s
});

async function fetchOnlineStatus() {
    isOnline.value = await checkIsOnline();
}

</script>

<template>
    <div v-if="isOnline !== undefined" class="online-status-indicator">
        <UTooltip :text="isOnline ? t('common-ui.online') : t('common-ui.offline')">
            <div :class="['status-dot', isOnline ? 'online' : 'offline']" />
        </UTooltip>
    </div>
</template>

<style scoped>
.online-status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.status-dot.online {
    background-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.status-dot.offline {
    background-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
</style>