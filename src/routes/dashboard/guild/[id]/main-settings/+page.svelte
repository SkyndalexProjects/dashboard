<script lang="ts">
	import Tab from '$lib/components/ui/Tab.svelte';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Search from '$lib/components/ui/Search.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { error } from '@sveltejs/kit';

	const origin = (PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

	const { data } = $props();
	let selectedTab = $state('Greetings');

	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}

	interface Channel {
		id: string;
		guildId: string;
		name: string;
		type: string;
	}

	type Item = { id: string; name: string };

	const defaultSettings = {
		welcomeChannel: '',
		goodbyeChannel: '',
		welcomeTitle: '',
		goodbyeTitle: '',
		blockedCommands: [] as string[],
		blockedChannels: [] as string[]
	};

	type Settings = typeof defaultSettings;

	let settings: Settings = $state({ ...defaultSettings });

	// TODO: make it better or smth

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
	const initCommands = [
		'ban',
		'kick',
		'mute',
		'unmute',
		'warn',
		'clear',
		'lock',
		'unlock',
		'nick',
		'role',
		'temprole',
		'addrole',
		'removerole',
		'slowmode'
	];

	const initCommandItems: Item[] = initCommands.map((c) => ({ id: c, name: c }));

	function isEmpty(value: unknown): boolean {
		if (value == null) return true;
		if (typeof value === 'string') return value.trim() === '';
		if (Array.isArray(value)) return value.length === 0;
		return false;
	}

	async function save() {
		const payload = Object.entries(settings).reduce((acc, [key, value]) => {
			if (!isEmpty(value)) {
				// @ts-expect-error --
				acc[key] = value;
			}
			return acc;
		}, {} as Partial<Settings>);

		if (Object.keys(payload).length === 0) {
			console.warn('No settings to save');
			isFadingOut = true;
			setTimeout(() => {
				isDirty = false;
				isFadingOut = false;
			}, 600);
			return;
		}

		try {
			const response = await fetch(`${origin}/api/guilds/${data.guild.id}/settings`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				credentials: 'include'
			});

			if (!response.ok) {
				console.error('Failed to save settings');
				return;
			}
			isFadingOut = true;
			setTimeout(() => {
				isDirty = false;
				isFadingOut = false;
			}, 600);
		} catch (err) {
			console.error('Save error', err);
		}
	}

	onMount(() => {
		const controller = new AbortController();

		(async () => {
			try {
				const response = await fetch(`${origin}/api/guilds/${data.guild.id}/settings`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					signal: controller.signal,
					credentials: 'include'
				});

				const loadedSettings = await response.json();
				settings = { ...defaultSettings, ...loadedSettings };
			} catch (e: unknown | { message: string }) {
				const message = e instanceof Error ? e.message : 'Unknown error';
				throw error(500, message);
			}
		})();

		return () => controller.abort();
	});

	function reset() {
		settings = { ...defaultSettings };
		isFadingOut = true;
		setTimeout(() => {
			isDirty = false;
			isFadingOut = false;
		}, 600);
	}
