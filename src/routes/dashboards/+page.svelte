<script lang="ts">
	import { DASHBOARD_METAS } from '$lib/dashboards/index.js';
</script>

<svelte:head>
	<title>Dashboards Hub — json-render Svelte</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
	<!-- Hero header -->
	<section class="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl text-center">
			<div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-300">
				<span>⚡ Built with @json-render/svelte & shadcn-svelte</span>
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
				Production-Ready <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">JSON Dashboards</span>
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
				Explore interactive dashboards constructed completely from declarative JSON specifications. Every card, table, progress meter, form input, and action button is compiled dynamically with zero hardcoded markup.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/builder"
					class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-400 active:scale-95"
				>
					<span>Open Drag & Drop Studio</span>
					<span>⚡</span>
				</a>
				<a
					href="/gallery"
					class="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
				>
					View All Shadcn Components
				</a>
			</div>
		</div>
	</section>

	<!-- Dashboard Cards Grid -->
	<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each DASHBOARD_METAS as item}
				<div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 transition duration-300 hover:border-indigo-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-indigo-500/10">
					<div>
						<!-- Top badge row -->
						<div class="flex items-center justify-between">
							<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-xl group-hover:scale-110 transition">
								{item.icon}
							</span>
							<span class="rounded-full border border-slate-700/60 bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
								{item.badge}
							</span>
						</div>

						<h2 class="mt-4 text-lg font-bold text-white group-hover:text-indigo-200 transition">
							{item.title}
						</h2>
						<p class="mt-2 text-xs leading-relaxed text-slate-400">
							{item.description}
						</p>

						<!-- Highlights -->
						<div class="mt-5 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3 text-[11px] text-slate-400">
							<div class="flex items-center gap-1.5 font-medium text-slate-300">
								<span>Components used:</span>
							</div>
							<div class="mt-1.5 flex flex-wrap gap-1.5">
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Grid</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Card</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Table</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Progress</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Button</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">Badge</span>
							</div>
						</div>
					</div>

					<!-- Bottom Action Links -->
					<div class="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
						<a
							href={item.route}
							class="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
						>
							<span>View Dashboard</span>
							<span>→</span>
						</a>

						<a
							href="/builder?preset={item.id}"
							class="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
						>
							<span>Edit in Studio</span>
							<span>⚡</span>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
