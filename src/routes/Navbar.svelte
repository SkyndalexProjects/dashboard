<script>
	import { redirect } from '@sveltejs/kit';
</script>

<nav>
	<div class="bot">
		<img src="/bot-logo.png" alt="bot-logo" />
		<p class="bot-name">Skyndalex</p>
	</div>
	<div class="links">
		<button class="link-active"> Home </button>
		<button onclick={() => redirect(302, 'https://skyndalex.com')} class="link">
			Policy & Privacy
		</button>
		<button class="link"> Social links </button>
		<button class="link"> Project </button>
	</div>
	<div class="spacer"></div>

	<div class="right-corner">
		<button class="dashboard-redirect">
			<img src="/icons/login.svg" alt="login" class="login-icon" />
			Login
		</button>
	</div>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		position: absolute;
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

	.bot {
		display: flex;
		align-items: center;
		flex: 0 0 auto;
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
		position: absolute;
		display: flex;
		flex-direction: row;
		gap: 50px;
		align-items: center;
		left: 50%;
		transform: translateX(-50%);
	}
	.link {
		color: rgba(255, 255, 255, 0.2);
		font:
			400 24px / normal 'Be vietnam pro',
			sans-serif;
		cursor: pointer;
	}
	.link-active {
		color: #fff;
		font:
			700 24px / normal 'Be vietnam pro',
			sans-serif;
	}
	.spacer {
		flex: 0 0 auto;
		width: 200px;
	}
	.right-corner {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		right: 0;
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
	}
	.login-icon {
		width: 30px;
		height: 30px;
	}
</style>
