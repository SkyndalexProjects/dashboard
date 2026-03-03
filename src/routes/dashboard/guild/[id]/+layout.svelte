<script lang="ts">
	import { page } from '$app/state';
	import getI18nStore from '$lib/i18n';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import type { APIGuild } from 'discord-api-types/v10';
	const { children, data } = $props();
	let isDropdownOpen = $state(false);

	const i18n = getI18nStore();
	interface SidebarItemProps {
		path: string;
		icon: string;
		text: string;
		hasSwitch?: boolean;
		switchActive?: boolean;
		additionalPaths?: string[];
	}

	function getGuildAvatarUrl(guild: APIGuild): string {
		return guild?.id && guild?.icon
			? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
	}

	function isItemActive(item: SidebarItemProps) {
		if (item.path === page.url.pathname) return true;
		return !!(item.additionalPaths && item.additionalPaths.includes(page.url.pathname));
	}
	async function handleItemClick(item: SidebarItemProps, event?: MouseEvent) {
		event?.preventDefault();
		window.location.href = item.path;
	}

	const overviewItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${data.guildId}/home`,
			icon: '/icons/sidebar/home.svg',
			text: $i18n.t('system.sidebar.home'),
			hasSwitch: false,
			switchActive: false
		}
	];

	const managementItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${data.guildId}/main-settings`,
			icon: '/icons/sidebar/gear-icon.svg',
			text: $i18n.t('system.sidebar.main-settings'),
			hasSwitch: false,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${data.guildId}/logs`,
			icon: '/icons/sidebar/log.svg',
			text: $i18n.t('system.sidebar.logs'),
			hasSwitch: true,
			switchActive: false
		}
		// {
		// 	path: `/dashboard/guild/${data.guildId}/custombots`,
		// 	icon: '/icons/sidebar/custombot.svg',
		// 	text: $i18n.t('system.sidebar.custombots'),
		// 	hasSwitch: true,
		// 	switchActive: false,
		// 	additionalPaths: [
		// 		`/dashboard/guild/${data.guildId}/custombots/list`,
		// 		`/dashboard/guild/${data.guildId}/custombots/manage/0`
		// 	]
		// }
	];

	const funItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${data.guildId}/economy`,
			icon: '/icons/sidebar/economy.svg',
			text: $i18n.t('system.sidebar.economy'),
			hasSwitch: true,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${data.guildId}/radio`,
			icon: '/icons/sidebar/radio.svg',
			text: $i18n.t('system.sidebar.radio'),
			hasSwitch: true,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${data.guildId}/ai`,
			icon: '/icons/sidebar/sparkles.svg',
			text: $i18n.t('system.sidebar.ai'),
			hasSwitch: true,
			switchActive: false
		}
	];

	const categories = [
		{ name: $i18n.t('system.sidebar.overview'), items: overviewItems },
		{ name: $i18n.t('system.sidebar.management'), items: managementItems },
		{ name: $i18n.t('system.sidebar.fun'), items: funItems }
	];
	let adminGuilds: (APIGuild & { isBotAdded?: boolean })[] = $state([]);
	$effect(() => {
		data.guilds.then((guilds) => {
			adminGuilds = (guilds as (APIGuild & { isBotAdded?: boolean })[]).filter(
				(guild) => (Number(guild?.permissions) & 0x8) === 0x8 && guild.isBotAdded === true
			);
		});
	});
</script>

