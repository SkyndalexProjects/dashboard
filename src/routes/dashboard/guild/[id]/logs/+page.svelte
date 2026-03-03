<script lang="ts">
	import geti18ncontext from '$lib/i18n';
	const i18n = geti18ncontext();

	const { data } = $props();
	import Search from '$lib/components/ui/Search.svelte';
	// TODO: clean this mess + add more logs available

	interface Channel {
		id: string;
		guildId: string;
		name: string;
		type: string;
	}

	type Item = { id: string; name: string };

	const defaultSettings = {
		voiceStateUpdate: ''
	};

	type Settings = typeof defaultSettings;

	let settings: Settings = $state({ ...defaultSettings });

	let isDirty = $state(false);
	let isFadingOut = $state(false);

	function textChannelItems(chs: Channel[] | null | undefined): Item[] {
		const arr = Array.isArray(chs) ? chs : [];
		return arr
			.filter((c) => c && c.type === 'GuildText')
			.map((c) => {
				const name = String(c.name);
				return { id: name, name };
			});
	}
	function asChannelName(value: string, chs: Channel[] | null | undefined): string {
		const arr = Array.isArray(chs) ? chs : [];
		const found = arr.find((c) => String(c.id) === value || String(c.name) === value);
		return found ? String(found.name) : value;
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

{#await data.guilds}
	<p>Test</p>
{:then guilds}
	{#await data.channels}
		<div class="skeleton-layout">
			<div class="welcome-section-skeleton">
				<div class="tabs-skeleton"></div>
				<div class="welcome-setting-skeleton"></div>
				<div class="welcome-setting-skeleton"></div>
				<div class="welcome-setting-skeleton"></div>
			</div>

			<div class="permissions-section-skeleton">
				<div class="setting-skeleton"></div>
				<div class="setting-skeleton"></div>
				<div class="setting-skeleton"></div>
				<div class="setting-skeleton"></div>
			</div>
		</div>
	{:then channels}
		<div class="containers">
			<div class="setting-container dropdown-container">
				VOICE STATE UPDATE LOGS
				<Search
					menuItems={textChannelItems(channels as Channel[])}
					onChange={(value) => {
						settings.welcomeChannel = Array.isArray(value) ? (value[0] ?? '') : value;
						isDirty = true;
					}}
					inputValue={asChannelName(settings.voiceStateUpdate, channels as Channel[])}
					icon="/icons/dropdowns/hashtag.svg"
				/>
			</div>
		</div>
	{/await}
{/await}

<style>
	.containers {
		overflow: visible;
	}
	.setting-container {
		position: relative;
		gap: 15px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		overflow: visible;
		padding-left: 15px;
		margin-top: 45px;
		width: 376px;
		height: 118px;
		align-self: stretch;
		color: #fff;
		border-radius: 10px;
		border: 2px solid #474747;
		background: rgba(0, 0, 0, 0.2);
		font-family: 'Be Vietnam', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	.dropdown-container {
		position: relative;
		z-index: 10001;
		overflow: visible;
	}
	.text-input {
		all: unset;
		text-align: left;
		width: 303px;
		height: 42px;
		box-sizing: border-box;
		border: 1px solid #8e8e8e;
		background: rgba(32, 32, 32, 0.1);
		border-radius: 10px;
		color: #ffffff;
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		padding-left: 40px;
		font-weight: 700;
		z-index: 0;
	}
</style>
