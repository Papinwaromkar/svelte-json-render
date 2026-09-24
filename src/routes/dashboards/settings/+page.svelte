<script lang="ts">
	import DashboardShell from '$lib/components/DashboardShell.svelte';
	import { settingsSpec } from '$lib/dashboards/settingsSpec.js';
</script>

<svelte:head>
	<title>Workspace Settings & Profile — json-render Svelte</title>
</svelte:head>

<DashboardShell
	spec={settingsSpec}
	title="Workspace Settings & Profile"
	description="Manage developer credentials, team permissions, security preferences, and cloud resource quotas."
	category="Administration"
	dashboardId="settings"
/>
