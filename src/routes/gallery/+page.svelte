<script lang="ts">
	import { StateProvider } from '@json-render/svelte';
	import { demoSpec } from '$lib/spec.js';
	import DemoRenderer from '$lib/DemoRenderer.svelte';

	const initialState = demoSpec.state ?? {};
</script>

<svelte:head>
	<title>Component Gallery — json-render Svelte</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
	<!-- Header -->
	<header class="border-b border-slate-800/80 bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<span class="rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3 py-1 text-xs font-semibold text-indigo-300">
				@json-render/shadcn-svelte
			</span>
			<h1 class="mt-3 text-3xl font-extrabold text-white">Full Component Showcase</h1>
			<p class="mt-2 text-xs text-slate-400">
				Every single component registered in the shadcn-svelte catalog rendered live via declarative JSON spec.
			</p>
			<div class="mt-4 flex justify-center gap-3">
				<a
					href="/builder"
					class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500"
				>
					<span>Open in Drag & Drop Studio</span>
					<span>⚡</span>
				</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-3xl px-4 py-8">
		<StateProvider {initialState}>
			<DemoRenderer />
		</StateProvider>
	</main>
</div>
