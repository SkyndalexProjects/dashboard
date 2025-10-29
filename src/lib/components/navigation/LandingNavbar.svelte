<script lang="ts">
	import type { APIUser } from 'discord-api-types/v10';
	import getI18nStore from '$lib/i18n';
	import { authClient } from '$lib/auth-client';

	const i18n = getI18nStore();

	function handleLogin(e?: MouseEvent) {
		authClient.signIn.social({
			provider: 'discord',
			callbackURL: 'http://localhost:5173/dashboard/guild'
		});
	}

	function getAvatarUrl(user: APIUser) {
		if (user && user.id && user.avatar) {
			return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`;
		}
	}

	const { user }: { user?: APIUser | null } = $props();
</script>

<nav>
	<div class="bot">
		<img src="/bot-logo.png" alt="bot-logo" />
		<p class="bot-name">Skyndalex</p>
	</div>
	<div class="links">
		<a class="link-active"> {$i18n.t('page.home.home')} </a>
		<a class="link" href="https://skyndalex.com">
			{$i18n.t('page.home.policy')}
		</a>
		<a class="link"> {$i18n.t('page.home.links')}</a>
		<a class="link"> {$i18n.t('page.home.project')}</a>
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
		position: absolute;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid #424242;
		height: 121px;
		width: 100%;
		caret-color: transparent;
	}

	button {
		all: unset;
	}

	a {
		transition:
			color 0.3s ease,
			opacity 0.3s ease;
	}
	a:hover {
		color: #fff;
		opacity: 1;
	}

	.bot {
		display: flex;
		align-items: center;
		caret-color: transparent;
	}

	.bot img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		caret-color: transparent;
		margin-left: 23px;
	}
	.bot-name {
		color: #fff;
		font:
			800 24px / normal 'Be Vietnam Pro',
			sans-serif;
		padding-left: 16px;
	}

	.links {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 50px;
		z-index: 2;
	}
	.link {
		color: rgba(255, 255, 255, 0.2);
		font:
			400 24px / normal 'Be vietnam pro',
			sans-serif;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
	}
	.link-active {
		color: #fff;
		font:
			700 24px / normal 'Be vietnam pro',
			sans-serif;
	}
	.right-corner {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		margin-right: 30px;
	}
	.dashboard-redirect {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.26);
		width: max-content;
		height: 64px;
		color: #667398;
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
	.login-icon {
		border-radius: 50%;
		width: 30px;
		height: 30px;
	}
</style>
