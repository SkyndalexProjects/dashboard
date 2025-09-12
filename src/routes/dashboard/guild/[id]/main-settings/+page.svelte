<script lang="ts">
	import { page } from '$app/state';
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import geti18ncontext from '$lib/i18n';
	const i18n = geti18ncontext();

	const guildId = page.params.id;
	console.log('guildId', guildId);
	const { data } = $props();
	import Alert from '$lib/components/ui/alert.svelte';
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

<div class="alert">
	<Alert type="warning">{$i18n.t('system.errors.not_finished')}</Alert>
</div>

<style>
	.alert {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		top: 100px;
		z-index: 100;
		left: 400px;
	}
</style>
