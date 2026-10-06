<script setup lang="ts">
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
    computed,
    defineAsyncComponent,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
    watch,
} from "vue";
import { useI18n } from "vue-i18n";
import type {
    AnnotationStyle,
    PageSize,
    PdfAnnotation,
    PdfBox,
    PercentBox,
} from "../utils/pdfBoxes";
import { annotationPages, boxToPercent } from "../utils/pdfBoxes";

const PdfEmbed = defineAsyncComponent(() =>
    import("vue-pdf-embed").then((module) => module.default),
);

const props = withDefaults(
    defineProps<{
        fileUrl: string;
        annotations?: PdfAnnotation[];
        activeKey?: string | null;
        /** Style lookup per annotation; falls back to a neutral gray. */
        styleFor?: (annotation: PdfAnnotation, active: boolean) => AnnotationStyle;
        /** Scroll the active annotation's first box into view on activation. */
        focusOnActive?: boolean;
        /** Show the debug-bboxes checkbox in the toolbar. */
        showDebugToggle?: boolean;
    }>(),
    {
        annotations: () => [],
        activeKey: null,
        styleFor: undefined,
        focusOnActive: true,
        showDebugToggle: false,
    },
);

const emit = defineEmits<{
    activate: [key: string];
    pagesLoaded: [numPages: number];
}>();

const debugBoxes = defineModel<boolean>("debugBoxes", { default: false });

const { t } = useI18n();
const pageLabel = t("common-ui.pdf_viewer.page");
const debugBoxesLabel = t("common-ui.pdf_viewer.debug_bboxes");

/** Scoped slot escape hatch, rendered inside every page besides the annotations. */
const pageSlot = defineSlots<{
    page?(slotProps: { page: number; width: number; toPercent: (box: PdfBox, page: number) => PercentBox }): unknown;
}>();

// ---------------------------------------------------------------------------
// Document: a hidden embed loads the document once; every page embed reuses it
// ---------------------------------------------------------------------------

const doc = shallowRef<PDFDocumentProxy | null>(null);
const renderError = ref<string | null>(null);
const pageSizes = ref(new Map<number, PageSize>());

/** Empty page list → the loader embed loads the document without rendering. */
const loaderPages: number[] = [];

function onLoaded(loaded: PDFDocumentProxy): void {
    doc.value = loaded;
    emit("pagesLoaded", loaded.numPages);
}

async function updatePageSizes(loaded: PDFDocumentProxy): Promise<void> {
    const pages = Array.from({ length: loaded.numPages }, (_, index) => index + 1);
    const sizes = await Promise.all(
        pages.map(async (page) => {
            try {
                const viewport = (await loaded.getPage(page)).getViewport({ scale: 1 });
                return [page, { width: viewport.width, height: viewport.height }] as const;
            } catch {
                return [page, { width: 595.28, height: 841.89 }] as const;
            }
        }),
    );
    if (doc.value === loaded) {
        pageSizes.value = new Map(sizes);
    }
}

watch(doc, (loaded) => {
    if (!loaded) {
        pageSizes.value = new Map();
        return;
    }
    void updatePageSizes(loaded);
});

const totalPages = computed(() => doc.value?.numPages ?? 0);
const ready = computed(() => doc.value !== null && pageSizes.value.size === totalPages.value);

function aspectFor(page: number): string | undefined {
    const size = pageSizes.value.get(page);
    return size ? `${size.width} / ${size.height}` : undefined;
}

/** Percent-space converter bound to the viewer's page sizes; for the page slot. */
function slotToPercent(box: PdfBox, page: number): PercentBox {
    const size = pageSizes.value.get(page);
    if (!size) {
        return { left: "0%", top: "0%", width: "0%", height: "0%" };
    }
    return boxToPercent(box, size);
}

// ---------------------------------------------------------------------------
// Fit width: measure the scroll container, keep a small horizontal margin
// ---------------------------------------------------------------------------

const scrollRef = ref<HTMLElement | null>(null);
const fitWidth = ref(720);
const WIDTH_MARGIN = 24;

