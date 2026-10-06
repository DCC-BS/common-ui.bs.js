/**
 * Shared bbox geometry for PDF overlays.
 * Boxes use the report contract: TOPLEFT origin, PDF points.
 */

export interface PdfBox {
    /** Page number (1-based). */
    page: number;
    /** Distance from page left edge in PDF points. */
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface PdfAnnotation {
    /** Stable key for click-sync and scroll anchors. */
    key: string;
    /** Raw bboxes in PDF points; empty when only a page anchor exists. */
    boxes: PdfBox[];
    /** Fallback page for focus when boxes or page sizes are unavailable. */
    page?: number | null;
    /** Tooltip and accessible label. */
    title?: string;
    /** Red dashed border (e.g. OCR warning). */
    dashed?: boolean;
}

export interface AnnotationStyle {
    fill: string;
    stroke: string;
}

export interface PageSize {
    width: number;
    height: number;
}

export interface PercentBox {
    left: string;
    top: string;
    width: string;
    height: string;
}

/** Convert PDF points to fractions of the rendered page, as CSS percent strings. */
export function boxToPercent(box: PdfBox, pageSize: PageSize): PercentBox {
    const left = (box.left / pageSize.width) * 100;
    const right = (box.right / pageSize.width) * 100;
    const top = (box.top / pageSize.height) * 100;
    const bottom = (box.bottom / pageSize.height) * 100;
    return {
        left: `${left.toFixed(3)}%`,
        top: `${top.toFixed(3)}%`,
        width: `${(right - left).toFixed(3)}%`,
        height: `${(bottom - top).toFixed(3)}%`,
    };
}

/** Pages an annotation appears on: box pages first, annotation page as fallback. */
export function annotationPages(annotation: PdfAnnotation): Set<number> {
    const pages = new Set<number>();
    for (const box of annotation.boxes) {
        pages.add(box.page);
    }
    if (
        pages.size === 0 &&
        annotation.page !== null &&
        annotation.page !== undefined
    ) {
        pages.add(annotation.page);
    }
    return pages;
}
