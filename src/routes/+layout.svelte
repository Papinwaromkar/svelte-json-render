<script lang="ts">
	import './layout.css';
	import AppNavbar from '$lib/components/AppNavbar.svelte';
	import AppFooter from '$lib/components/AppFooter.svelte';
	import { page } from '$app/state';

	const { children } = $props();

	let isBuilder = $derived(page.url.pathname.startsWith('/builder'));
</script>

{#if isBuilder}
	{@render children()}
{:else}
	<div class="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
		<AppNavbar />
		<div class="flex-1">
			{@render children()}
		</div>
		<AppFooter />
	</div>
{/if}
