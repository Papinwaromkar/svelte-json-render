import { schema } from '@json-render/svelte/schema';
import { shadcnComponentDefinitions } from '@json-render/shadcn-svelte/catalog';
import { z } from 'zod';

export const catalog = schema.createCatalog({
	components: {
		Card: shadcnComponentDefinitions.Card,
		Stack: shadcnComponentDefinitions.Stack,
		Heading: shadcnComponentDefinitions.Heading,
		Text: shadcnComponentDefinitions.Text,
		Button: shadcnComponentDefinitions.Button,
		Badge: shadcnComponentDefinitions.Badge,
		Input: shadcnComponentDefinitions.Input,
		Checkbox: shadcnComponentDefinitions.Checkbox
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