<div class="layout-wrapper">
	<div class="sidebar">
		{#await data.guilds}
			<div class="guild-selector-skeleton">
				<div class="skeleton-icon"></div>
				<div class="skeleton-text"></div>
				<div class="skeleton-indicator"></div>
			</div>
		{:then guilds}
			<div class="guild-selector">
				<Dropdown bind:isOpen={isDropdownOpen}>
					{#snippet trigger()}
						<button class="guild-selector">
							<img
								src={getGuildAvatarUrl(data.guild)}
								alt={data.guild?.name || 'Avatar'}
								class="guild-icon"
							/>
							{data.guild?.name}
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
		{/await}
		{#each categories as category (category.name)}
			<svg
				width="100%"
				height="1"
				viewBox="0 0 383 1"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="divider"
			>
				<path d="M0 0.5H383" stroke="white" stroke-opacity="0.1" />
			</svg>

			<span class="category">{category.name.toUpperCase()}</span>
			{#each category.items as item (item.path)}
				<button class="item" onclick={() => handleItemClick(item)}>
					<span class:item-active={isItemActive(item)} class:item-inactive={!isItemActive(item)}>
						<img src={item.icon} class="icon" alt={item.text} />
						<span class="item-text">{item.text}</span>
						{#if item.hasSwitch}
							<div class="switches">
								<Switch active={isItemActive(item)} />
							</div>
						{/if}
					</span>
				</button>
			{/each}
		{/each}
	</div>
	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.layout-wrapper {
		display: flex;
		min-height: 100vh;
		padding-top: 90px;
	}

	.sidebar {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		width: 450px;
		max-width: 450px;
		height: calc(100vh - 90px);
		top: 90px;
		background: rgba(0, 0, 0, 0.4);
		padding-top: 50px;
		border-right: 1px solid rgba(255, 255, 255, 0.3);
		user-select: none;
		z-index: 100;
		left: 0;
		overflow-y: auto;
		overflow-x: hidden;
		will-change: auto;
	}

	.content {
		flex: 1;
		margin-left: 450px;
		padding: 50px;
		box-sizing: border-box;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		min-width: 0;
		width: calc(100% - 450px);
	}

	.guild-selector {
		all: unset;
		gap: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 383px;
		height: 48px;
		flex-shrink: 0;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
		z-index: 2000;
	}
	.guild-icon {
		margin-left: 15px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: block;
	}
	.guild-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		left: 0.5rem;
		justify-content: flex-start;
		gap: 15px;
		background-color: #0a0a0c;
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
	.guild-item:hover {
		background-color: #5f87eaff;
	}

	.guild-item:first-of-type {
		border-radius: 15px 15px 0 0;
	}

	.guild-item:last-of-type {
		border-radius: 0 0 15px 15px;
	}
	.switches {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		right: 25px;
	}
	.divider {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-top: 20px;
	}
	.category {
		all: unset;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-left: 60px;
		color: rgba(255, 255, 255, 0.6);
		font:
			700 14px / normal 'Poppins',
			sans-serif;
		cursor: pointer;
		transition: color 0.2s ease;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.item:hover {
		border-left: 10px solid #275ee7;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0%, rgba(24, 28, 38, 0.5) 100%);
		transition:
			background-color 0.5s ease,
			border-left-color 0.5s ease;
		cursor: pointer;
	}
	.item-active {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 369px;
		height: 50px;
		flex-shrink: 0;
		border-left: 10px solid #275ee7;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0%, rgba(24, 28, 38, 0.15) 116.26%);
		gap: 15px;
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		cursor: pointer;
		margin-right: 30px;
	}
	.item {
		all: unset;
	}
	.icon {
		width: 18px;
		height: 18px;
		display: inline-block;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.item-inactive {
		display: flex;
		background: transparent;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 369px;
		height: 50px;
		flex-shrink: 0;
		border-radius: 0 20px 20px 0;
		color: rgba(255, 255, 255, 0.5);
		text-align: center;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		gap: 15px;
		margin-right: 30px;
	}
	.guild-selector-skeleton {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 383px;
		height: 48px;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.3);
		gap: 15px;
		padding: 0 15px;
		min-height: 48px;
	}

	.skeleton-icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		flex-shrink: 0;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1) 25%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 75%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
	}

	.skeleton-text {
		flex: 1;
		height: 16px;
		border-radius: 4px;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1) 25%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 75%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
	}

	.skeleton-indicator {
		width: 12px;
		height: 12px;
		flex-shrink: 0;
		border-radius: 2px;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1) 25%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 75%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (max-width: 768px) {
		.layout-wrapper {
			padding-top: 90px;
		}

		.sidebar {
			width: 80px;
			max-width: 80px;
			padding-top: 20px;
			align-items: center;
		}

		.content {
			margin-left: 80px;
			padding-left: 20px;
			padding-right: 20px;
			width: calc(100% - 80px);
		}

		.guild-selector {
			width: 60px;
			height: 60px;
			justify-content: center;
			padding: 0;
			font-size: 0;
		}
		.guild-icon {
			display: block;
			margin: 0 auto;
			object-fit: cover;
			width: 40px;
			height: 40px;
		}

		.guild-selector-skeleton {
			width: 60px;
			height: 60px;
			justify-content: center;
			padding: 0;
			min-height: 60px;
		}

		.skeleton-icon {
			width: 40px;
			height: 40px;
		}

		.category {
			display: none;
		}

		.divider {
			width: 60px;
			padding-top: 10px;
		}

		.item-active,
		.item-inactive {
			width: 60px;
			height: 60px;
			justify-content: center;
			margin-right: 0;
			border-radius: 15px;
			gap: 0;
		}

		.item-active {
			border-left: none;
			border: 2px solid #275ee7;
		}

		.item-text,
		.switches {
			display: none;
		}

		.icon {
			margin-left: 0;
			width: 24px;
			height: 24px;
		}

		.guild-item span {
			display: none;
		}
	}
</style>
