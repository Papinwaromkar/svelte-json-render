<script lang="ts">
	import { StateProvider } from '@json-render/svelte';
	import { demoSpec } from '$lib/spec.js';
	import DemoRenderer from '$lib/DemoRenderer.svelte';

	const initialState = demoSpec.state ?? {};
</script>

<main class="mx-auto max-w-2xl px-4 py-8">
	<div class="mb-6 flex items-center justify-between rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 to-purple-950/40 p-4 backdrop-blur">
		<div>
			<h2 class="text-sm font-semibold text-white">✨ Visual Drag & Drop Studio</h2>
			<p class="text-xs text-slate-300">Drag components into canvas, reorder live, and build JSON specs visually.</p>
		</div>
		<a
			href="/builder"
			class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95"
		>
			<span>Open Drag & Drop UI</span>
			<span>→</span>
		</a>
	</div>

	<StateProvider {initialState}>
		<DemoRenderer />
	</StateProvider>
</main>
