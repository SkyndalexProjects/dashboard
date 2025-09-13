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
		z-index: -1;
	}

	:global([data-slot='chart'] .lc-text-svg) {
		overflow: visible;
	}


	:global([data-slot='chart'] .lc-rule-y-line:not(.lc-grid-y-rule)) {
		stroke-width: 1;
	}
</style>
