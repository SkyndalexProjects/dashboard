<script>
	import { getContext } from 'svelte';
	import { userStore } from '$lib/userStore.svelte.js';

	const i18n = getContext('i18n');

	function handleLogin() {
		window.location.href = 'http://localhost:3000';
	}
	function getAvatarUrl(user) {
		if (user && user.id && user.avatar) {
			return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`;
		}
		return user?.id
			? `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`
			: '/default-avatar.png';
	}
	console.log('user', $userStore);
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
		<button class="dashboard-redirect" on:click={handleLogin}>
			<!--			<img src="/icons/login.svg" alt="login" class="login-icon" />-->
			<!--			Login-->
			{#if $userStore}
				<!--				<h1>{$userStore.username}</h1>-->
				<img
					src={getAvatarUrl($userStore)}
					alt={$userStore.username || 'Avatar'}
					class="login-icon"
				/>
				{$userStore.username}
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
		background: transparent;
		border: none;
		outline: none;
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
	.login-icon {
		border-radius: 50%;
		width: 30px;
		height: 30px;
	}
</style>
