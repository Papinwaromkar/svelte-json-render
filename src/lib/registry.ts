import { defineRegistry } from '@json-render/svelte';
import { shadcnComponents } from '@json-render/shadcn-svelte';
import { catalog } from './catalog.js';

export const { registry } = defineRegistry(catalog, {
	components: {
		...shadcnComponents
	}
});
