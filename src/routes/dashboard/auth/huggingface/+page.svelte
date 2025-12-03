<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { PUBLIC_FRONTEND_URL } from '$env/static/public';
	const origin = (PUBLIC_FRONTEND_URL || '').replace(/\/$/, '');

	const { data } = $props();

	console.log('data:', data);

	if (!data.user) {
		authClient.signIn.social({
			provider: 'discord',
			callbackURL: `${origin}/dashboard/auth/huggingface`
		});
	}

	async function handleLogin() {
		try {
			await authClient.linkSocial({
				provider: 'huggingface'
			});
			console.log('Auth huggingface initiated');
			return;
		} catch (error) {
			console.error('Login failed:', error);
		}
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

<div class="container">
	<button class="dashboard-redirect" onclick={handleLogin}>
		{#if data.user?.username}
			{data.user?.username}
		{/if}
		Connect your discord account with huggingface
	</button>
</div>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		box-sizing: border-box;
	}

	.dashboard-redirect {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(0, 0, 0, 0.1);
		border: 2px solid transparent;
		color: #fff;
		text-align: center;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		border-radius: 5px;
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
		background-clip: padding-box;
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
	}

	.dashboard-redirect::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 5px;
		padding: 2px;
		background: conic-gradient(
			from var(--angle),
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.4) 25%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0.4) 75%,
			rgba(255, 255, 255, 0.1) 100%
		);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		animation: rotate 4s linear infinite;
		pointer-events: none;
	}

	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotate {
		0% {
			--angle: 0deg;
		}
		100% {
			--angle: 360deg;
		}
	}

	.dashboard-redirect:hover {
		background-color: #357abd;
		box-shadow:
			0 0 30px rgba(255, 255, 255, 0.2),
			0 0 40px rgba(53, 122, 189, 0.3);
	}

	.login-icon {
		width: 20px;
		height: 20px;
	}
</style>