onMounted(() => {
    const el = scrollRef.value;
    if (!el) {
        return;
    }
    const update = () => {
        fitWidth.value = Math.max(el.clientWidth - WIDTH_MARGIN, 320);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    onUnmounted(() => observer.disconnect());
});

// ---------------------------------------------------------------------------
// Annotations per page (boxes drive grouping; annotation page as fallback)
// ---------------------------------------------------------------------------

const pageAnnotations = computed<Map<number, PdfAnnotation[]>>(() => {
    const map = new Map<number, PdfAnnotation[]>();
    for (const annotation of props.annotations ?? []) {
        for (const page of annotationPages(annotation)) {
            const list = map.get(page);
            if (list) {
                list.push(annotation);
            } else {
                map.set(page, [annotation]);
            }
        }
    }
    return map;
});

// ---------------------------------------------------------------------------
// Styles (consumer-driven; active state passed to the lookup)
// ---------------------------------------------------------------------------

const FALLBACK_STYLE: AnnotationStyle = {
    fill: "rgba(148, 148, 148, 0.1)",
    stroke: "var(--color-gray-400)",
};

function styleFor(annotation: PdfAnnotation): AnnotationStyle {
    const active = annotation.key === props.activeKey;
    return props.styleFor?.(annotation, active) ?? FALLBACK_STYLE;
}

// ---------------------------------------------------------------------------
// Debug mode: show raw bbox outlines for every annotation
// ---------------------------------------------------------------------------

interface DebugBox {
    page: number;
    index: number;
    left: string;
    top: string;
    width: string;
    height: string;
}

const debugBoxesByPage = computed<Map<number, DebugBox[]>>(() => {
    const map = new Map<number, DebugBox[]>();
    if (!debugBoxes.value) {
        return map;
    }
    for (const annotation of props.annotations ?? []) {
        for (const box of annotation.boxes) {
            const size = pageSizes.value.get(box.page);
            if (!size) {
                continue;
            }
            const item: DebugBox = {
                page: box.page,
                index: 0,
                ...boxToPercent(box, size),
            };
            const list = map.get(box.page);
            if (list) {
                list.push(item);
            } else {
                map.set(box.page, [item]);
            }
        }
    }
    return map;
});

// ---------------------------------------------------------------------------
// Exact bbox overlay (PDF points, TOPLEFT origin)
// ---------------------------------------------------------------------------

const overlaysByPage = computed<Map<number, { annotation: PdfAnnotation; boxes: PercentBox[] }[]>>(() => {
    const map = new Map<number, { annotation: PdfAnnotation; boxes: PercentBox[] }[]>();
    for (const [page, annotations] of pageAnnotations.value) {
        const size = pageSizes.value.get(page);
        if (!size) {
            continue;
        }
        const items: { annotation: PdfAnnotation; boxes: PercentBox[] }[] = [];
        for (const annotation of annotations) {
            const boxes = annotation.boxes
                .filter((box) => box.page === page)
                .map((box) => boxToPercent(box, size));
            if (boxes.length > 0) {
                items.push({ annotation, boxes });
            }
        }
        if (items.length > 0) {
            map.set(page, items);
        }
    }
    return map;
});

// ---------------------------------------------------------------------------
// Page elements + lazy rendering: embeds mount when nearing the viewport
// ---------------------------------------------------------------------------

const pageEls = new Map<number, HTMLElement>();

function setPageEl(page: number, el: unknown): void {
    if (el instanceof HTMLElement) {
        pageEls.set(page, el);
    } else {
        pageEls.delete(page);
    }
}

const mountedPages = ref(new Set<number>());
let pageObserver: IntersectionObserver | null = null;

function mountPage(page: number): void {
    if (!mountedPages.value.has(page)) {
        mountedPages.value = new Set(mountedPages.value).add(page);
    }
}

function observePages(): void {
    pageObserver?.disconnect();
    const scroller = scrollRef.value;
    if (!scroller) {
        return;
    }
    pageObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    continue;
                }
                pageObserver?.unobserve(entry.target);
                const page = Number.parseInt((entry.target as HTMLElement).dataset.page ?? "", 10);
                if (!Number.isNaN(page)) {
                    mountPage(page);
                }
            }
        },
        { root: scroller, rootMargin: "800px 0px" },
    );
    for (const el of pageEls.values()) {
        pageObserver.observe(el);
    }
}

onUnmounted(() => pageObserver?.disconnect());

watch(
    () => props.fileUrl,
    () => {
        renderError.value = null;
        mountedPages.value = new Set();
    },
);

