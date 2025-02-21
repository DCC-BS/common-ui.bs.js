import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DisclaimerLlm } from '#components';
import { describe, expect, it } from 'vitest';

describe('DisclaimerLLM.vue', () => {
    it('toggles disclaimer visibility', async () => {
        const wrapper = await mountSuspended(DisclaimerLlm);
        const toggleButton = wrapper.get('a');
        expect(wrapper.find('UAlert').exists()).toBe(false);
        await toggleButton.trigger('click');

        expect(wrapper.html()).contains('Disclaimer / Haftungsausschluss');

        await toggleButton.trigger('click');
        expect(wrapper.html()).not.contains('Disclaimer / Haftungsausschluss');
    });
});
