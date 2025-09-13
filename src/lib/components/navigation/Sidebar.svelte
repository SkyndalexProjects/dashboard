<script lang="ts">
	import { page } from '$app/state';
	import Switch from '$lib/components/ui/Switch.svelte';
	import { goto } from '$app/navigation';
	import getI18nStore from '$lib/i18n';
	const i18n = getI18nStore();
	const { guildId } = $props();

	interface SidebarItemProps {
		path: string;
		icon: string;
		text: string;
		hasSwitch?: boolean;
		switchActive?: boolean;
		additionalPaths?: string[];
	}

	function isItemActive(item: SidebarItemProps) {
		if (item.path === page.url.pathname) return true;
		return !!(item.additionalPaths && item.additionalPaths.includes(page.url.pathname));
	}
	async function handleItemClick(item: SidebarItemProps, event?: MouseEvent) {
		event?.preventDefault();

		await goto(item.path);
	}

	const overviewItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/home`,
			icon: '/icons/sidebar/home.svg',
			text: $i18n.t('system.sidebar.home'),
			hasSwitch: false,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${guildId}/insights`,
			icon: '/icons/sidebar/insights.svg',
			text: $i18n.t('system.sidebar.insights'),
			hasSwitch: false,
			switchActive: false
		}
	];

	const managementItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/main-settings`,
			icon: '/icons/sidebar/gear-icon.svg',
			text: $i18n.t('system.sidebar.main-settings'),
			hasSwitch: false,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${guildId}/logs`,
			icon: '/icons/sidebar/log.svg',
			text: $i18n.t('system.sidebar.logs'),
			hasSwitch: true,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${guildId}/custombots`,
			icon: '/icons/sidebar/custombot.svg',
			text: $i18n.t('system.sidebar.custombots'),
			hasSwitch: true,
			switchActive: false,
			additionalPaths: [
				`/dashboard/guild/${guildId}/custombots/list`,
				`/dashboard/guild/${guildId}/custombots/manage/0`
			]
		}
	];

	const funItems: SidebarItemProps[] = [
		{
			path: `/dashboard/guild/${guildId}/economy`,
			icon: '/icons/sidebar/economy.svg',
			text: $i18n.t('system.sidebar.economy'),
			hasSwitch: true,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${guildId}/radio`,
			icon: '/icons/sidebar/radio.svg',
			text: $i18n.t('system.sidebar.radio'),
			hasSwitch: true,
			switchActive: false
		},
		{
			path: `/dashboard/guild/${guildId}/ai`,
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
</script>

<div class="sidebar">
	{#each categories as category, idx}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="290"
			height="2"
			viewBox="0 0 290 2"
			fill="none"
			class="divider"
		>
			<path d="M0 1H290" stroke="white" stroke-opacity="0.31" />
		</svg>
		<span class="category">{category.name.toUpperCase()}</span>

		{#each category.items as item}
			<button class="item" onclick={() => handleItemClick(item)}>
				<span class:item-active={isItemActive(item)} class:item-inactive={!isItemActive(item)}>
					<img src={item.icon} class="icon" alt={item.text} />
					{item.text}
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

<style>
	button {
		all: unset;
	}
	.sidebar {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		width: 336px;
		height: 100vh;
		top: 90px;
		background: rgba(0, 0, 0, 0.2);
		padding-top: 20px;
		user-select: none;
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
		padding-left: 20px;
		color: rgba(255, 255, 255, 0.6);
		font:
			700 14px / normal 'Poppins',
			sans-serif;
		cursor: pointer;
		transition: color 0.2s ease;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.category:hover {
		color: rgba(255, 255, 255, 0.8);
	}
	.item:hover {
		background: rgba(0, 0, 0, 0.35);
		border-left: 5px solid #275ee7;
		border-radius: 0px 20px 20px 0px;
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
		width: 280px;
		height: 53px;
		flex-shrink: 0;
		border-radius: 0 20px 20px 0;
		border-left: 5px solid #275ee7;
		background: rgba(0, 0, 0, 0.35);
		font:
			700 20px / normal 'Be Vietnam Pro',
			sans-serif;
		gap: 15px;
		cursor: pointer;
	}
	.item-inactive {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 280px;
		height: 53px;
		flex-shrink: 0;
		border-radius: 0 20px 20px 0;
		color: rgba(255, 255, 255, 0.56);
		font:
			700 20px / normal 'Be Vietnam Pro',
			sans-serif;
		gap: 15px;
		margin-right: 30px;
	}
	.icon {
		display: inline-block;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-left: 10px;
	}
</style>
