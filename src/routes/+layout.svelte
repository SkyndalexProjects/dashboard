<script lang="ts">
	import '../app.css';
	const { children, data } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
