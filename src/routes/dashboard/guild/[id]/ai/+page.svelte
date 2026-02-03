<script lang="ts">
	import { page } from '$app/state';
	import geti18ncontext from '$lib/i18n';
	const i18n = geti18ncontext();

	const guildId = page.params.id;
	console.log('guildId', guildId);
	const { data } = $props();
</script>

<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#await data.guilds}
	<p>Test</p>
{/await}

<style>
</style>
