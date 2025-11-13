<script>
	import LandingNavbar from '$lib/components/navigation/LandingNavbar.svelte';
	import geti18ncontext from '$lib/i18n';
	import '../app.css';
	const i18n = geti18ncontext();
	const { data } = $props();
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
	<LandingNavbar user={data.user} />

	<section class="hero-section">
		<div class="headers">
			<p class="title">Skyndalex</p>
			<p class="sub-title">{$i18n.t('page.home.subtitle')}</p>
			<p class="detailed-description">
				{$i18n.t('page.home.detailed-subtitle')}
			</p>
			<div class="buttons">
				<button class="button-main"> {$i18n.t('page.home.add-btn')} </button>
				<button class="button-secondary">{$i18n.t('page.home.dashboard-btn')} </button>
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
				<img class="feature-icon" src="/icons/sidebar/sparkles.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Economy</p>
				<p class="feature-description">
					A simple economy, developed on the basis of UB, but with enhanced capabilities thanks to
					the other modules available in the bot.
				</p>
				<img class="feature-icon" src="/icons/sidebar/economy.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Radio</p>
				<p class="feature-description">
					Listen to radio on vc using the largest possible radio-browser base!
				</p>
				<img class="feature-icon" src="/icons/sidebar/radio.svg" alt="feature icon" />
			</div>
			<div class="feature-box">
				<p class="feature-title">Custombots</p>
				<p class="feature-description">
					Extend the settings, have your own branding. This is what you are able to achieve with our
					custombot system!
				</p>
				<img class="feature-icon" src="/icons/sidebar/custombot.svg" alt="feature icon" />
			</div>
		</div>
	</section>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		caret-color: transparent;
		position: relative;
		overflow-y: auto;
		overflow-x: auto;
		scrollbar-width: none;
		scrollbar-color: transparent transparent;
		-ms-overflow-style: none;
	}

	.app::before {
		position: fixed;
		content: '';
		width: 100vw;
		height: 100vh;
		background: url('/background.svg') no-repeat bottom center;
		background-size: cover;
		z-index: -1;
		left: 0;
		bottom: 0;
	}

	.embed {
		display: none;
		user-select: none;
		pointer-events: none;
	}

	.hero-section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 100%;
		width: 100%;
		min-height: 100vh;
		z-index: 1;
		padding: 20px;
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
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		caret-color: transparent;
		max-width: 100%;
	}

	.title {
		color: #fff;
		font:
			800 clamp(32px, 5vw, 48px) / normal 'Be vietnam pro',
			sans-serif;
		caret-color: transparent;
	}

	.sub-title {
		margin-top: -50px;
		font:
			800 clamp(24px, 4vw, 36px) / normal 'Be Vietnam Pro',
			sans-serif;
		color: #fff;
		caret-color: transparent;
	}

	.detailed-description {
		margin-top: -10px;
		color: #dadada;
		max-width: 826px;
		width: 100%;
		text-wrap: wrap;
		overflow-wrap: break-word;
		font:
			400 clamp(16px, 2vw, 24px) / normal 'Be Vietnam Pro',
			sans-serif;
		caret-color: transparent;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 20px;
		margin-top: 20px;
		caret-color: transparent;
		flex-wrap: wrap;
	}

	.button-main,
	.button-secondary {
		display: inline-flex;
		padding: 12px 30px;
		justify-content: center;
		align-items: center;
		border-radius: 18px;
		font:
			800 clamp(16px, 2vw, 20px) / normal 'Poppins',
			sans-serif;
		caret-color: transparent;
		transition: background 0.3s ease;
		cursor: pointer;
	}

	.button-main {
		background: rgba(62, 107, 255, 0.47);
		border: none;
		color: #fff;
		text-align: center;
	}

	.button-main:hover {
		background: rgba(62, 107, 255, 1);
	}

	.button-secondary {
		border: 3px solid #3e6bff;
		background: rgba(0, 0, 0, 0.47);
		color: #fff;
	}

	.button-secondary:hover {
		background: rgba(62, 107, 255, 1);
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 40px;
		width: 100%;
	}

	.feature-box {
		position: relative;
		width: 100%;
		max-width: 605px;
		min-height: 322px;
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.2);
		padding: 20px;
	}

	.feature-title {
		color: #fff;
		font:
			800 clamp(24px, 3vw, 32px) / normal 'Poppins',
			sans-serif;
		padding-left: 15px;
	}

	.feature-description {
		padding: 20px 0 0 15px;
		max-width: 451px;
		width: 100%;
		color: #fff;
		font:
			400 clamp(16px, 2vw, 20px) / normal 'Poppins',
			sans-serif;
	}

	.feature-icon {
		position: absolute;
		top: 20px;
		right: 20px;
		width: clamp(40px, 5vw, 60px);
		height: auto;
	}

	@media (min-width: 1024px) {
		.embed {
			display: block;
			margin-left: 100px;
			width: 617px;
			height: 235px;
			flex-shrink: 0;
		}

		.headers {
			margin-left: 80px;
		}

		.features {
			grid-template-columns: repeat(2, 1fr);
			gap: 140px;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			flex-direction: column;
			padding: 40px 20px;
		}

		.headers {
			align-items: center;
			text-align: center;
		}
		.sub-title {
			margin-top: -20px;
		}

		.buttons {
			justify-content: center;
		}
	}
</style>
