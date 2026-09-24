<script lang="ts">
	import { StateProvider } from '@json-render/svelte';
	import { demoSpec } from '$lib/spec.js';
	import DemoRenderer from '$lib/DemoRenderer.svelte';

	const initialState = demoSpec.state ?? {};
</script>

<main class="mx-auto max-w-xl py-8">
	<StateProvider {initialState}>
		<DemoRenderer />
	</StateProvider>
</main>
