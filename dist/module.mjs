import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "common-ui.bs.js",
    configKey: "common-ui.bs.js"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    _nuxt.hook("nitro:build:public-assets", async (nitro) => {
      const srcImage = path.resolve(__dirname, "assets/databs_logo.png");
      const targetImage = path.join(
        nitro.options.output.publicDir,
        "databs_log.png"
      );
      await copyFile(srcImage, targetImage);
    });
    _nuxt.hook("i18n:registerModule", (register) => {
      register({
        langDir: resolver.resolve("./lang"),
        locales: [
          {
            code: "en",
            file: "en.json"
          },
          {
            code: "de",
            file: "de.json"
          }
        ]
      });
    });
    addComponentsDir({
      path: resolver.resolve("./components"),
      global: true,
      pathPrefix: false
    });
  }
});

export { module as default };
