<script lang="ts">
	import type { APIGuild, APIUser } from 'discord-api-types/v10';

	const { user, selectedGuild } = $props();

	function getGuildAvatarUrl(guild: APIGuild): string {
		return guild?.id && guild?.icon
			? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
	}

	function getAvatarUrl(user: APIUser): string | undefined {
		return user?.id && user?.avatar
			? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`
			: undefined;
	}

	function handleLogin(): void {
		window.location.href = 'http://localhost:3000';
	}
	console.log('data', user);
</script>

<nav>
	<div class="left-corner">
		<img
			class="icon"
			src={`https://cdn.discordapp.com/avatars/1059594156839809074/f2ed3c7590d834ed2d86912124c4ee1e.webp?size=1024`}
			alt="Guild Icon"
		/>
		Dashboard

		<div class="version">v0.0.1-experimental</div>

		<div class="guild-selector">
			<img
				src={getGuildAvatarUrl(selectedGuild)}
				alt={selectedGuild?.name || 'Avatar'}
				class="guild-icon"
			/>
			{selectedGuild.name}
		</div>
	</div>
	<div class="right-corner">
		<button class="dashboard-redirect" onclick={handleLogin}>
			{#if user?.username}
				<img src={getAvatarUrl(user)} alt={user?.username || 'Avatar'} class="login-icon" />
				{user?.username}
			{:else}
				<img src="/icons/login.svg" alt="login" class="login-icon" />
				Login
			{/if}
		</button>
	</div>
</nav>

<style>
	nav {
		caret-color: transparent;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 90px;
		position: fixed;
		overflow: visible;
		flex-wrap: wrap;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 1000;
	}
	.left-corner {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 40px;
		gap: 10px;
		color: #fff;
		font-family: '--font-vietnam', sans-serif;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
	.right-corner {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		margin-right: 30px;
	}
	.icon {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		transition: transform 0.3s ease;
	}
	.version {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 4px 4px 6px 6px;
		color: #fff;
		font-family: '--font-vietnam', sans-serif;
		font-size: 14px;
		font-style: normal;
		font-weight: 800;
		line-height: normal;
		width: max-content;
		min-height: 26px;
		height: auto;
		flex-shrink: 0;
		border-radius: 5px;
		background: #3e6bff;
	}
	.guild-selector {
		gap: 15px;
		margin-left: 60px;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: max-content;
		padding-right: 20px;
		height: 56px;
		flex-shrink: 0;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.3);
	}
	.guild-icon {
		padding-left: 15px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	.login-icon {
		border-radius: 50%;
		width: 30px;
		height: 30px;
	}
	.dashboard-redirect {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.26);
		width: 190px;
		height: 64px;
		color: #667398;
		text-align: center;
		font:
			600 24px / normal 'Be Vietnam Pro',
			sans-serif;
		cursor: pointer;
		z-index: 2;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
	}
	.dashboard-redirect:hover {
		background-color: rgba(0, 0, 0, 0.5);
		transform: scale(1.05);
	}
	button {
		background: transparent;
		border: none;
		outline: none;
	}
</style>
