interface SplitViewProps {
    aPaneStyle?: string;
    bPaneStyle?: string;
    splitViewStyle?: string;
    resizerStyle?: string;
    resizerInnerStyle?: string;
    isHorizontal?: boolean;
}
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    a?: (props: typeof __VLS_1) => any;
} & {
    b?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<SplitViewProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<SplitViewProps> & Readonly<{}>, {
    aPaneStyle: string;
    bPaneStyle: string;
    splitViewStyle: string;
    resizerStyle: string;
    resizerInnerStyle: string;
    isHorizontal: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
