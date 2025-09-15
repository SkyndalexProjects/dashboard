<script lang="ts">
	import { page } from '$app/state';
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import geti18ncontext from '$lib/i18n';
	const i18n = geti18ncontext();
	const guildId = page.params.id;
	console.log('guildId', guildId);
	const { data } = $props();
	import Tab from '$lib/components/ui/Tab.svelte';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Search from '$lib/components/ui/Search.svelte';
	import type { APIChannel } from 'discord-api-types/v10';
	const selectedGuild = data.guilds?.find((g: { id: string }) => g.id === guildId);
	let selectedTab = $state('Greetings');
	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}
	const filteredChannels = data.channels.filter((channel: APIChannel) => {
		return channel.type === 'GuildText';
	});
	const channelNames = filteredChannels.map((channel: APIChannel) => channel.name);
</script>

<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<ManagementNavbar {selectedGuild} user={data.user} guilds={data.guilds} />
<Sidebar guildId={selectedGuild.id} />

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
						<Search menuItems={channelNames} />
					</div>
					<div class="setting-container">
						WELCOME TITLE
						<input
							type="text"
							placeholder="Welcome to the server, {data?.user?.username}!"
							class="text-input"
						/>
					</div>
				</div>
			{:else if selectedTab === 'Goodbye'}
				<div>Goodbye settings</div>
			{/if}
		</Tab>
	</div>
</div>

<style>
	.welcome-settings {
		position: absolute;
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
		transform: rotate(0.254deg);
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
		z-index: 10;
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
		padding-left: 10px;
		font-weight: 700;
		z-index: 0;
	}
</style>
