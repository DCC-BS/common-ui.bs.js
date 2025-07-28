export const useResizeObserver = (container) => {
  let observer = (_) => {
  };
  const resizeObserver = ref();
  onMounted(() => {
    if (!container.value) return;
    resizeObserver.value = new ResizeObserver((entries) => {
      for (const entry of entries) {
        observer(entry);
      }
    });
    resizeObserver.value.observe(container.value);
  });
  onUnmounted(() => {
    if (resizeObserver.value) {
      resizeObserver.value.disconnect();
    }
  });
  function observe(callback) {
    observer = callback;
  }
  return { observe, resizeObserver };
};
