import { schema } from '@json-render/svelte/schema';
import { shadcnComponentDefinitions } from '@json-render/shadcn-svelte/catalog';
import { z } from 'zod';

export const catalog = schema.createCatalog({
	components: {
		...shadcnComponentDefinitions
	},
	actions: {
		increment: {
			params: z.object({}),
			description: 'Increment the counter by 1'
		},
		decrement: {
			params: z.object({}),
			description: 'Decrement the counter by 1'
		},
		reset: {
			params: z.object({}),
			description: 'Reset the counter to 0'
		}
	}
});
