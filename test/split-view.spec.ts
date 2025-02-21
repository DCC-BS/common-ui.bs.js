import { mountSuspended } from '@nuxt/test-utils/runtime'
import { SplitView } from '#components';
import { describe, expect, it } from 'vitest';

describe('SplitView.vue', () => {
    it('renders slots correctly', async () => {
        const wrapper = await mountSuspended(SplitView, {
            slots: {
                a: '<div class="a-content">A Content</div>',
                b: '<div class="b-content">B Content</div>',
            },
        });
        expect(wrapper.find('.a-content').exists()).toBe(true);
        expect(wrapper.find('.b-content').exists()).toBe(true);
    });

    it('applies styles correctly', async () => {
        const wrapper = await mountSuspended(SplitView, {
            props: {
                aPaneStyle: 'custom-a-style',
                bPaneStyle: 'custom-b-style',
                splitViewStyle: 'custom-split-view-style',
                resizerStyle: 'custom-resizer-style',
                resizerInnerStyle: 'custom-resizer-inner-style',
                isHorizontal: true,
            },
        });
        expect(wrapper.find('.custom-a-style').exists()).toBe(true);
        expect(wrapper.find('.custom-b-style').exists()).toBe(true);
        expect(wrapper.find('.custom-split-view-style').exists()).toBe(true);
        expect(wrapper.find('.custom-resizer-style').exists()).toBe(true);
        expect(wrapper.find('.custom-resizer-inner-style').exists()).toBe(true);
    });
});
