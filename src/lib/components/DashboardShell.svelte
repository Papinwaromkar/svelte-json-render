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

	interface Props {
		spec: Spec;
		title: string;
		description: string;
		category: string;
		dashboardId: string;
	}

	const { spec, title, description, category, dashboardId }: Props = $props();

	let showJsonSpec = $state(false);
	let copied = $state(false);
	let notification = $state<string | null>(null);

	function showNotification(msg: string) {
		notification = msg;
		setTimeout(() => {
			if (notification === msg) {
				notification = null;
			}
		}, 3500);
	}

	function copySpec() {
		navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
		copied = true;
		setTimeout(() => (copied = false), 2000);
		showNotification('JSON Spec copied to clipboard!');
	}

	const actionHandlers = {
		exportData: async () => {
			showNotification('Telemetry CSV data generated and dispatched to download queue.');
		},
		refreshMetrics: async () => {
			showNotification('Metrics synchronizer triggered — live telemetry refreshed.');
		},
		openNewLeadModal: async () => {
			showNotification('New Lead intake workflow initiated.');
		},
		viewForecast: async () => {
			showNotification('Quarterly pipeline predictive forecast model computed.');
		},
		submitLead: async () => {
			showNotification('Lead successfully added to CRM queue and assigned to SDR.');
		},
		printLabels: async () => {
			showNotification('Batch shipping labels queued for thermal label printer.');
		},
		exportInvoices: async () => {
			showNotification('Financial invoices compilation exported to PDF archive.');
		},
		saveSettings: async () => {
			showNotification('Workspace settings and developer policies saved successfully.');
		},
		revokeSessions: async () => {
			showNotification('All active CLI session tokens have been invalidated.');
		},
		deleteOrg: async () => {
			showNotification('Warning: Organization deletion requires master authorization.');
		}
	};
</script>

<div class="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
	<!-- Toast Notification Banner -->
	{#if notification}
		<div class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-indigo-500/40 bg-slate-900/95 px-4 py-3 text-xs text-white shadow-2xl shadow-indigo-500/20 backdrop-blur animate-in fade-in slide-in-from-bottom-3 duration-200">
			<span class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold">✓</span>
			<span>{notification}</span>
			<button onclick={() => (notification = null)} class="ml-2 text-slate-400 hover:text-white">✕</button>
		</div>
	{/if}

	<!-- Top Control Ribbon -->
	<div class="border-b border-slate-800/80 bg-slate-900/40 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
			<!-- Breadcrumbs -->
			<div class="flex items-center gap-2 text-xs text-slate-400">
				<a href="/" class="hover:text-white transition">Home</a>
				<span>/</span>
				<a href="/dashboards" class="hover:text-white transition">Dashboards</a>
				<span>/</span>
				<span class="rounded bg-slate-800/80 px-2 py-0.5 font-medium text-slate-200">{category}</span>
			</div>

			<!-- Dashboard Controls -->
			<div class="flex items-center gap-2">
				<button
					onclick={() => (showJsonSpec = !showJsonSpec)}
					class="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
				>
					{showJsonSpec ? 'Hide Spec JSON' : '{ } View JSON Spec'}
				</button>
				<button
					onclick={copySpec}
					class="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
				>
					{#if copied}✓ Copied{:else}📋 Copy Spec{/if}
				</button>
				<a
					href="/builder?preset={dashboardId}"
					class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95"
				>
					<span>Edit in Studio</span>
					<span>⚡</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Collapsible JSON Spec drawer -->
	{#if showJsonSpec}
		<div class="border-b border-slate-800 bg-slate-900/90 px-4 py-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<div class="flex items-center justify-between pb-2">
					<div class="flex items-center gap-2">
						<span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Declarative JSON Spec</span>
						<span class="text-[10px] text-slate-500 font-mono">Rendered dynamically with @json-render/svelte</span>
					</div>
					<button onclick={() => (showJsonSpec = false)} class="text-xs text-slate-400 hover:text-white">Close ✕</button>
				</div>
				<pre class="max-h-72 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-[11px] font-mono leading-relaxed text-emerald-400">{JSON.stringify(spec, null, 2)}</pre>
			</div>
		</div>
	{/if}

	<!-- Main Rendered Content Area -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<StateProvider initialState={spec.state ?? {}}>
			<ActionProvider handlers={actionHandlers}>
				<VisibilityProvider>
					<ValidationProvider>
						<Renderer {spec} {registry} />
					</ValidationProvider>
				</VisibilityProvider>
			</ActionProvider>
		</StateProvider>
	</main>
</div>
