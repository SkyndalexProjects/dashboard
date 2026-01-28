<script lang="ts">
	import geti18ncontext from '$lib/i18n';
	import { asName } from '$lib/utils';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	const i18n = geti18ncontext();

	const { data } = $props();
	const origin = (PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

	interface Channel {
		id: string;
		guildId: string;
		name: string;
		type: string;
	}
	interface Settings {
		radioChannel: string;
		radioStation: string;
		radioProvider: 'radio.garden' | 'radio-browser';
	}
	type Item = { id: string; name: string };
	interface RadioGardenSearchResult {
		hits: {
			hits: {
				_id: string;
				_source: {
					code: string;
					subtitle: string;
					type: string;
					title: string;
					secure: boolean;
					url: string;
				};
			}[];
		};
	}
	interface RadioBrowserStation {
		stationuuid: string;
		name: string;
		url: string;
		url_resolved: string;
		favicon: string;
		country: string;
	}

	function textChannelItems(chs: Channel[] | null | undefined): Item[] {
		const arr = Array.isArray(chs) ? chs : [];
		return arr
			.filter((c) => c && c.type === 'GuildText')
			.map((c) => {
				const name = String(c.name);
				return { id: name, name };
			});
	}
	function formatExecutionDate(timestamp: number): string {
		const date = new Date(timestamp);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).slice(-2);
		const hour = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${day}.${month}.${year} ${hour}:${minutes}`;
	}

	import Search from '$lib/components/ui/Search.svelte';
	import Switch from '$lib/components/ui/Switch.svelte';
	import { curveCatmullRom } from 'd3-shape';
	import { linear } from 'svelte/easing';
	import { Axis, Layer, LineChart, Spline } from 'layerchart';

	const defaultRadioSettings: Settings = {
		radioChannel: '',
		radioStation: '',
		radioProvider: 'radio.garden'
	};

	const equalizerPresets = [
		{
			id: 'standard',
			name: 'Standard',
			gains: [
				{ band: 0, gain: 0.0 },
				{ band: 1, gain: 0.0 },
				{ band: 2, gain: 0.0 },
				{ band: 3, gain: 0.0 },
				{ band: 4, gain: 0.0 },
				{ band: 5, gain: 0.0 },
				{ band: 6, gain: 0.0 },
				{ band: 7, gain: 0.0 },
				{ band: 8, gain: 0.0 },
				{ band: 9, gain: 0.0 },
				{ band: 10, gain: 0.0 },
				{ band: 11, gain: 0.0 },
				{ band: 12, gain: 0.0 },
				{ band: 13, gain: 0.0 },
				{ band: 14, gain: 0.0 }
			]
		},

		{
			id: 'bass-boost',
			name: 'Bass Boost',
			gains: [
				{ band: 0, gain: 0.12 },
				{ band: 1, gain: 0.12 },
				{ band: 2, gain: 0.1 },
				{ band: 3, gain: 0.08 },
				{ band: 4, gain: 0.05 },
				{ band: 5, gain: 0.02 },
				{ band: 6, gain: 0.0 },
				{ band: 7, gain: -0.02 },
				{ band: 8, gain: -0.03 },
				{ band: 9, gain: -0.04 },
				{ band: 10, gain: -0.05 },
				{ band: 11, gain: -0.05 },
				{ band: 12, gain: -0.04 },
				{ band: 13, gain: -0.03 },
				{ band: 14, gain: -0.02 }
			]
		},

		{
			id: 'treble-boost',
			name: 'Treble Boost',
			gains: [
				{ band: 0, gain: -0.05 },
				{ band: 1, gain: -0.05 },
				{ band: 2, gain: -0.04 },
				{ band: 3, gain: -0.02 },
				{ band: 4, gain: 0.0 },
				{ band: 5, gain: 0.02 },
				{ band: 6, gain: 0.04 },
				{ band: 7, gain: 0.06 },
				{ band: 8, gain: 0.08 },
				{ band: 9, gain: 0.1 },
				{ band: 10, gain: 0.11 },
				{ band: 11, gain: 0.12 },
				{ band: 12, gain: 0.12 },
				{ band: 13, gain: 0.1 },
				{ band: 14, gain: 0.08 }
			]
		},

		{
			id: 'vocal',
			name: 'Vocal',
			gains: [
				{ band: 0, gain: -0.08 },
				{ band: 1, gain: -0.06 },
				{ band: 2, gain: -0.04 },
				{ band: 3, gain: -0.02 },
				{ band: 4, gain: 0.02 },
				{ band: 5, gain: 0.05 },
				{ band: 6, gain: 0.09 },
				{ band: 7, gain: 0.11 },
				{ band: 8, gain: 0.12 },
				{ band: 9, gain: 0.1 },
				{ band: 10, gain: 0.08 },
				{ band: 11, gain: 0.05 },
				{ band: 12, gain: 0.02 },
				{ band: 13, gain: 0.0 },
				{ band: 14, gain: -0.02 }
			]
		},

		{
			id: 'rock',
			name: 'Rock',
			gains: [
				{ band: 0, gain: 0.08 },
				{ band: 1, gain: 0.1 },
				{ band: 2, gain: 0.08 },
				{ band: 3, gain: 0.04 },
				{ band: 4, gain: -0.02 },
				{ band: 5, gain: -0.04 },
				{ band: 6, gain: -0.03 },
				{ band: 7, gain: 0.02 },
				{ band: 8, gain: 0.06 },
				{ band: 9, gain: 0.09 },
				{ band: 10, gain: 0.11 },
				{ band: 11, gain: 0.1 },
				{ band: 12, gain: 0.08 },
				{ band: 13, gain: 0.06 },
				{ band: 14, gain: 0.05 }
			]
		}
	];
	let currentPresetIndex = $state(0);
	async function changePreset(direction: 'next' | 'previous') {
		const newIndex = direction === 'next' ? currentPresetIndex + 1 : currentPresetIndex - 1;

		if (newIndex < 0 || newIndex >= equalizerPresets.length) return;

		try {
			const response = await fetch(`${origin}/api/guilds/${data.guild.id}/radio_player`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					presetId: equalizerPresets[newIndex].id,
					guildId: data.guildId
				})
			});

			if (response.ok) {
				currentPresetIndex = newIndex;
				isDirty = true;
			}
		} catch (error) {
			console.error('Failed to change preset:', error);
		}
	}
	let currentPreset = $derived(equalizerPresets[currentPresetIndex]);
	let canGoPrevious = $derived(currentPresetIndex > 0);
	let canGoNext = $derived(currentPresetIndex < equalizerPresets.length - 1);
	let stationItems: Item[] = $state([]);
	let stationSearchQuery = $state('');
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	let equalizerData = $derived(
		currentPreset.gains.map((item) => ({
			band: item.band,
			value: item.gain * 10
		}))
	);

	let settings: Settings = $state({ ...defaultRadioSettings });
	let isDirty = $state(false);
	let isRadioBrowser = $state(false);

	$effect(() => {
		const newProvider = isRadioBrowser ? 'radio-browser' : 'radio.garden';
		if (settings.radioProvider !== newProvider) {
			settings.radioProvider = newProvider;
			settings.radioStation = '';
			stationItems = [];
			stationSearchQuery = '';
			isDirty = true;
		}
	});
	async function searchRadioGarden(query: string): Promise<Item[]> {
		if (!query.trim()) return [];
		try {
			const res = await fetch(`/radio-garden-api/search?q=${encodeURIComponent(query)}`);
			if (!res.ok) return [];
			const data: RadioGardenSearchResult = await res.json();
			return data.hits.hits
				.filter((hit) => hit._source.type === 'channel')
				.slice(0, 25)
				.map((hit) => ({
					id: hit._source.page.url,
					name: `${hit._source.page.title}`
				}));
		} catch {
			return [];
		}
	}
	async function searchRadioBrowser(query: string): Promise<Item[]> {
		if (!query.trim()) return [];
		try {
			const res = await fetch(
				`https://de1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(query)}?limit=25`
			);
			if (!res.ok) return [];
			const data: RadioBrowserStation[] = await res.json();
			return data.map((station) => ({
				id: station.stationuuid,
				name: station.name
			}));
		} catch {
			return [];
		}
	}
	async function handleStationSearch(query: string) {
		stationSearchQuery = query;
		if (searchTimeout) clearTimeout(searchTimeout);

		searchTimeout = setTimeout(async () => {
			const results = isRadioBrowser
				? await searchRadioBrowser(query)
				: await searchRadioGarden(query);
			stationItems = results;
		}, 300);
	}
	function handleChannelChange(value: string | string[]) {
		settings.radioChannel = Array.isArray(value) ? (value[0] ?? '') : value;
		isDirty = true;
	}

	function handleStationChange(value: string | string[]) {
		settings.radioStation = Array.isArray(value) ? (value[0] ?? '') : value;
		isDirty = true;
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
		<p>Channels test</p>
	{:then channels}
		{#await data.radioPlayer then radioPlayer}
			<div class="radio-settings-grid">
				<div class="info-section">
					<div class="section-title-container">
						<div class="section-title">Equalizer</div>
						<div class="underline-vector"></div>
					</div>
					<div class="equalizer-container">
						<div class="equalizer-selector">
							<button
								class="arrow-btn"
								onclick={() => changePreset('previous')}
								disabled={!canGoPrevious}
								aria-label="Previous preset"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="5"
									height="10"
									viewBox="0 0 5 10"
									fill="none"
								>
									<path
										d="M4.89293 1.08607L1.85561 4.55131L4.83193 8.07063L3.89457 9.14006L-0.000289436 4.53462L3.97439 -4.37776e-05L4.89293 1.08607Z"
										fill="white"
									/>
								</svg>
							</button>
							<div class="preset-display">
								<span class="preset-name">{currentPreset.name}</span>
							</div>

							<button
								class="arrow-btn"
								onclick={() => changePreset('next')}
								disabled={!canGoNext}
								aria-label="Next preset"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="5"
									height="10"
									viewBox="0 0 5 10"
									fill="none"
								>
									<path
										d="M0.0609003 1.06935L3.0571 4.58884L-9.63833e-05 8.05391L0.924576 9.14008L4.92527 4.60564L1.0044 -2.3129e-05L0.0609003 1.06935Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
						<div class="chart-container">
							<LineChart
								x="band"
								y="value"
								data={equalizerData}
								yDomain={[0, 10]}
								yNice
								renderContext="svg"
								padding={{ top: 30, right: 30, bottom: 20, left: 60 }}
							>
								{#snippet children()}
									<Layer type="svg">
										<Axis
											placement="left"
											grid
											format={(value) => `${value} dB`}
											style="stroke: rgba(255,255,255,0.2); fill: #615E83; font-size: 12px;"
										/>
										<Spline
											data={equalizerData}
											x="band"
											y="value"
											curve={curveCatmullRom}
											draw={{ duration: 500, easing: linear }}
											style="stroke: #3e6bff; stroke-width: 3; fill: none;"
										/>
									</Layer>
								{/snippet}
							</LineChart>
						</div>
					</div>
				</div>
				<div class="info-section">
					<div class="section-title-container">
						<div class="section-title">Active player</div>
						<div class="underline-vector"></div>
					</div>

					<div class="info-row header-row">
						<div class="id header-title">Voice channel</div>
						<div class="header-title user-header">Station</div>
						<div class="header-title action-header">Executed by</div>
					</div>

					<div class="active-player-container">
						{#if radioPlayer}
							<div class="player-row">
								<div class="voice-channel-box">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
									>
										<path
											d="M5.43923 6.11212C5.37991 6.11212 5.31977 6.09741 5.26252 6.06639C5.05602 5.95437 4.96774 5.67129 5.0654 5.43425C5.24928 4.98851 5.34253 4.51017 5.34253 4.01269C5.34253 3.5122 5.24818 3.03133 5.06237 2.58369C4.96415 2.34697 5.05175 2.06373 5.25811 1.95091C5.46447 1.83857 5.71139 1.93857 5.80974 2.17529C6.04893 2.75157 6.17019 3.36963 6.17019 4.01253C6.17019 4.65163 6.05018 5.26637 5.8136 5.84012C5.74284 6.0118 5.59428 6.11212 5.43923 6.11212ZM6.78996 7.4147C6.70058 7.4147 6.60995 7.38622 6.52911 7.32656C6.30482 7.16105 6.23999 6.81848 6.38427 6.56119C6.80955 5.80262 7.0344 4.92253 7.0344 4.01585C7.0344 3.02025 6.76707 2.06864 6.26137 1.26371C6.10549 1.0156 6.1546 0.669386 6.37089 0.490582C6.58677 0.311463 6.88873 0.367794 7.04488 0.616061C7.66963 1.61071 8 2.78623 8 4.0157C8 5.13535 7.72204 6.22273 7.19634 7.16042C7.10406 7.32498 6.9486 7.4147 6.78996 7.4147ZM0 3.17437C0 2.42625 0.551772 2.06706 0.987671 2.06706L1.43199 2.07861L3.00136 0.27855C3.23876 0.00623144 3.59259 -0.0747837 3.90323 0.0726893C4.2136 0.220162 4.41417 0.564477 4.41417 0.949774V7.05044C4.41417 7.4291 4.21843 7.77104 3.91551 7.92168C3.80943 7.97437 3.69756 8 3.58652 8C3.38015 8 3.17683 7.91139 3.0204 7.74303L1.43792 6.04123L0.968773 6.04297C0.689715 6.0656 0 5.74914 0 4.93534V3.17437Z"
											fill="#E8E8E8"
											fill-opacity="0.51"
										/>
									</svg>
									<span class="voice-channel-name"
										>{asName(radioPlayer.voiceChannelId, channels as Channel[])}</span
									>
								</div>

								<div class="station-info">
									<div class="station-name">{radioPlayer?.radioStation}</div>
									<div class="station-status status-{radioPlayer.status ?? 'playing'}">
										<!--{#if activePlayer.status === 'playing'}-->
										<!--    Playing-->
										<!--{:else if activePlayer.status === 'stopped'}-->
										<!--    Stopped-->
										<!--{:else}-->
										<!--    Switched-->
										<!--{/if}-->

										Playing
									</div>
								</div>

								<div class="executor-section">
									<img
										src={radioPlayer.requestedByAvatarURL}
										alt="avatar"
										class="executor-avatar"
									/>
									<div class="executor-details">
										<div class="executor-username">{radioPlayer.requestedBy}</div>
										<div class="executor-date">
											{formatExecutionDate(radioPlayer.executionDate)}
										</div>
									</div>
								</div>
							</div>
						{:else}
							<div class="no-player">No active player</div>
						{/if}
					</div>
				</div>
				<div class="info-section">
					<div class="section-title-container">
						<div class="section-title">Radio settings</div>
						<div class="underline-vector"></div>
					</div>
					<div class="containers">
						<div class="setting-container dropdown-container">
							CHANNEL
							<Search
								menuItems={textChannelItems(channels as Channel[])}
								onChange={handleChannelChange}
								inputValue={asName(settings.radioChannel, channels as Channel[])}
								icon="/icons/dropdowns/hashtag.svg"
							/>
						</div>
						<div class="setting-container dropdown-container station-container">
							STATION
							<div class="provider-switch">
								<span class:active={!isRadioBrowser}>radio.garden</span>
								<Switch bind:active={isRadioBrowser} />
								<span class:active={isRadioBrowser}>radio-browser</span>
							</div>
							<Search
								menuItems={stationItems}
								onChange={handleStationChange}
								bind:inputValue={stationSearchQuery}
								onInput={handleStationSearch}
								icon="/icons/dropdowns/hashtag.svg"
							/>
						</div>
					</div>
				</div>
			</div>
		{/await}
	{/await}
{/await}

<style>
	.radio-settings-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		gap: 2rem;
	}
	.section-title-container {
		display: inline-block;
		margin-bottom: 1.5rem;
		padding-left: 0;
		margin-left: 0;
	}
	.section-title {
		color: #fff;
		text-align: left;
		font:
			700 20px Poppins,
			sans-serif;
		text-wrap: nowrap;
	}
	.info-section {
		border-radius: 20px;
		min-height: 200px;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}
	.info-section:first-child {
		margin-top: 0;
	}
	.equalizer-container {
		width: 610px;
		height: 350px;
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
	.equalizer-selector {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-radius: 10px 10px 0 0;
		height: 58px;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.4);
	}
	.chart-container {
		box-shadow: 0 2px 6px 0 rgba(13, 10, 44, 0.08);
		background: rgba(0, 0, 0, 0.4);
		border-radius: 0 0 10px 10px;
		width: 100%;
		max-width: 100%;
		height: 287px;
		border-top: none;
		overflow-y: hidden;
		overflow-x: hidden;
	}
	:global(.lc-tooltip-context) {
		all: unset;
		position: absolute;
		margin-left: -50px;
		height: 287px;
		width: 607px;
	}
	:global(.lc-layout-svg) {
		margin-left: 40px;
		color: white;
	}
	.arrow-btn {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 5px;
		width: 23px;
		height: 23px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 10px;
		color: #fff;
		transition:
			background 0.2s ease,
			opacity 0.2s ease;
		flex-shrink: 0;
	}
	:global(.lc-text-svg, .lc-text-tspan, .lc-axis-tick-label) {
		fill: #615e83;
		stroke: none;
		border: none;
		font-weight: 400;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font-size: 16px;
		font-style: normal;
		font-family: Inter, sans-serif;
	}
	.arrow-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
	}

	.arrow-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	.arrow-btn svg {
		display: block;
		width: 5px;
		height: 10px;
	}

	.preset-display {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 10px 10px 0 0;
		align-items: center;
		gap: 20px;
		height: 58px;
		width: 492px;
		background: rgba(0, 0, 0, 0.29);
	}

	.preset-name {
		color: #fff;
		font-size: 18px;
		font-weight: 600;
		font-family: 'Poppins', sans-serif;
	}

	.station-container {
		height: 150px;
	}
	.dropdown-container {
		position: relative;
		z-index: 10001;
		overflow: visible;
	}
	.provider-switch {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 12px;
		font-weight: 500;
	}
	.provider-switch span {
		color: #888;
		transition: color 0.2s ease;
	}
	.provider-switch span.active {
		color: #fff;
	}

	.active-player-container {
		width: 100%;
		max-width: 610px;
	}

	.player-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		padding: 15px 20px;
	}

	.voice-channel-box {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 105.05px;
		height: 29.364px;
		border-radius: 5px;
		background: rgba(0, 0, 0, 0.21);
		flex-shrink: 0;
	}

	.voice-channel-box svg {
		flex-shrink: 0;
	}

	.voice-channel-name {
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}

	.station-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.station-name {
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.station-status {
		font-family: Poppins, sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.station-status.status-playing {
		color: #53f159;
	}

	.station-status.status-stopped {
		color: #d83c3c;
	}

	.station-status.status-switched {
		color: #3e6bff;
	}

	.info-row {
		display: grid;
		grid-template-columns: 40px minmax(150px, 200px) 80px minmax(200px, 250px);
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		margin-top: 3px;
		border-radius: 10px;
		min-width: 550px;
		max-width: 100%;
		width: 100%;
		height: 71px;
		padding: 0 20px;
		box-sizing: border-box;
		transition: 0.3s;
		-webkit-overflow-scrolling: touch;
	}
	.info-row:hover {
		background: rgba(62, 107, 255, 0.21);
	}
	.header-row {
		display: grid;
		grid-template-columns: 110px minmax(230px, 288px) minmax(10px, 10px);
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 10px;
		width: 100%;
		min-width: 550px;
		max-width: 100%;
		height: 46px;
		border-radius: 10px;
		box-sizing: border-box;
	}
	.header-title {
		display: flex;
		align-items: center;
		gap: 6px;
		color: rgba(255, 253, 253, 0.5);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: rgba(0, 0, 0, 0.4);
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		text-wrap: nowrap;
		line-height: normal;
	}
	.executor-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
		margin-left: auto;
	}

	.executor-avatar {
		width: 20px;
		height: 20px;
		border-radius: 50px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.executor-details {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.executor-username {
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.executor-date {
		color: rgba(255, 255, 255, 0.2);
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.no-player {
		background: rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		color: rgba(255, 255, 255, 0.5);
		font-family: Poppins, sans-serif;
		font-size: 14px;
	}
</style>
