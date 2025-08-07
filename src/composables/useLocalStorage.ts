import { onMounted, type Ref, ref, watch } from "vue";

const cache = new Map<string, Ref<unknown>>();

function getCachedRef<T>(key: string, initialValue: T): Ref<T> {
    if (!cache.has(key)) {
        const stored = ref(initialValue) as Ref<T>;
        cache.set(key, stored);
    }
    return cache.get(key) as Ref<T>;
}

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
    const stored = getCachedRef(key, initialValue);

    onMounted(() => {
        if (import.meta.client) {
            const item = localStorage.getItem(key);
            if (item !== null) {
                stored.value = JSON.parse(item);
            } else {
                localStorage.setItem(key, JSON.stringify(initialValue));
            }
        }
    });

    watch(
        stored,
        (val) => {
            if (import.meta.client) {
                localStorage.setItem(key, JSON.stringify(val));
            }
        },
        { deep: true },
    );

    return stored;
}
