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
      path: resolver.resolve("./runtime/components"),
      global: true,
      pathPrefix: false
    });
  }
});

export { module as default };
