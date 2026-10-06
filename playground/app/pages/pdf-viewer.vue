<script setup lang="ts">
import type { AnnotationStyle, PdfAnnotation } from "#components";

const samplePdf = "/sample.pdf";

const annotations: PdfAnnotation[] = [
    {
        key: "finding-1",
        boxes: [{ page: 1, left: 72, top: 200, right: 500, bottom: 280 }],
        title: "Finding: library block",
    },
    {
        key: "new-argument-1",
        boxes: [{ page: 1, left: 72, top: 360, right: 520, bottom: 400 }],
        title: "New argument",
    },
];

function styleFor(_annotation: PdfAnnotation, active: boolean): AnnotationStyle {
    if (active) {
        return { fill: "rgba(165, 108, 201, 0.25)", stroke: "var(--color-primary-600)" };
    }
    if (_annotation.key === "finding-1") {
        return { fill: "rgba(50, 131, 74, 0.16)", stroke: "var(--color-green-600)" };
    }
    return { fill: "rgba(230, 149, 0, 0.25)", stroke: "var(--ui-warning)" };
}

const activeKey = ref<string | null>(null);

const debugBoxes = ref(false);
</script>

<template>
    <div class="h-[800px]">
        <PdfViewer
            v-model:debug-boxes="debugBoxes"
            :file-url="samplePdf"
            :annotations="annotations"
            :active-key="activeKey"
            :style-for="styleFor"
            show-debug-toggle
            @activate="(key) => (activeKey = key)"
        />
    </div>
</template>