</script>
{#snippet WelcomeHandIcon()}
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3031_1398)">
            <path d="M1.39373 7.21533C0.690842 8.90025 1.9124 10.9339 3.68686 11.2904C2.30405 10.3618 1.44061 8.87002 1.39373 7.21533Z" fill="white"/>
            <path d="M3.68668 11.2904L3.64355 11.2812C3.64895 11.2827 3.66184 11.2848 3.68668 11.2904Z" fill="white"/>
            <path d="M0.46875 10.3735C0.583359 11.7845 2.35289 12.6887 3.62273 12.1107C2.31539 11.8299 1.4482 11.5728 0.46875 10.3735Z" fill="white"/>
            <path d="M10.8996 5.3424C11.7227 3.6624 10.5539 1.58396 8.77734 1.13232C10.1365 2.12443 10.9427 3.6692 10.8996 5.3424Z" fill="white"/>
            <path d="M11.4528 4.1832C12.4353 3.31391 12.0392 1.58445 10.9062 1.02148C11.4523 2.09141 11.6448 2.99516 11.4528 4.1832Z" fill="white"/>
            <path d="M14.1843 3.36192C13.962 3.19201 13.6899 3.10008 13.4101 3.10036C11.7212 3.10036 11.4184 5.3002 11.0437 6.15895C11.0437 6.15895 9.31185 2.53341 8.70951 1.33716C8.08842 0.103172 6.76256 0.358172 6.3742 1.02989C5.4517 0.073875 3.70865 0.845672 3.93084 2.00794C2.73459 1.91606 2.25107 3.09614 2.51662 3.8527C1.59201 3.82411 1.15982 4.96762 1.47248 5.7863C1.48865 5.82895 3.13021 9.05958 3.57225 10.1602C3.62357 10.2879 3.67537 10.4246 3.72975 10.5685C4.08717 11.5135 4.57678 12.8077 5.80162 13.8472C6.32896 14.2946 7.05904 14.5311 7.91357 14.5311C9.41967 14.5311 11.0966 13.7836 12.186 12.6265C13.1617 11.5904 13.6293 10.3184 13.5383 8.94802C13.4568 7.71614 13.8487 6.55552 14.1634 5.6227C14.5049 4.61044 14.7744 3.81075 14.1843 3.36192ZM12.7904 8.90724C12.981 11.6325 10.2494 13.932 7.93185 13.932C7.22381 13.932 6.49045 13.8176 6.03225 13.4288C4.71834 12.3136 4.38857 10.9336 4.00771 9.98723C3.55279 8.85497 2.43623 6.67927 1.89506 5.58473C1.67357 5.13661 2.04365 4.18294 2.68818 4.18294L4.54701 8.13637L5.25131 8.55919C5.25131 8.55919 3.63834 5.04403 3.12764 3.83255C2.82951 3.1252 3.34326 2.27114 4.03561 2.38247L6.34326 7.30809L7.04779 7.73184L4.35811 2.05223C4.34732 1.04559 5.72475 1.02989 6.0449 1.6177C6.85514 3.10552 8.37623 6.37059 8.37623 6.37059L9.08029 6.79411L6.55537 1.44028C7.0485 0.794812 7.9185 0.885281 8.2935 1.6688C8.74396 2.60981 10.6515 6.69708 10.6515 6.69708C8.76834 7.40302 7.48279 9.44934 8.82881 11.4666C7.76076 9.26114 9.65287 7.70255 10.7706 7.18739C11.1937 6.99216 11.3493 6.62302 11.3493 6.62302L11.3483 6.62325C11.4958 6.3563 11.4871 5.99934 11.6629 5.42161C12.0437 4.17122 12.5662 3.50864 13.3328 3.50864C13.5095 3.50864 13.7322 3.64083 13.8344 3.79153C14.3507 4.55348 12.6133 6.37505 12.7904 8.90724Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_3031_1398">
                <rect width="15" height="15" fill="white"/>
            </clipPath>
        </defs>
    </svg>
{/snippet}

