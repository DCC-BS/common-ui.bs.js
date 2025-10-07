import { cp } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    failOnWarn: false,
    hooks: {
        "build:done": async () => {
            console.log("Copying lang directory to dist/lang");
            await cp("src/lang", "dist/lang", { recursive: true });
        },
    },
});
