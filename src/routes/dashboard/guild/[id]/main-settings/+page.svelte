<script lang="ts">
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Tab from '$lib/components/ui/Tab.svelte';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Search from '$lib/components/ui/Search.svelte';
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

	let isDirty = $state(false);

	function textChannelItems(chs: Channel[]): Item[] {
		const arr = (chs as Channel[] | undefined) ?? [];
		console.log('arr', arr);
		return arr
			.filter((c: Channel) => c && c.type === 'GuildText')
			.map((c: Channel) => ({ id: String(c.id), name: String(c.name) }));
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
				// @ts-ignore --
				acc[key] = value;
			}
			return acc;
		}, {} as Partial<Settings>);

		if (Object.keys(payload).length === 0) {
			console.warn('No settings to save');
			isDirty = false;
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/api/guilds/${data.guild.id}/settings`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				console.error('Failed to save settings');
				return;
			}
			isDirty = false;
		} catch (err) {
			console.error('Save error', err);
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

{#await data.guilds}
	<div class="navbar-skeleton"></div>
	<div class="sidebar-skeleton"></div>
	<div class="text-skeletons">
		<div class="text-skeleton">
			<div class="sm-textx">
				<div class="sm-text-skeleton"></div>
				<div class="sm-text-skeleton"></div>
			</div>
		</div>
		<div class="text-skeleton"></div>
		<div class="text-skeleton"></div>
	</div>
	<div class="left-setting-container-skeletons">
		<div class="setting-container-skeleton"></div>
		<div class="setting-container-skeleton"></div>
	</div>
{:then guilds}
	<ManagementNavbar guild={data.guild} user={data.user} {guilds} />
	<Sidebar guildId={data.guild.id} />

	{#if isDirty}
		<div class="save-bar">
			<div class="save-bar-title">Save data</div>
			<button class="save-btn" onclick={save}>save data</button>
		</div>
	{/if}

	{#await data.channels}
		<div>Loading channels...</div>
	{:then channels}
		<div class="settings">
			<div class="welcome-settings">
				<div class="title-container">
					Greetings & Goodbye settings
					<svg class="title-underline" viewBox="0 0 165 2" fill="none" preserveAspectRatio="none">
						<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
					</svg>
				</div>

				<div class="tabs">
					<Tab tabs={['Greetings', 'Goodbye']} {selectedTab} onTabSelect={handleTabSelect}>
						{#if selectedTab === 'Greetings'}
							<div class="switch-container">
								<Switch active={false} /> Enable image
							</div>
							<div class="containers">
								<div class="setting-container dropdown-container">
									CHANNEL
									<Search
										menuItems={textChannelItems(channels)}
										onChange={(value) => {
											settings.welcomeChannel = Array.isArray(value) ? (value[0] ?? '') : value;
											isDirty = true;
										}}
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
							</div>
						{:else if selectedTab === 'Goodbye'}
							<div class="containers">
								<div class="setting-container dropdown-container">
									CHANNEL
									<Search
										menuItems={textChannelItems(channels)}
										onChange={(value) => {
											settings.goodbyeChannel = Array.isArray(value) ? (value[0] ?? '') : value;
											isDirty = true;
										}}
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
				</div>
			</div>

			<div class="permissions-settings">
				<div class="title-container">
					Permissions settings
					<svg class="title-underline" viewBox="0 0 165 2" fill="none" preserveAspectRatio="none">
						<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
					</svg>
				</div>

				<div class="setting-container multi-input">
					BLOCKED COMMANDS
					<Search
						menuItems={initCommandItems}
						icon="/icons/dropdowns/deny.svg"
						multiSelect={true}
						onChange={(value) => {
							settings.blockedCommands = Array.isArray(value) ? value : [value];
							isDirty = true;
						}}
					/>
				</div>

				<div class="setting-container multi-input">
					BLOCKED CHANNELS
					<Search
						menuItems={textChannelItems(channels)}
						icon="/icons/dropdowns/deny.svg"
						multiSelect={true}
						onChange={(value) => {
							settings.blockedChannels = Array.isArray(value) ? value : [value];
							isDirty = true;
						}}
					/>
				</div>
			</div>
		</div>
	{:catch error}
		<div class="error-state">Error loading channels: {error.message}</div>
	{/await}
{:catch error}
	<div class="error-state">Error loading guilds: {error.message}</div>
{/await}

<style>
	.settings {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		min-height: 100vh;
		z-index: 1;
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
	.title-container {
		display: inline-block;
		position: relative;
	}
	.title-underline {
		width: 100%;
		height: 2px;
		margin-top: 4px;
		display: block;
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

	/* Pasek zapisu */
	.save-bar {
		position: fixed;
		top: 90px;
		right: 24px;
		display: flex;
		gap: 12px;
		align-items: center;
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid #275ee7;
		color: #fff;
		padding: 10px 14px;
		border-radius: 8px;
		z-index: 10002;
		backdrop-filter: blur(8px);
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
		padding: 6px 10px;
		border-radius: 6px;
		font:
			700 14px Poppins,
			sans-serif;
	}

	/* Skeletony */
	.navbar-skeleton {
		position: fixed;
		caret-color: transparent;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 90px;
		overflow: visible;
		flex-wrap: wrap;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 1000;
		user-select: none;
		animation: skeleton-loading 1.5s infinite;
	}
	.sidebar-skeleton {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		width: 336px;
		height: 100vh;
		top: 90px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		padding-top: 20px;
		user-select: none;
		animation: skeleton-loading 1.5s infinite;
	}
	.text-skeletons {
		position: absolute;
		display: flex;
		flex-direction: row;
		gap: 20px;
		margin-left: 400px;
		margin-top: 100px;
	}
	.text-skeleton {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
		border-radius: 4px;
		height: 30px;
		width: 300px;
		margin: 20px auto;
	}
	.sm-text-skeleton {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
		border-radius: 4px;
		height: 20px;
		width: 150px;
		margin: 5px auto;
	}
	.sm-textx {
		display: flex;
		flex-direction: row;
		gap: 10px;
		margin-top: 50px;
	}
	.setting-container-skeleton {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
		border-radius: 10px;
		height: 118px;
		width: 376px;
	}
	.left-setting-container-skeletons {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 20px;
		position: absolute;
		margin-left: 400px;
		margin-top: 250px;
		z-index: 1;
	}
	.icon {
		position: absolute;
		width: 20px;
		height: 20px;
		pointer-events: none;
		padding-top: 34px;
		padding-left: 10px;
	}
	@keyframes skeleton-loading {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