{#snippet FarewellHandIcon()}
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3031_1419)">
            <path d="M13.6063 7.21533C14.3092 8.90025 13.0876 10.9339 11.3131 11.2904C12.696 10.3618 13.5594 8.87002 13.6063 7.21533Z" fill="white"/>
            <path d="M11.3133 11.2904L11.3564 11.2812C11.3511 11.2827 11.3382 11.2848 11.3133 11.2904Z" fill="white"/>
            <path d="M14.5312 10.3735C14.4166 11.7845 12.6471 12.6887 11.3773 12.1107C12.6846 11.8299 13.5518 11.5728 14.5312 10.3735Z" fill="white"/>
            <path d="M4.10039 5.3424C3.27727 3.6624 4.44609 1.58396 6.22266 1.13232C4.86352 2.12443 4.05727 3.6692 4.10039 5.3424Z" fill="white"/>
            <path d="M3.54719 4.1832C2.56469 3.31391 2.96078 1.58445 4.09375 1.02148C3.54766 2.09141 3.35523 2.99516 3.54719 4.1832Z" fill="white"/>
            <path d="M0.815723 3.36192C1.038 3.19201 1.31008 3.10008 1.58986 3.10036C3.27877 3.10036 3.58158 5.3002 3.95635 6.15895C3.95635 6.15895 5.68815 2.53341 6.29049 1.33716C6.91158 0.103172 8.23744 0.358172 8.6258 1.02989C9.5483 0.073875 11.2913 0.845672 11.0692 2.00794C12.2654 1.91606 12.7489 3.09614 12.4834 3.8527C13.408 3.82411 13.8402 4.96762 13.5275 5.7863C13.5113 5.82895 11.8698 9.05958 11.4278 10.1602C11.3764 10.2879 11.3246 10.4246 11.2703 10.5685C10.9128 11.5135 10.4232 12.8077 9.19838 13.8472C8.67104 14.2946 7.94096 14.5311 7.08643 14.5311C5.58033 14.5311 3.90338 13.7836 2.814 12.6265C1.8383 11.5904 1.37072 10.3184 1.46166 8.94802C1.54322 7.71614 1.15135 6.55552 0.836583 5.6227C0.495099 4.61044 0.225568 3.81075 0.815723 3.36192ZM2.20955 8.90724C2.01901 11.6325 4.75065 13.932 7.06815 13.932C7.77619 13.932 8.50955 13.8176 8.96775 13.4288C10.2817 12.3136 10.6114 10.9336 10.9923 9.98723C11.4472 8.85497 12.5638 6.67927 13.1049 5.58473C13.3264 5.13661 12.9563 4.18294 12.3118 4.18294L10.453 8.13637L9.74869 8.55919C9.74869 8.55919 11.3617 5.04403 11.8724 3.83255C12.1705 3.1252 11.6567 2.27114 10.9644 2.38247L8.65674 7.30809L7.95221 7.73184L10.6419 2.05223C10.6527 1.04559 9.27525 1.02989 8.9551 1.6177C8.14486 3.10552 6.62377 6.37059 6.62377 6.37059L5.91971 6.79411L8.44463 1.44028C7.9515 0.794812 7.0815 0.885281 6.7065 1.6688C6.25604 2.60981 4.34846 6.69708 4.34846 6.69708C6.23166 7.40302 7.51721 9.44934 6.17119 11.4666C7.23924 9.26114 5.34713 7.70255 4.2294 7.18739C3.80635 6.99216 3.65072 6.62302 3.65072 6.62302L3.65166 6.62325C3.50424 6.3563 3.51291 5.99934 3.33713 5.42161C2.95627 4.17122 2.43385 3.50864 1.66721 3.50864C1.49049 3.50864 1.26783 3.64083 1.16565 3.79153C0.649318 4.55348 2.38674 6.37505 2.20955 8.90724Z" fill="white" fill-opacity="0.5"/>
        </g>
        <defs>
            <clipPath id="clip0_3031_1419">
                <rect width="15" height="15" fill="white" transform="matrix(-1 0 0 1 15 0)"/>
            </clipPath>
        </defs>
    </svg>
{/snippet}
<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#await data.guilds}
    <div class="skeleton-layout">
        <div class="welcome-section-skeleton">
            <div class="tabs-skeleton"></div>
            <div class="welcome-setting-skeleton"></div>
            <div class="welcome-setting-skeleton"></div>
            <div class="welcome-setting-skeleton"></div>
        </div>

        <div class="permissions-section-skeleton">
            <div class="setting-skeleton"></div>
            <div class="setting-skeleton"> </div>
            <div class="setting-skeleton"></div>
            <div class="setting-skeleton"></div>

        </div>
    </div>
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
                <div class="setting-skeleton"> </div>
                <div class="setting-skeleton"></div>
                <div class="setting-skeleton"></div>

            </div>
        </div>
	{:then channels}
<!--		<div class="settings">-->
<!--			<div class="welcome-settings">-->
<!--				<div class="section-title">-->
<!--					Greetings & Goodbye Settings-->
<!--					<div class="underline-vector"></div>-->
<!--				</div>-->

