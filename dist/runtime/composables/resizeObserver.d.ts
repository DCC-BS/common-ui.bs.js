export declare const useResizeObserver: (container: Ref<HTMLDivElement | undefined>) => {
    observe: (callback: (entry: ResizeObserverEntry) => void) => void;
    resizeObserver: any;
};
