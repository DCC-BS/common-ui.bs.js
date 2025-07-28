import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import { DataBsBanner } from "#components";

describe("DataBsBanner.vue", () => {
    it("renders correctly", async () => {
        const wrapper = await mountSuspended(DataBsBanner);

        expect(wrapper.find("img").exists()).toBe(true);
        expect(wrapper.find("p").text()).toContain(
            "Datenwissenschaften und KI",
        );
    });
});
