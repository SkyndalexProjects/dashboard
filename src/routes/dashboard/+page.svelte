<script>
	import Navbar from '$lib/components/navbar.svelte';

	const { data } = $props();

	console.log('data', data);

	const withBotAdded = data.guilds.filter(
		(guild) => (BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) && guild.isBotAdded
	);
	const withoutBotAdded = data.guilds.filter(
		(guild) => (BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) && !guild.isBotAdded
	);

	console.log('withBotAdded', withBotAdded);
	console.log('withoutBotAdded', withoutBotAdded);
	function handleImageError(event) {
		event.target.src = '/default_guild_icon.png';
	}
</script>

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
		<!--{#if data}-->
		<!--	<div class="guilds-container">-->
		<!--		<div class="guilds-grid">-->
		<!--			{#each withBotAdded as guild (guild?.id)}-->
		<!--				<div class="guild">-->
		<!--					<img-->
		<!--							src={guild?.icon-->
		<!--? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`-->
		<!--: "/default_guild_icon.png"}-->
		<!--							alt="<no icon>"-->
		<!--							onerror={handleImageError}-->
		<!--							class="guild-icon"-->
		<!--					/>-->
		<!--					<p class="guild-name">{guild?.name}</p>-->
		<!--					<a href={`/dashboard/guild/${guild?.id}/home`} class="guild-button">-->
		<!--						<img src="/gear.svg" alt="gear icon" />-->
		<!--						{data.user.username}-->
		<!--					</a>-->
		<!--				</div>-->
		<!--			{/each}-->
		<!--		</div>-->
		<!--	</div>-->
		<!--{/if}-->
	</section>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		caret-color: transparent;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
	}
	.title {
		color: #fff;
		text-align: center;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 64px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
</style>
