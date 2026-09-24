<script lang="ts">
	import {
		StateProvider,
		ActionProvider,
		ValidationProvider,
		VisibilityProvider,
		Renderer
	} from '@json-render/svelte';
	import type { Spec } from '@json-render/core';
	import { registry } from '$lib/registry.js';
	import { DASHBOARD_METAS } from '$lib/dashboards/index.js';

	// Mini interactive demo for the hero
	const heroDemoSpec: Spec = {
		root: 'root',
		state: {
			count: 142,
			role: 'Fullstack Architect',
			status: 'Online',
			notifications: true
		},
		elements: {
			root: {
				type: 'Card',
				props: {
					title: '⚡ Live Reactive JSON-Render Node',
					description: 'Compiled on-the-fly with Svelte 5 runes and shadcn components'
				},
				children: ['hero-card-stack']
			},
			'hero-card-stack': {
				type: 'Stack',
				props: { direction: 'vertical', gap: 'md' },
				children: ['hero-counter-row', 'hero-switch-row', 'hero-action-row']
			},
			'hero-counter-row': {
				type: 'Stack',
				props: { direction: 'horizontal', align: 'center', justify: 'between' },
				children: ['counter-label', 'counter-badge']
			},
			'counter-label': {
				type: 'Text',
				props: { text: 'Real-time Event Stream Counter:', variant: 'body' }
			},
			'counter-badge': {
				type: 'Badge',
				props: { text: '14,290 req/s', variant: 'default' }
			},
			'hero-switch-row': {
				type: 'Switch',
				props: {
					label: 'Auto-sync state with AI streaming agent',
					checked: { $bindState: '/notifications' }
				}
			},
			'hero-action-row': {
				type: 'Stack',
				props: { direction: 'horizontal', gap: 'sm' },
				children: ['launch-studio-btn', 'docs-link-btn']
			},
			'launch-studio-btn': {
				type: 'Button',
				props: { label: 'Customize in Drag & Drop Studio', variant: 'primary' }
			},
			'docs-link-btn': {
				type: 'Button',
				props: { label: 'Explore Specs', variant: 'secondary' }
			}
		}
	};
</script>

<svelte:head>
	<title>json-render Svelte — Declarative UI & Drag-and-Drop Studio</title>
</svelte:head>