<!--				<div class="tabs">-->
        <Tab
                tabs={[
							{
								label: 'Welcoming',
								icon: WelcomeHandIcon
							},
							{
								label: 'Goodbyes',
								icon: FarewellHandIcon
							}
						]}
                {selectedTab}
                onTabSelect={handleTabSelect}
                style="recent-tabs"
        >
						{#if selectedTab === 'Welcoming'}
							<div class="containers">
								<div class="setting-container dropdown-container">
									CHANNEL
									<Search
										menuItems={textChannelItems(channels)}
										onChange={(value) => {
											settings.welcomeChannel = Array.isArray(value) ? (value[0] ?? '') : value;
											isDirty = true;
										}}
										inputValue={asChannelName(settings.welcomeChannel, channels)}
										icon="/icons/dropdowns/hashtag.svg"
									/>
								</div>
								<div class="setting-container">
									WELCOME TITLE
									<img src="/icons/dropdowns/tag.svg" alt="h" class="icon" />
									<input
										type="text"
										class="text-input"
										value={settings.welcomeTitle}
										oninput={(value) => {
											settings.welcomeTitle = value.currentTarget.value;
											isDirty = true;
										}}
									/>
								</div>
                                <div class="setting-container">
                                    WELCOME DESCRIPTION
                                    <img src="/icons/dropdowns/tag.svg" alt="h" class="icon" />
                                    <input
                                            type="text"
                                            class="text-input"
                                            value={settings.welcomeTitle}
                                            oninput={(value) => {
											settings.welcomeTitle = value.currentTarget.value;
											isDirty = true;
										}}
                                    />
                                </div>
							</div>
						{:else if selectedTab === 'Goodbyes'}
							<div class="containers">
								<div class="setting-container dropdown-container">
									CHANNEL
									<Search
										menuItems={textChannelItems(channels)}
										onChange={(value) => {
											settings.goodbyeChannel = Array.isArray(value) ? (value[0] ?? '') : value;
											isDirty = true;
										}}
										inputValue={asChannelName(settings.goodbyeChannel, channels)}
										icon="/icons/dropdowns/hashtag.svg"
									/>
								</div>
								<div class="setting-container">
									WELCOME TITLE
									<img src="/icons/dropdowns/tag.svg" alt="h" class="icon" />
									<input
										type="text"
										class="text-input"
										value={settings.goodbyeTitle}
										oninput={(value) => {
											settings.goodbyeTitle = value.currentTarget.value;
											isDirty = true;
										}}
									/>
								</div>
							</div>
						{/if}
					</Tab>
<!--				</div>-->
<!--			</div>-->

<!--			<div class="permissions-settings">-->
<!--				<div class="section-title">-->
<!--					Permissions-->
<!--					<div class="underline-vector"></div>-->
<!--				</div>-->

<!--				<div class="setting-container multi-input">-->
<!--					BLOCKED COMMANDS-->
<!--					<Search-->
<!--						menuItems={initCommandItems}-->
<!--						icon="/icons/dropdowns/deny.svg"-->
<!--						multiSelect={true}-->
<!--						onChange={(value) => {-->
<!--							settings.blockedCommands = Array.isArray(value) ? value : [value];-->
<!--							isDirty = true;-->
<!--						}}-->
<!--					/>-->
<!--				</div>-->
<!--				<div class="setting-container multi-input">-->
<!--					BLOCKED CHANNELS-->
<!--					<Search-->
<!--						menuItems={textChannelItems(channels)}-->
<!--						icon="/icons/dropdowns/deny.svg"-->
<!--						multiSelect={true}-->
<!--						onChange={(value) => {-->
<!--							settings.blockedChannels = Array.isArray(value) ? value : [value];-->
<!--							isDirty = true;-->
<!--						}}-->
<!--					/>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
		{#if isDirty}
			<div class="save-bar" class:fading-out={isFadingOut}>
				<div class="save-bar-title">Careful - you have unsaved changes!</div>
				<div class="save-bar-buttons">
					<button class="save-btn" onclick={save}>Save changes</button>
					<button class="decline-btn" onclick={reset}> Reset </button>
				</div>
			</div>
		{/if}
	{:catch error}
		<div class="error-state">Error loading channels: {error.message}</div>
	{/await}
{:catch error}
	<div class="error-state">Error loading guilds: {error.message}</div>
{/await}

<style>
    :global(.tabs.recent-tabs) {
        --tab-background: rgba(0, 0, 0, 0.4);
        --tab-color: rgba(255, 253, 253, 0.5);
        --tab-hover-color: #e6f0ff;
        --tab-selected-color: rgba(255, 253, 253, 0.5);
        --tab-font-weight: 600;
        --tab-selected-background: rgba(0, 0, 0, 0.6);
        --tab-selected-weight: 700;
        --tab-font-family: Poppins, sans-serif;
        --tab-selected-font-family: Poppins, sans-serif;
        --tab-font-size: 13px;
        --tabs-border-color: rgba(255, 255, 255, 0.08);
        --tab-selected-width: 150px;
        --tab-selected-height: 46px;
        --tab-selected-border-bottom: transparent;
        --tab-width: 136px;
        --tab-height: 46px;
        --tab-selected-padding-right: 20px;
        --tab-padding-right: 20px;
        --tab-border-radius: 0 15px 15px 0;
        --tab-selected-border-radius: 15px 0px 0px 15px;
    }
	.settings {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		min-height: 100vh;
		z-index: 1;
		margin-left: -350px;
		margin-top: -100px;
	}
	.permissions-settings {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-left: 100px;
		margin-top: 140px;
		width: max-content;
		z-index: 1;
	}
	.welcome-settings {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-left: 400px;
		margin-top: 140px;
		width: max-content;
		z-index: 1;
	}
	.tabs {
		margin-top: 35px;
	}
	.switch-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		color: rgba(255, 255, 255, 0.3);
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 30px;
	}
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
	.setting-container.multi-input {
		height: 100px;
		justify-content: normal;
		padding-top: 15px;
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

	.save-bar {
		position: fixed;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: space-between;
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid #223a8a;
		color: #fff;
		width: 30%;
		height: 60px;
		border-radius: 15px;
		z-index: 10002;
		backdrop-filter: blur(8px);
		padding: 0 20px;
		animation: save-bar-appear 0.4s ease-out;
	}
	.save-bar-buttons {
		display: flex;
		gap: 15px;
	}
	.save-bar-title {
		font:
			700 16px Poppins,
			sans-serif;
	}
	.save-btn {
		all: unset;
		cursor: pointer;
		background: #275ee7;
		color: #fff;
		padding: 10px 15px;
		border-radius: 6px;
		font:
			700 14px Poppins,
			sans-serif;
		transition: all 0.3s ease;
	}

	.decline-btn {
		all: unset;
		cursor: pointer;
		background: red;
		color: #fff;
		padding: 10px 15px;
		border-radius: 6px;
		font:
			700 14px Poppins,
			sans-serif;
		border: transparent;
		transition: all 0.3s ease;
	}
	.save-btn:hover {
		background: #1c4ed8;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(39, 94, 231, 0.4);
	}

	.decline-btn:hover {
		background: #dc2626;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
	}

	.save-btn:active {
		transform: translateY(0);
	}

	.decline-btn:active {
		transform: translateY(0);
	}
	.save-bar.fading-out {
		animation: save-bar-disappear 0.6s ease-in forwards;
	}
	@keyframes save-bar-disappear {
		0% {
			bottom: 24px;
			opacity: 1;
		}
		40% {
			opacity: 0.6;
		}
		100% {
			bottom: -100px;
			opacity: 0;
		}
	}
	.icon {
		position: absolute;
		width: 20px;
		height: 20px;
		pointer-events: none;
		padding-top: 34px;
		padding-left: 10px;
	}
    .skeleton-layout {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        min-height: 100vh;
        z-index: 1;
        margin-left: -350px;
        margin-top: -100px;
    }

    .welcome-section-skeleton {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 400px;
        margin-top: 140px;
    }

    .permissions-section-skeleton {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 100px;
        margin-top: 140px;
    }

    .tabs-skeleton {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 376px;
        height: 50px;
        background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(255, 255, 255, 0.05) 40%,
                rgba(255, 255, 255, 0.15) 50%,
                rgba(255, 255, 255, 0.05) 60%,
                rgba(255, 255, 255, 0.05) 100%
        );
        background-size: 200% 100%;
        border-radius: 10px;
        animation: skeleton-loading 1.5s infinite;
        margin-top: 35px;
    }

    .welcome-setting-skeleton {
        margin-top: 45px;
        width: 376px;
        height: 118px;
        background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(255, 255, 255, 0.05) 40%,
                rgba(255, 255, 255, 0.15) 50%,
                rgba(255, 255, 255, 0.05) 60%,
                rgba(255, 255, 255, 0.05) 100%
        );
        background-size: 200% 100%;
        border-radius: 10px;
        animation: skeleton-loading 1.5s infinite;
    }

    .setting-skeleton {
        margin-top: 45px;
        width: 376px;
        height: 118px;
        background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(255, 255, 255, 0.05) 40%,
                rgba(255, 255, 255, 0.15) 50%,
                rgba(255, 255, 255, 0.05) 60%,
                rgba(255, 255, 255, 0.05) 100%
        );
        background-size: 200% 100%;
        border-radius: 10px;
        animation: skeleton-loading 1.5s infinite;
    }


</style>