// ---------------------------------------------------------------------------
// Scroll-driven current page: scrolling freely switches pages
// ---------------------------------------------------------------------------

const currentPage = ref(1);
let scrollFrame = 0;

function onScroll(): void {
    if (scrollFrame) {
        return;
    }
    scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateCurrentPage();
    });
}

function updateCurrentPage(): void {
    const scroller = scrollRef.value;
    if (!scroller || totalPages.value === 0) {
        return;
    }
    const bounds = scroller.getBoundingClientRect();
    const mid = bounds.top + scroller.clientHeight / 2;
    let best = currentPage.value;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const [page, el] of pageEls) {
        const box = el.getBoundingClientRect();
        if (box.bottom < bounds.top || box.top > bounds.bottom) {
            continue;
        }
        const distance = Math.abs((box.top + box.bottom) / 2 - mid);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = page;
        }
    }
    if (best !== currentPage.value) {
        currentPage.value = best;
    }
}

onUnmounted(() => {
    if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
    }
});

// ---------------------------------------------------------------------------
// Navigation — free scrolling plus programmatic jumps share one executor
// ---------------------------------------------------------------------------

function scrollScrollerTo(top: number, scroller: HTMLElement): void {
    const distance = Math.abs(top - scroller.scrollTop);
    const behavior = distance > scroller.clientHeight * 3 ? "auto" : "smooth";
    scroller.scrollTo({ top, behavior });
}

async function jumpToPage(page: number): Promise<void> {
    if (!Number.isFinite(page)) {
        return;
    }
    const target = Math.min(Math.max(Math.trunc(page), 1), Math.max(totalPages.value, 1));
    await nextTick();
    const scroller = scrollRef.value;
    const el = pageEls.get(target);
    if (!scroller || !el) {
        return;
    }
    mountPage(target);
    const top = Math.max(
        el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 8,
        0,
    );
    scrollScrollerTo(top, scroller);
}

function scrollToPage(page: number): void {
    void jumpToPage(page);
}

const pendingFocusKey = ref<string | null>(null);

/** Jump so the annotation's first box sits a third from the top; skip if visible. */
async function focusAnnotation(annotation: PdfAnnotation): Promise<void> {
    const page = annotation.boxes[0]?.page ?? annotation.page ?? null;
    if (page === null) {
        return;
    }
    await nextTick();
    const scroller = scrollRef.value;
    const el = pageEls.get(page);
    if (!scroller || !el) {
        return;
    }
    mountPage(page);
    const firstTop = overlaysByPage.value
        .get(page)
        ?.find((item) => item.annotation.key === annotation.key)
        ?.boxes[0]?.top;
    const boxTop = firstTop ? (Number.parseFloat(firstTop) / 100) * el.getBoundingClientRect().height : 0;
    const absoluteTop = scroller.scrollTop + el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + boxTop;
    const visible = absoluteTop >= scroller.scrollTop && absoluteTop <= scroller.scrollTop + scroller.clientHeight - 64;
    if (visible) {
        return;
    }
    const target = Math.min(
        Math.max(absoluteTop - scroller.clientHeight * 0.33, 0),
        scroller.scrollHeight - scroller.clientHeight,
    );
    scrollScrollerTo(target, scroller);
}

function focusAnnotationByKey(key: string): void {
    const annotation = (props.annotations ?? []).find((a) => a.key === key);
    if (annotation) {
        void focusAnnotation(annotation);
    }
}

watch(
    () => props.activeKey,
    (key) => {
        if (!key || !props.focusOnActive) {
            return;
        }
        const annotation = (props.annotations ?? []).find((a) => a.key === key);
        if (!annotation) {
            return;
        }
        if (!ready.value) {
            pendingFocusKey.value = annotation.key;
            return;
        }
        void focusAnnotation(annotation);
    },
);

watch(ready, async (isReady) => {
    if (!isReady) {
        return;
    }
    await nextTick();
    observePages();
    const key = pendingFocusKey.value;
    if (!key) {
        return;
    }
    pendingFocusKey.value = null;
    focusAnnotationByKey(key);
});

defineExpose({ scrollToPage, focusAnnotation: focusAnnotationByKey });
</script>

