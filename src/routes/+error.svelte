<script lang="ts">
	import { page } from '$app/state';
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	const guildId = page.params.id;
	const { data } = $props();

	const selectedGuild = data.guilds?.find((g: { id: string }) => g.id === guildId);
</script>

<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<ManagementNavbar {selectedGuild} user={data.user} />
<Sidebar guildId={selectedGuild.id} />
<alert type="error" message="404: Not found"></alert>

<style>
</style>
