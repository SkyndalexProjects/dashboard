<script lang="ts">
	import type { APIGuild as BaseAPIGuild } from 'discord-api-types/v10';
	import { writable } from 'svelte/store';

	const { data } = $props();
	interface APIGuild extends BaseAPIGuild {
		isBotAdded: boolean;
	}
	console.log('data.guilds:', data.guilds);
	const guilds: APIGuild[] = data.guilds as APIGuild[];
	const adminGuilds = guilds.filter((guild) => (guild?.permissions & 0x8) === 0x8);
	const withBotAdded = adminGuilds.filter((guild) => guild.isBotAdded);
	const withoutBotAdded = adminGuilds.filter((guild) => !guild.isBotAdded);

	function handleImageError(event: Event) {
		(event.target as HTMLImageElement).src = '/default_guild_icon.png';
	}
	const loadingGuilds = writable<string[]>([]);
	function setLoading(guildId: string) {
		loadingGuilds.update((ids) => [...ids, guildId]);
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

<section class="guilds">
	<h1 class="title">Choose guild</h1>
	{#if data}
		<div class="guilds-container">
			<div class="guilds-grid">
				{#each withBotAdded as guild (guild?.id)}
					<div class="guild">
						<img
							src={guild?.icon
								? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
								: '/icons/default_guild_icon.png'}
							alt="<no icon>"
							onerror={handleImageError}
							class="guild-icon"
						/>
						<p class="guild-name">{guild?.name}</p>
						<button
							class="guild-button"
							onclick={() => {
								setLoading(guild.id);
								window.location.href = `/dashboard/guild/${guild.id}/home`;
							}}
							disabled={$loadingGuilds.includes(guild.id)}
						>
							{#if $loadingGuilds.includes(guild.id)}
								<img src="/loading.gif" alt="Loading..." class="loading-animation" />
							{:else}
								<svg
									width="25"
									height="25"
									viewBox="0 0 25 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M23.6307 10.0295H22.3054C22.0591 9.06911 21.6746 8.16965 21.1732 7.34686L22.126 6.39193C22.3832 6.13471 22.5246 5.79157 22.5246 5.42722C22.5246 5.06341 22.3821 4.71972 22.126 4.46304L20.538 2.87675C20.0231 2.36122 19.1231 2.36176 18.6102 2.87621L17.6172 3.86322C16.8037 3.38902 15.9314 3.02358 14.9705 2.78865V1.3704C14.9705 0.618311 14.3696 0 13.6175 0H11.3727C10.6206 0 10.0289 0.618311 10.0289 1.3704V2.78811C9.06856 3.02249 8.19086 3.38848 7.37623 3.86322L6.38378 2.87621C5.86933 2.36068 4.96879 2.36122 4.45271 2.87566L2.86588 4.46196C2.61137 4.71591 2.46618 5.06721 2.46618 5.42613C2.46618 5.78994 2.60702 6.13254 2.86479 6.38976L3.81754 7.34686C3.31669 8.16965 2.93168 9.06911 2.68587 10.0295H1.36007C0.607435 10.0295 0 10.6342 0 11.3846V13.6279C0 14.3805 0.607435 14.9716 1.36007 14.9716H2.68587C2.93168 15.932 3.31615 16.8369 3.81645 17.6597L2.8637 18.6184C2.60593 18.8756 2.46454 19.2199 2.46454 19.5842C2.46454 19.9486 2.60648 20.2928 2.8637 20.55L4.45162 22.1374C4.70939 22.3946 5.05144 22.536 5.41525 22.536C5.77906 22.536 6.12166 22.3941 6.37943 22.1374L7.37623 21.1498C8.19086 21.6246 9.06856 21.99 10.0289 22.2255V23.6416C10.0289 24.3937 10.6206 25 11.3727 25H13.6175C14.3696 25 14.9705 24.3937 14.9705 23.6416V22.2249C15.9314 21.99 16.8037 21.6246 17.6183 21.1498L18.6064 22.1352C18.8642 22.3935 19.2068 22.5349 19.5717 22.5349C19.9361 22.5349 20.2792 22.393 20.5364 22.1363L22.1243 20.55C22.3816 20.2933 22.5224 19.9502 22.5235 19.5864C22.5235 19.222 22.381 18.88 22.1243 18.6222L21.1727 17.6597C21.673 16.8363 22.0574 15.9309 22.3038 14.9716H23.6296C24.3817 14.9716 25 14.3805 25 13.6279V11.3846C25.0005 10.6342 24.3828 10.0295 23.6307 10.0295ZM12.4946 16.7765C10.1138 16.7765 8.18324 14.8639 8.18324 12.5065C8.18324 10.1475 10.1138 8.23762 12.4946 8.23762C14.8759 8.23762 16.8075 10.1475 16.8075 12.5065C16.807 14.8645 14.8759 16.7765 12.4946 16.7765Z"
										fill="currentColor"
									/>
								</svg>
								SET
							{/if}
						</button>
					</div>
				{/each}
				{#each withoutBotAdded as guild (guild?.id)}
					<div class="guild">
						<img
							src={guild?.icon
								? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
								: '/icons/default_guild_icon.png'}
							alt="<no icon>"
							onerror={handleImageError}
							class="guild-icon"
						/>
						<p class="guild-name">{guild?.name}</p>
						<a href={`/invite/${guild?.id}`} class="guild-button">
							<svg
								width="19"
								height="19"
								viewBox="0 0 19 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M6.26001 2.08301C6.26001 1.53101 6.47 1.00099 6.87 0.609985C7.25999 0.218985 7.78997 0 8.33997 0H10.42C10.97 0 11.5 0.218985 11.89 0.609985C12.29 1.00099 12.5 1.53101 12.5 2.08301V6.25H16.67C17.22 6.25 17.75 6.46899 18.14 6.85999C18.54 7.25099 18.76 7.78101 18.76 8.33301V10.417C18.76 10.969 18.54 11.499 18.14 11.89C17.75 12.281 17.22 12.5 16.67 12.5H12.5V16.667C12.5 17.219 12.29 17.749 11.89 18.14C11.5 18.531 10.97 18.75 10.42 18.75H8.33997C7.78997 18.75 7.25999 18.531 6.87 18.14C6.47 17.749 6.26001 17.219 6.26001 16.667V12.5H2.08997C1.53997 12.5 1.01 12.281 0.619995 11.89C0.219995 11.499 0 10.969 0 10.417V8.33301C0 7.78101 0.219995 7.25099 0.619995 6.85999C1.01 6.46899 1.53997 6.25 2.08997 6.25H6.26001V2.08301Z"
									fill="#1974E6"
								/>
							</svg>
							INVITE
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	a {
		gap: 5px;
	}
	button {
		all: unset;
		cursor: pointer;
	}
	.guilds {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		text-align: center;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
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
	.guild {
		color: white;
		background-color: rgba(217, 217, 217, 0.1);
		border-radius: 25px;
		padding: 20px;
		justify-content: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transition: box-shadow 0.3s ease-in-out;
		text-decoration: none;
		text-align: center;
		width: 220px;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.guild-icon {
		width: 170px;
		height: 170px;
		border-radius: 25px;
	}
	.guild-name {
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 32px;
		font-weight: 700;
	}
	.guilds-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 50px;
		justify-items: center;
		justify-content: center;
		width: 100%;
		max-width: 1200px;
	}
	.guilds-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
	}
	.guild-button {
		width: 170px;
		height: 40px;
		flex-shrink: 0;
		margin-top: auto;
		border-radius: 10px;
		background-color: #ebf2ff;
		color: #1974e6;
		text-align: center;
		font:
			700 20px 'Be Vietnam Pro',
			sans-serif;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
		gap: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
	}
	.loading-animation {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
	.guild-button:hover {
		background-color: #1974e6;
		color: #ebf2ff;
	}
</style>
