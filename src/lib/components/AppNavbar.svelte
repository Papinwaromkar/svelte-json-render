<script lang="ts">
	import { page } from '$app/state';

	let isMobileMenuOpen = $state(false);

	const links = [
		{ href: '/', label: 'Overview' },
		{ href: '/dashboards', label: 'Dashboards' },
		{ href: '/builder', label: 'Drag & Drop Studio' },
		{ href: '/gallery', label: 'Component Gallery' }
	];

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Brand & Logo -->
		<div class="flex items-center gap-8">
			<a href="/" class="group flex items-center gap-2.5 transition">
				<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/25 transition group-hover:scale-105">
					<span class="text-base font-black text-white">⚡</span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-bold tracking-tight text-white group-hover:text-indigo-200 transition">
						json-render <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Svelte</span>
					</span>
					<span class="text-[10px] font-mono text-slate-400">Svelte 5 • shadcn • Declarative UI</span>
				</div>
			</a>

			<!-- Desktop Nav Links -->
			<nav class="hidden md:flex items-center gap-1">
				{#each links as link}
					<a
						href={link.href}
						class="rounded-lg px-3 py-1.5 text-xs font-medium transition {isActive(link.href) ? 'bg-indigo-600/15 text-indigo-400 font-semibold ring-1 ring-indigo-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right Action Buttons -->
		<div class="hidden sm:flex items-center gap-3">
			<div class="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400">
				<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
				<span class="font-mono">v0.21.0</span>
			</div>

			<a
				href="/builder"
				class="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:from-indigo-500 hover:to-indigo-400 active:scale-95"
			>
				<span>Open Studio</span>
				<span>⚡</span>
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<div class="flex sm:hidden">
			<button
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-white"
				aria-label="Toggle Navigation Menu"
			>
				{#if isMobileMenuOpen}✕{:else}☰{/if}
			</button>
		</div>
	</div>

	<!-- Mobile dropdown -->
	{#if isMobileMenuOpen}
		<div class="border-b border-slate-800 bg-slate-950 px-4 py-3 sm:hidden space-y-1">
			{#each links as link}
				<a
					href={link.href}
					onclick={() => (isMobileMenuOpen = false)}
					class="block rounded-lg px-3 py-2 text-sm font-medium transition {isActive(link.href) ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}"
				>
					{link.label}
				</a>
			{/each}
			<div class="pt-2">
				<a
					href="/builder"
					onclick={() => (isMobileMenuOpen = false)}
					class="block w-full text-center rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white"
				>
					Open Drag & Drop Studio ⚡
				</a>
			</div>
		</div>
	{/if}
</header>
