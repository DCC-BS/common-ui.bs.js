import * as _nuxt_schema from '@nuxt/schema';
import { ModuleRuntimeHooks } from '@nuxtjs/i18n';

interface ModuleOptions {
    repo: string;
    owner: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleRuntimeHooks & ModuleOptions, ModuleRuntimeHooks & ModuleOptions, false>;

export { _default as default };
export type { ModuleOptions };
