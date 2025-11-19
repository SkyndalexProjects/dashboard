<script lang="ts">
	import geti18ncontext from '$lib/i18n';
	const i18n = geti18ncontext();

	const { data } = $props();
	import Alert from '$lib/components/ui/Alert.svelte';
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
{:then guilds}
	<div class="alert">
		<Alert type="warning">{$i18n.t('system.errors.not_finished')}</Alert>
	</div>
{/await}

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
