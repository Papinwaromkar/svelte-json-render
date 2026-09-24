<script lang="ts">
	import DashboardShell from '$lib/components/DashboardShell.svelte';
	import { crmSpec } from '$lib/dashboards/crmSpec.js';
</script>

<svelte:head>
	<title>Sales Pipeline & CRM Dashboard — json-render Svelte</title>
</svelte:head>

<DashboardShell
	spec={crmSpec}
	title="Sales Pipeline & CRM"
	description="Track enterprise deals, qualified leads, and account executive stage progression."
	category="Revenue Operations"
	dashboardId="crm"
/>
