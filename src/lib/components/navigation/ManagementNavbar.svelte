<script lang="ts">
	import type { APIGuild, APIUser } from 'discord-api-types/v10';
	import getI18nStore from '$lib/i18n';
	const i18n = getI18nStore();
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import { authClient } from '$lib/auth-client';
	let showDropdown = $state(false);
	const { user, guild, guilds } = $props();

	const adminGuilds = (guilds as (APIGuild & { isBotAdded?: boolean })[]).filter(
		(guild) => (Number(guild?.permissions) & 0x8) === 0x8 && guild.isBotAdded === true
	);

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
			src="https://cdn.discordapp.com/avatars/1059594156839809074/f2ed3c7590d834ed2d86912124c4ee1e.webp?size=1024"
			alt="Guild Icon"
		/>
		{$i18n.t('system.navbar.title')}

		<div class="version">v0.0.0-alpha</div>

		<div class="guild-dropdown">
			<Dropdown>
				{#snippet trigger()}
					<button class="guild-selector">
						<img src={getGuildAvatarUrl(guild)} alt={guild?.name || 'Avatar'} class="guild-icon" />
						{guild?.name}
						<img
							src="/icons/indicator.svg"
							alt="indicator"
							class="indicator"
							class:rotated={showDropdown}
						/>
					</button>
				{/snippet}

				{#snippet items()}
					{#each adminGuilds as adminGuild (adminGuild.id)}
						<a href={`/dashboard/guild/${adminGuild.id}/home`} class="guild-item">
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
	</div>
	<div class="right-corner">
		<Dropdown>
			{#snippet trigger()}
				<button class="dashboard-redirect">
					<img src={getAvatarUrl(user)} alt={user?.username || 'Avatar'} class="login-icon" />
					<span class="username">{user?.username}</span>
					<img
						src="/icons/indicator.svg"
						alt="indicator"
						class="indicator"
						class:rotated={showDropdown}
					/>
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
		display: flex;
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
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
	}
	.guild-selector:hover {
		transform: scale(1.05);
	}
	.guild-icon {
		margin-left: 15px;
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
		transition: background-color 0.2s ease;
	}
	.guild-dropdown :global(.dropdown-menu) {
		left: 50px;
		width: calc(100% - 50px);
	}
	.guild-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		left: 0.5rem;
		justify-content: flex-start;
		gap: 15px;
		background-color: #0f1117;
		width: calc(100% + 100px);
		height: 40px;
		text-align: left;
		color: #ffffff;
		font-family: 'Poppins', sans-serif;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		text-decoration: none;
		transition: background-color 0.2s ease;
		text-wrap: nowrap;
		padding: 10px;
	}

	.guild-item:first-of-type {
		border-radius: 15px 15px 0 0;
	}

	.guild-item:last-of-type {
		border-radius: 0 0 15px 15px;
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
	.indicator {
		transition: transform 0.25s ease;
		transform-origin: center;
		display: inline-block;
	}
	.rotated {
		transform: rotate(180deg);
	}
</style>
