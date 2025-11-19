<script lang="ts">
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import getI18nStore from '$lib/i18n';
	import type { APIUser } from 'discord-api-types/v10';
	import { authClient } from '$lib/auth-client';
	import { page } from '$app/state';
	const i18n = getI18nStore();
	const { children, data } = $props();

	const route = $state(page.url.pathname);
	let showDropdown = $state(false);

	function getAvatarUrl(user: APIUser): string {
		return user?.id && user?.avatar
			? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
	}

	async function handleLogout() {
		await authClient.signOut();

		window.location.href = '/';
	}

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
		window.location.href = item.path;
	}

	injectSpeedInsights();
	injectAnalytics();
</script>

<div class="app">
	{#if route !== '/' && route !== '/dashboard/guild'}
		<nav>
			<div class="left-corner">
				<img
					class="icon"
					src="https://cdn.discordapp.com/avatars/1059594156839809074/f2ed3c7590d834ed2d86912124c4ee1e.webp?size=1024"
					alt="Guild Icon"
				/>
				{$i18n.t('system.navbar.title')}

				<div class="version">Alpha</div>
			</div>
			<div class="right-corner">
				<Dropdown>
					{#snippet trigger()}
						<button class="dashboard-redirect">
							<img
								src={getAvatarUrl(data.user)}
								alt={data.user?.username || 'Avatar'}
								class="login-icon"
							/>
							<span class="username">{data.user?.username}</span>
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
	{/if}

	<main>
		{@render children()}
	</main>
</div>

<style>
	.app:before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
		z-index: -1;
	}
	:global(body) {
		caret-color: transparent;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
		height: 100%;
		min-height: 100vh;
		width: 100%;
	}

	:global([data-slot='chart'] .lc-text-svg) {
		overflow: visible;
	}

	:global([data-slot='chart'] .lc-rule-y-line:not(.lc-grid-y-rule)) {
		stroke-width: 1;
	}
	nav {
		position: fixed;
		caret-color: transparent;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 90px;
		top: 0;
		overflow: visible;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		user-select: none;
		z-index: 1000;
	}
	.left-corner {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		left: 40px;
		gap: 10px;
		color: #fff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 20px;
		font-style: normal;
		font-weight: 900;
		line-height: normal;
	}
	.right-corner {
		position: fixed;
		right: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.version {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
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
		padding: 3px 10px;
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
		padding: 0 20px;
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
	button {
		all: unset;
	}
	.icon {
		width: 40px;
		height: 40px;
		display: inline-block;
		flex-direction: row;
		align-items: center;
		border-radius: 50%;
		justify-content: center;
		margin-left: 10px;
		object-fit: contain;
		flex-shrink: 0;
	}
</style>
