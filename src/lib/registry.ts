import { defineRegistry } from '@json-render/svelte';
import { shadcnComponents } from '@json-render/shadcn-svelte';
import { catalog } from './catalog.js';

export const { registry } = defineRegistry(catalog, {
	components: {
		Card: shadcnComponents.Card,
		Stack: shadcnComponents.Stack,
		Heading: shadcnComponents.Heading,
		Text: shadcnComponents.Text,
		Button: shadcnComponents.Button,
		Badge: shadcnComponents.Badge,
		Input: shadcnComponents.Input,
		Checkbox: shadcnComponents.Checkbox
	}
});
