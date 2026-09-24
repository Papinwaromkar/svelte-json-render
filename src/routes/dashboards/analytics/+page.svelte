<script lang="ts">
	import DashboardShell from '$lib/components/DashboardShell.svelte';
	import { analyticsSpec } from '$lib/dashboards/analyticsSpec.js';
</script>

<svelte:head>
	<title>Executive Analytics Dashboard — json-render Svelte</title>
</svelte:head>

<DashboardShell
	spec={analyticsSpec}
	title="Executive Analytics"
	description="Real-time performance telemetry, growth metrics, and customer acquisition channels."
	category="Business Intelligence"
	dashboardId="analytics"
/>
