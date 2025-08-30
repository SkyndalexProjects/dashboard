<script>
	import Navbar from './Navbar.svelte';
	import '../app.css';
	import { getContext } from "svelte";
	const i18n = getContext("i18n");

</script>

<svelte:head>
	<title>Skyndalex</title>
	<meta name="description" content="Skyndalex" />
	<meta property="og:title" content="Skyndalex" />
	<meta
		property="og:description"
		content="Skyndalex is a simple, open-source and 24/7 Discord bot, which includes modules like radio, fun, tools, moderation."
	/>
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="app">
	<Navbar />

	<section class="hero-section">
		<div class="headers">
			<p class="title">Skyndalex</p>
			<p class="sub-title"> { $i18n.t("page.home.subtitle")}</p>
			<p class="detailed-description">
				{$i18n.t("page.home.detailed-subtitle")}
			</p>
			<div class="buttons">
				<button class="button-main"> {$i18n.t("page.home.add-btn")} </button>
				<button class="button-secondary">{$i18n.t("page.home.dashboard-btn")} </button>
			</div>
		</div>

		<img src="/icons/embed.svg" alt="embed" class="embed" />
	</section>

	<section class="features-section">
		<div class="features">
			<div class="feature-box">
				<p class="feature-title">AI Features</p>
				<p class="feature-description">
					Imagine images, talk to chatbots, use different models or spaces (when generating images)
					created by other users through the Huggingface platform
				</p>
				<img class="feature-icon" src="/icons/sparkles.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Economy</p>
				<p class="feature-description">
					A simple economy, developed on the basis of UB, but with enhanced capabilities thanks to
					the other modules available in the bot.
				</p>
				<img class="feature-icon" src="/icons/economy.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Radio</p>
				<p class="feature-description">
					Listen to radio on vc using the largest possible radio-browser base!
				</p>
				<img class="feature-icon" src="/icons/radio.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Custombots</p>
				<p class="feature-description">
					Extend the settings, have your own branding. This is what you are able to achieve with our
					custombot system!
				</p>
				<img class="feature-icon" src="/icons/robot.svg" alt="feature icon" />
			</div>
		</div>
	</section>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		caret-color: transparent;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
	}
	.app::before {
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		background: url('/background.svg') no-repeat bottom center;
		background-size: cover;
		z-index: 0;
	}
	.embed {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin-left: 200px;
		width: 617px;
		height: 235px;
		user-select: none;
		pointer-events: none;
		flex-shrink: 0;
	}

	.hero-section {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: stretch;
		margin: 0 auto;
		max-width: 100%;
		width: 100%;
		min-height: 100vh;
		z-index: 1;
	}
	.features-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 1200px;
		width: 100%;
		padding: 80px 20px;
	}
	.headers {
		margin-left: 138px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		caret-color: transparent;
	}
	.title {
		color: #fff;
		width: 264px;
		font:
			800 48px / normal 'Be vietnam pro',
			sans-serif;
		caret-color: transparent;
	}
	.sub-title {
		font:
			800 36px / normal 'Be Vietnam Pro',
			sans-serif;
		color: #fff;
		margin-top: -50px;
		caret-color: transparent;
	}
	.detailed-description {
		margin-top: -10px;
		color: #dadada;
		width: 826px;
		height: 78px;
		text-wrap: wrap;
		overflow-wrap: break-word;
		font:
			400 24px / normal 'Be Vietnam Pro',
			sans-serif;
		caret-color: transparent;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		gap: 40px;
		caret-color: transparent;
	}
	.button-main {
		background: rgba(62, 107, 255, 0.47);
		border-radius: 18px;
		border: none;
		display: inline-flex;
		padding: 12px 30px;
		justify-content: center;
		align-items: center;
		color: #fff;
		text-align: center;
		font:
			800 20px / normal 'Poppins',
			sans-serif;
		caret-color: transparent;
		transition: background 0.3s ease;
		cursor: pointer;
	}
	.button-main:hover {
		background: rgba(62, 107, 255, 1);
	}
	.button-secondary {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 12px 30px;
		border-radius: 18px;
		border: 3px solid #3e6bff;
		background: rgba(0, 0, 0, 0.47);
		color: #fff;
		font:
			800 20px / normal 'Poppins',
			sans-serif;
		caret-color: transparent;
		transition: background 0.3s ease;
		cursor: pointer;
	}
	.button-secondary:hover {
		background: rgba(62, 107, 255, 1);
	}
	.features {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 140px;
	}
	.feature-box {
		position: relative;
		width: 605px;
		max-width: 580px;
		height: 322px;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.2);
	}
	.feature-title {
		color: #fff;
		font:
			800 32px / normal 'Poppins',
			sans-serif;
		padding-left: 35px;
	}
	.feature-description {
		padding: 20px 0 0 35px;
		width: 451px;
		height: 128px;
		flex-shrink: 0;
		color: #fff;
		font:
			400 20px / normal 'Poppins',
			sans-serif;
	}
	.feature-icon {
		position: absolute;
		top: 40px;
		right: 40px;
		width: auto;
		height: auto;
	}
</style>
