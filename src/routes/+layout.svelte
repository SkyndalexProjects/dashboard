<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import getI18nStore from "../i18n"
	import { setContext } from "svelte";

	setContext('i18n', getI18nStore())
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
