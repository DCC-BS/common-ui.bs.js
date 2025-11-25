import { defineNuxtModule, createResolver, addComponentsDir, addServerHandler } from '@nuxt/kit';

const module$1 = defineNuxtModule({
  meta: {
    name: "common-ui.bs.js",
    configKey: "common-ui.bs.js"
  },
  // Default configuration options of the Nuxt module
  defaults: {
    path: "server/changelogs"
  },
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
    _nuxt.options.runtimeConfig["common-ui.bs.js"] = {
      path: _options.path
    };
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      global: true,
      pathPrefix: false
    });
    addServerHandler({
      route: "/api/changelogs",
      method: "get",
      handler: resolver.resolve("./runtime/server/api/changelogs.get")
    });
  }
});

export { module$1 as default };
