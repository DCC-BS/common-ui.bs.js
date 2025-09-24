import { copyFile } from "node:fs/promises";
import path from "node:path";
import { addComponentsDir, createResolver, defineNuxtModule } from "@nuxt/kit";
import type { ModuleRuntimeHooks } from "@nuxtjs/i18n";

// import DataBsBanner from "./components/data-bs-banner.vue";
// import DataBsFooter from "./components/data-bs-footer.vue";
// import Disclaimer from "./components/disclaimer.vue";
// import DisclaimerButton from "./components/disclaimer-button.vue";
// import DisclaimerPage from "./components/disclaimer-page.vue";
// import DisclaimerView from "./components/disclaimer-view.vue";
// import SplitView from "./components/split-view.vue";
// import NavigationBar from "./components/navigation-bar.vue";
// import SplitContainer from "./components/split-container.vue";
// import UndoRedoButtons from "./components/undo-redo-buttons.vue";

// export {
//     DataBsBanner,
//     DataBsFooter,
//     UndoRedoButtons,
//     DisclaimerButton,
//     Disclaimer,
//     DisclaimerView,
//     DisclaimerPage,
//     SplitView,
//     SplitContainer,
//     NavigationBar,
// };

export default defineNuxtModule<ModuleRuntimeHooks>({
    meta: {
        name: "common-ui.bs.js",
        configKey: "common-ui.bs.js",
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        _nuxt.hook("nitro:build:public-assets", async (nitro) => {
            const srcImage = path.resolve(__dirname, "assets/databs_logo.png");
            const targetImage = path.join(
                nitro.options.output.publicDir,
                "databs_log.png",
            );

            await copyFile(srcImage, targetImage);
        });

        _nuxt.hook("i18n:registerModule", (register) => {
            register({
                langDir: resolver.resolve("./lang"),
                locales: [
                    {
                        code: "en",
                        file: "en.json",
                    },
                    {
                        code: "de",
                        file: "de.json",
                    },
                ],
            });
        });

        addComponentsDir({
            path: resolver.resolve("./components"),
            global: true,
            pathPrefix: false,
        });
    },
});
