<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="app">
	<section class="guilds">
		<h1 class="title">Choose guild</h1>
	</section>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		caret-color: transparent;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
		align-items: center;
		justify-content: center;
	}
</style>
