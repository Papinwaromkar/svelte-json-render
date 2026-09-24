<script lang="ts">
	import DashboardShell from '$lib/components/DashboardShell.svelte';
	import { ecommerceSpec } from '$lib/dashboards/ecommerceSpec.js';
</script>

<svelte:head>
	<title>Store Operations & Fulfillment Dashboard — json-render Svelte</title>
</svelte:head>

<DashboardShell
	spec={ecommerceSpec}
	title="Store Operations & Fulfillment"
	description="Real-time order throughput, inventory levels, logistics velocity, and customer transactions."
	category="Operations"
	dashboardId="ecommerce"
/>
