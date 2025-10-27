<script lang="ts">
	import type { APIGuild, APIUser } from 'discord-api-types/v10';
	import getI18nStore from '$lib/i18n';
	const i18n = getI18nStore();
	import Modal from '../ui/Modal.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import { authClient } from '$lib/auth-client';
	let showModal = $state(false);
	const { user, guild, guilds } = $props();

	const adminGuilds = (guilds as (APIGuild & { isBotAdded?: boolean })[]).filter(
		(guild) => (Number(guild?.permissions) & 0x8) === 0x8 && guild.isBotAdded === true
	);

	console.log('adminGuilds:', adminGuilds);
	function getGuildAvatarUrl(guild: APIGuild): string {
		return guild?.id && guild?.icon
			? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
	}

	function getAvatarUrl(user: APIUser): string {
		return user?.id && user?.avatar
			? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
	}

	async function handleLogout() {
		await authClient.signOut();

		window.location.href = '/';
	}
</script>

<nav>
	<div class="left-corner">
		<img
			class="icon"
			src={`https://cdn.discordapp.com/avatars/1059594156839809074/f2ed3c7590d834ed2d86912124c4ee1e.webp?size=1024`}
			alt="Guild Icon"
		/>
		{$i18n.t('system.navbar.title')}

		<div class="version">v0.0.1-experimental</div>

		<Dropdown>
			{#snippet trigger()}
				<button class="guild-selector">
					<img src={getGuildAvatarUrl(guild)} alt={guild?.name || 'Avatar'} class="guild-icon" />
					{guild?.name}
				</button>
			{/snippet}

			{#snippet items()}
				{#each adminGuilds as adminGuild}
					<a href={`/manage/${adminGuild.id}`} class="guild-item">
						<img
							src={getGuildAvatarUrl(adminGuild)}
							alt={adminGuild?.name || 'Avatar'}
							class="guild-icon"
						/>
						<span>{adminGuild?.name}</span>
					</a>
				{/each}
			{/snippet}
		</Dropdown>
	</div>
	<div class="right-corner">
		<Dropdown>
			{#snippet trigger()}
				<button class="dashboard-redirect">
					<img src={getAvatarUrl(user)} alt={user?.username || 'Avatar'} class="login-icon" />
					<span class="username">{user?.username}</span>
				</button>
			{/snippet}

			{#snippet items()}
				<button class="dropdown-item logout" onclick={handleLogout}> Logout </button>
			{/snippet}
		</Dropdown>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		caret-color: transparent;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 90px;
		overflow: visible;
		flex-wrap: wrap;
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		user-select: none;
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
		display: inline-flex;
		margin-left: 50px;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: max-content;
		padding-right: 20px;
		height: 56px;
		flex-shrink: 0;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.3);
		color: #ffffff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		cursor: pointer;
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
		background: rgba(0, 0, 0, 0.3);
		width: max-content;
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

	.dropdown-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		left: 0.5rem;
		justify-content: flex-start;
		gap: 12px;
		width: 100%;
		height: 50px;
		padding: 10px;
		color: #ffffff;
		font-family: 'Be Vietnam Pro', sans-serif;
		background-color: #131313;
		font-size: 15px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		border-radius: 3px;
		margin-top: 10px;
		transition: background-color 0.2s ease;
	}
	.guild-item {
		z-index: 100000;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 12px;
		width: 100%;
		max-width: 100%;
		height: 50px;
		margin-left: 50px;
		color: #ffffff;
		background-color: #131313;
		border-radius: 5px;
		border: 1px solid rgba(44, 44, 44, 0.2);
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 15px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		margin-top: 5px;
		text-decoration: none;
	}
	.dropdown-item:hover {
		background-color: #5f87eaff;
	}
	.guild-item:hover {
		background-color: #5f87eaff;
	}

	.dropdown-item.logout {
		color: #ff6b6b;
	}

	.dropdown-item.logout:hover {
		background-color: rgb(27, 27, 27);
	}
</style>
