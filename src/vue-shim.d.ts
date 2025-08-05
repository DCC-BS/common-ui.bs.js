declare module "*.vue" {
    import type { DefineComponent } from "vue";
    // biome-ignore lint/suspicious/noExplicitAny: Vue component type requires any
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
    export default component;
}