<div class="relative overflow-hidden bg-slate-950 font-sans text-slate-100">
	<!-- Ambient Background Glows -->
	<div class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/10 blur-3xl"></div>
	<div class="pointer-events-none absolute top-[700px] right-0 -z-10 h-[400px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl"></div>

	<!-- Hero Section -->
	<section class="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
		<div class="text-center">
			<!-- Tagline Badge -->
			<div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur">
				<span class="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
				<span>Svelte 5 Runes • Shadcn UI • Visual Drag & Drop</span>
			</div>

			<!-- Main Heading -->
			<h1 class="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
				Build & Render Full Web Apps <br class="hidden sm:inline" />
				from <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Declarative JSON</span>
			</h1>

			<!-- Subtitle -->
			<p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
				Transform pure JSON into reactive Svelte 5 applications. Assemble interfaces visually with our interactive drag-and-drop studio, or stream Generative UI directly from AI models with zero lock-in.
			</p>

			<!-- Action CTAs -->
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/builder"
					class="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-400 active:scale-95"
				>
					<span>Launch Drag & Drop Studio</span>
					<span class="text-base">⚡</span>
				</a>
				<a
					href="/dashboards"
					class="rounded-xl border border-slate-800 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
				>
					Explore Dashboards →
				</a>
				<a
					href="/gallery"
					class="rounded-xl border border-slate-800/80 bg-slate-950 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-slate-200"
				>
					Component Gallery
				</a>
			</div>
		</div>

		<!-- Interactive Hero Live Component Preview -->
		<div class="mx-auto mt-16 max-w-3xl">
			<div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-1 shadow-2xl shadow-indigo-950/50 backdrop-blur-sm">
				<div class="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5">
					<div class="flex items-center gap-2">
						<span class="h-3 w-3 rounded-full bg-red-500/80"></span>
						<span class="h-3 w-3 rounded-full bg-yellow-500/80"></span>
						<span class="h-3 w-3 rounded-full bg-green-500/80"></span>
						<span class="ml-2 font-mono text-[11px] text-slate-400">demo-spec.json • Live Renderer</span>
					</div>
					<a href="/builder" class="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300">
						Edit this in Studio ⚡
					</a>
				</div>
				<div class="p-6">
					<StateProvider initialState={heroDemoSpec.state ?? {}}>
						<ActionProvider handlers={{}}>
							<VisibilityProvider>
								<ValidationProvider>
									<Renderer spec={heroDemoSpec} {registry} />
								</ValidationProvider>
							</VisibilityProvider>
						</ActionProvider>
					</StateProvider>
				</div>
			</div>
		</div>
	</section>

	<!-- Dashboards Showcase Section -->
	<section class="border-t border-slate-800/80 bg-slate-900/30 py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
				<div>
					<span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Pre-built Dashboards</span>
					<h2 class="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
						Production Dashboards Ready to Deploy
					</h2>
					<p class="mt-2 max-w-xl text-xs text-slate-400">
						Every dashboard below is defined entirely in a clean JSON file and executed via <code class="text-indigo-300">@json-render/svelte</code>. Click to view live or load directly into the Drag & Drop editor.
					</p>
				</div>
				<a
					href="/dashboards"
					class="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
				>
					View All 4 Dashboards →
				</a>
			</div>

			<!-- Dashboard Cards Grid -->
			<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each DASHBOARD_METAS as item}
					<div class="group flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 transition duration-200 hover:border-indigo-500/50 hover:bg-slate-900/80">
						<div>
							<div class="flex items-center justify-between">
								<span class="text-2xl">{item.icon}</span>
								<span class="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">{item.badge}</span>
							</div>
							<h3 class="mt-3 text-sm font-bold text-white group-hover:text-indigo-300 transition">
								{item.title}
							</h3>
							<p class="mt-1.5 text-xs text-slate-400 line-clamp-2">
								{item.description}
							</p>
						</div>

						<div class="mt-5 flex items-center justify-between border-t border-slate-800 pt-3">
							<a href={item.route} class="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
								Launch Live →
							</a>
							<a href="/builder?preset={item.id}" class="text-[11px] text-slate-400 hover:text-white" title="Open in Studio">
								Edit in Studio ⚡
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Feature Highlights Grid -->
	<section class="border-t border-slate-800/80 py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Core Capabilities</span>
				<h2 class="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
					Why Developers Choose json-render Svelte
				</h2>
			</div>

			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Feature 1 -->
				<div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
						🎨
					</div>
					<h3 class="mt-4 text-base font-bold text-white">Visual Drag & Drop Studio</h3>
					<p class="mt-2 text-xs leading-relaxed text-slate-400">
						Sidebar palette organized by category. Drag components straight into the canvas, reorder live with drag handles, tweak props in the inspector, and copy the ready-to-run JSON spec with one click.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
						⚡
					</div>
					<h3 class="mt-4 text-base font-bold text-white">Svelte 5 Runes Reactive Engine</h3>
					<p class="mt-2 text-xs leading-relaxed text-slate-400">
						Deeply integrated with Svelte 5 state runes ($state, $derived, $bindState). When user inputs change or actions fire, UI updates happen with sub-millisecond precision without virtual DOM overhead.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400">
						📦
					</div>
					<h3 class="mt-4 text-base font-bold text-white">Shadcn Svelte Component Suite</h3>
					<p class="mt-2 text-xs leading-relaxed text-slate-400">
						Cards, Grids, Stacks, Dialogs, Drawers, Tables, Forms, Sliders, Switches, Badges, Tabs, and Accordions. Beautiful accessible components ready to compose.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Call to Action Banner -->
	<section class="border-t border-slate-800/80 bg-gradient-to-r from-indigo-950/60 via-slate-950 to-purple-950/60 py-16">
		<div class="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
			<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
				Ready to construct your next dashboard visually?
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-xs text-slate-300 sm:text-sm">
				Launch the Drag & Drop studio, load an executive template, drag new components into the tree, and export your production JSON spec in seconds.
			</p>
			<div class="mt-6 flex justify-center gap-3">
				<a
					href="/builder"
					class="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
				>
					Launch Visual Studio Now ⚡
				</a>
				<a
					href="/dashboards/analytics"
					class="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
				>
					View Executive Analytics
				</a>
			</div>
		</div>
	</section>
</div>
