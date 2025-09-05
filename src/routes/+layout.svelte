<script lang="ts">
	import '../app.css';
	const { children, data } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		caret-color: transparent;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
	}
</style>
