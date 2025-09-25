import { onMounted, ref, watch } from "vue";
const cache = /* @__PURE__ */ new Map();
function getCachedRef(key, initialValue) {
  if (!cache.has(key)) {
    const stored = ref(initialValue);
    cache.set(key, stored);
  }
  return cache.get(key);
}
export function useLocalStorage(key, initialValue) {
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
    { deep: true }
  );
  return stored;
}
