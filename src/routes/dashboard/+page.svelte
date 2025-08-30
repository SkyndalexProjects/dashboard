<script>
	import { userStore } from '$lib/userStore.svelte';
</script>

{#if $userStore}
	<h1>{$userStore.username}</h1>
{/if}