<template>
    <div class="flex flex-col h-full min-h-0 overflow-hidden">
        <!-- Hidden loader: loads the document once, renders nothing -->
        <PdfEmbed
            :source="fileUrl"
            :page="loaderPages"
            class="hidden"
            @loaded="onLoaded"
            @loading-failed="(error: Error) => (renderError = error.message)"
        />

        <div
            ref="scrollRef"
            class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-elevated px-2 py-3"
            @scroll.passive="onScroll"
        >
            <UIcon
                v-if="!ready && !renderError"
                name="i-lucide-loader-circle"
                class="size-8 text-muted animate-spin block mx-auto mt-10"
            />
            <UAlert
                v-if="renderError"
                icon="i-lucide-circle-alert"
                color="error"
                variant="soft"
                :title="renderError"
                class="m-4"
            />

            <div v-show="ready" class="mx-auto flex w-fit flex-col gap-4">
                <div
                    v-for="page in totalPages"
                    :key="page"
                    :ref="(el) => setPageEl(page, el)"
                    :data-page="page"
                    class="relative bg-white shadow-[2px_2px_4px_#00000020]"
                    :style="{ width: `${fitWidth}px`, aspectRatio: aspectFor(page) }"
                >
                    <PdfEmbed
                        v-if="mountedPages.has(page)"
                        :source="doc"
                        :page="page"
                        :width="fitWidth"
                        text-layer
                        @rendering-failed="(error: Error) => (renderError = error.message)"
                    />

                    <!-- annotation buttons (exact bboxes) -->
                    <template v-for="item in overlaysByPage.get(page) ?? []" :key="item.annotation.key">
                        <button
                            v-for="(box, boxIndex) in item.boxes"
                            :key="`${item.annotation.key}-${boxIndex}`"
                            type="button"
                            class="absolute rounded-[2px]"
                            :class="item.annotation.dashed ? 'border-2 border-dashed border-error' : ''"
                            :style="{
                                left: box.left,
                                top: box.top,
                                width: box.width,
                                height: box.height,
                                backgroundColor: styleFor(item.annotation).fill,
                                boxShadow: `inset 0 0 0 1.5px ${styleFor(item.annotation).stroke}`,
                                pointerEvents:
                                    item.annotation.key === activeKey ? 'none' : 'auto',
                            }"
                            :title="item.annotation.title ?? undefined"
                            :aria-label="item.annotation.title ?? item.annotation.key"
                            @click="emit('activate', item.annotation.key)"
                        />
                    </template>

                    <!-- debug: raw bbox outlines -->
                    <template v-if="debugBoxes">
                        <div
                            v-for="debugBox in debugBoxesByPage.get(page) ?? []"
                            :key="`debug-${debugBox.page}-${debugBox.left}-${debugBox.top}`"
                            class="absolute border border-primary pointer-events-none"
                            :style="{
                                left: debugBox.left,
                                top: debugBox.top,
                                width: debugBox.width,
                                height: debugBox.height,
                            }"
                        />
                    </template>

                    <!-- consumer escape hatch: custom overlays inside the page -->
                    <slot
                        v-if="pageSlot?.page"
                        name="page"
                        :page="page"
                        :width="fitWidth"
                        :to-percent="slotToPercent"
                    />
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between gap-2 px-3 py-1.5 bg-default border-t border-default">
            <div class="flex items-center gap-3">
                <span class="text-xs text-muted">
                    {{ pageLabel }} {{ currentPage }} / {{ Math.max(totalPages, 1) }}
                </span>
                <UCheckbox
                    v-if="showDebugToggle"
                    v-model="debugBoxes"
                    size="xs"
                    :label="debugBoxesLabel"
                />
            </div>
            <div class="flex items-center gap-1">
                <UButton
                    icon="i-lucide-chevron-left"
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    :disabled="currentPage <= 1"
                    @click="scrollToPage(currentPage - 1)"
                />
                <input
                    v-model.number="currentPage"
                    type="number"
                    min="1"
                    :max="Math.max(totalPages, 1)"
                    class="w-14 text-xs text-center rounded-md ring-1 ring-default bg-default px-1 py-0.5"
                    :aria-label="pageLabel"
                    @change="scrollToPage(currentPage)"
                />
                <UButton
                    icon="i-lucide-chevron-right"
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    :disabled="currentPage >= totalPages"
                    @click="scrollToPage(currentPage + 1)"
                />
            </div>
        </div>
    </div>
</template>