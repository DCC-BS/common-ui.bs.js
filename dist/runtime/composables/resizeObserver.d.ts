import { type Ref } from "vue";
export declare const useResizeObserver: (container: Ref<HTMLDivElement | undefined>) => {
    observe: (callback: (entry: ResizeObserverEntry) => void) => void;
    resizeObserver: Ref<ResizeObserver | undefined, ResizeObserver | undefined>;
};
