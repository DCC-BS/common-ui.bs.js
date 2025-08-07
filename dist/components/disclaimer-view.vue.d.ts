interface InputProps {
    appName: string;
    postfixHTML: string;
    confirmationText: string;
    showConfirmation: boolean;
}
type __VLS_Props = InputProps;
type __VLS_PublicProps = __VLS_Props & {
    modelValue?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=disclaimer-view.vue.d.ts.map