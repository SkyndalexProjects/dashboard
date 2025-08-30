<script lang="ts">
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import { userStore } from '$lib/userStore.svelte';
	import getI18nStore from '../i18n';
	let { children } = $props();
	setContext('i18n', getI18nStore());
	onMount(async () => {
		try {
			const res = await fetch(`http://localhost:3000/api/user`, {
				credentials: 'include'
			});

			const userData = await res.json();
			userStore.set(userData);
		} catch (error) {
			console.error('Error while adding user to store', error);
			userStore.set(null);
		}
	});
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
