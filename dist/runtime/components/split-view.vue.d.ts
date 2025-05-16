import { type StyleValue } from 'vue';
interface SplitViewProps {
    aPaneStyle?: string;
    bPaneStyle?: string;
    splitViewStyle?: string;
    resizerStyle?: string;
    resizerInnerStyle?: string;
    isHorizontal?: boolean;
}
declare const aPaneCssStyle: import("vue").Ref<StyleValue, StyleValue>;
declare const bPaneCssStyle: import("vue").Ref<StyleValue, StyleValue>;
declare const aPaneStyle: import("vue").ComputedRef<string>;
declare const bPaneStyle: import("vue").ComputedRef<string>;
declare const splitViewStyle: import("vue").ComputedRef<string>;
declare const resizerStyle: import("vue").ComputedRef<string>;
declare const resizerInnerStyle: import("vue").ComputedRef<string>;
declare const startResize: (e: MouseEvent) => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_0: {};
declare var __VLS_1: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    a?: (props: typeof __VLS_0) => any;
} & {
    b?: (props: typeof __VLS_1) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<SplitViewProps, {
    aPaneCssStyle: typeof aPaneCssStyle;
    bPaneCssStyle: typeof bPaneCssStyle;
    aPaneStyle: typeof aPaneStyle;
    bPaneStyle: typeof bPaneStyle;
    splitViewStyle: typeof splitViewStyle;
    resizerStyle: typeof resizerStyle;
    resizerInnerStyle: typeof resizerInnerStyle;
    startResize: typeof startResize;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SplitViewProps> & Readonly<{}>, {
    aPaneStyle: string;
    bPaneStyle: string;
    splitViewStyle: string;
    resizerStyle: string;
    resizerInnerStyle: string;
    isHorizontal: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<SplitViewProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SplitViewProps> & Readonly<{}>, {
    aPaneStyle: string;
    bPaneStyle: string;
    splitViewStyle: string;
    resizerStyle: string;
    resizerInnerStyle: string;
    isHorizontal: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
