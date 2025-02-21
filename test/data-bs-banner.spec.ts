import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DataBsBanner } from '#components';
import { describe, expect, it } from 'vitest';

describe('DataBsBanner.vue', () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(DataBsBanner);

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('p').text()).toContain('Datenwissenschaften und KI');
    });
});
