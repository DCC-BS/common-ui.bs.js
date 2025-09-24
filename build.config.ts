import { copyFile, cp } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    failOnWarn: false,
    hooks: {
        "build:done": async () => {
            // console.log("Copying main.css to dist/main.css");
            // await copyFile("src/assets/main.css", "dist/main.css");
            // console.log("Copying kantonbs directory to dist/kantonbs");
            // await cp("src/assets/kantonbs", "dist/kantonbs", {
            //     recursive: true,
            // });
            console.log("Copying lang directory to dist/lang");
            await cp("src/lang", "dist/lang", { recursive: true });
        },
    },
});
