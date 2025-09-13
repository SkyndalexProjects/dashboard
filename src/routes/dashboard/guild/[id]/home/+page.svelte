<script lang="ts">
	import { page } from '$app/state';
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { linear } from 'svelte/easing';

	import { curveCatmullRom } from 'd3-shape';
	import { LineChart, Axis, Layer, Spline, Highlight, Tooltip } from 'layerchart';
	const guildId = page.params.id;
	console.log('guildId', guildId);
	const { data } = $props();

	const selectedGuild = data.guilds?.find((g: { id: string }) => g.id === guildId);

	// Initial data for the chart

	const revenueData = [
		{ date: new Date('2023-02-01'), value: 0 },
		{ date: new Date('2023-03-01'), value: 30 },
		{ date: new Date('2023-04-01'), value: 25 },
		{ date: new Date('2023-05-01'), value: 5 },
		{ date: new Date('2023-06-01'), value: 20 },
		{ date: new Date('2023-07-01'), value: 35 }
	];

	const lossData = [
		{ date: new Date('2023-02-01'), value: 0 },
		{ date: new Date('2023-03-01'), value: 20 },
		{ date: new Date('2023-04-01'), value: 10 },
		{ date: new Date('2023-05-01'), value: 10 },
		{ date: new Date('2023-06-01'), value: 20 },
		{ date: new Date('2023-07-01'), value: 0 }
	];

	let debug = false;
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

<div class="app">
	<div class="alerts">
		<Alert type="info">
			You did not join our discord support guild. It is highly recommended to keep up to date with
			the changes in the bot that are currently being intensively carried out
		</Alert>
		<Alert type="warning">
			Dashboard is still under BETA version. Stable release will be out after v1.0.0
		</Alert>
	</div>
</div>

<div class="economy-charts">
	Economy charts
	<svg xmlns="http://www.w3.org/2000/svg" width="165" height="2" viewBox="0 0 165 2" fill="none">
		<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
	</svg>

	<div class="chart" data-slot="chart">
		<svg
			width="770"
			height="1"
			viewBox="0 0 770 1"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="chart-divider"
		>
			<line y1="0.5" x2="770" y2="0.5" stroke="#E5E5EF" />
		</svg>

		<div class="headers">
			<p class="chart-category-title">Entire guild stats</p>
			<p class="chart-title">Total economy earnings</p>
		</div>

		<div class="lines-info">
			<div class="loss">
				<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="4.86206" cy="4.5" r="4.13794" fill="#D83C3C" />
				</svg>
				Loss
			</div>
			<div class="revenue">
				<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="4.86206" cy="4.5" r="4.13794" fill="#27E761" />
				</svg>
				Revenue
			</div>
		</div>
		<LineChart
			x="date"
			y="value"
			series={[
				{
					data: revenueData,
					key: 'Revenue',
					color: '#27E761'
				},
				{
					data: lossData,
					key: 'Loss',
					color: '#D83C3C'
				}
			]}
			yNice
			renderContext="svg"
			padding={{ top: 150, right: 10, bottom: 40, left: 50 }}
		>
			{#snippet children({ context })}
				<Layer type="svg">
					<Axis
						placement="left"
						grid
						style="stroke: rgba(255,255,255,0.2); fill: #615E83; font-size: 15px;"
					/>
					<Axis
						placement="bottom"
						rule
						style="fill: #615E83; font-size: 15px; font-family: Inter, sans-serif; font-weight: 400;"
					/>

					<Spline
						data={revenueData}
						x="date"
						y="value"
						curve={curveCatmullRom}
						draw={{ duration: 1000, easing: linear }}
						style="stroke: #27E761; stroke-width: 3; fill: none; stroke-dasharray: 10,10;"
					/>

					<Spline
						data={lossData}
						x="date"
						y="value"
						curve={curveCatmullRom}
						draw={{ duration: 1000, easing: linear }}
						style="stroke: #D83C3C; stroke-width: 3; fill: none; stroke-dasharray: 10, 10;"
					/>
				</Layer>
			{/snippet}
		</LineChart>
	</div>
</div>

<style>
	.app {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-left: 373px;
		flex-direction: column;
		caret-color: transparent;
	}
	.alerts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: max-content;
		margin-top: 100px;
		gap: 20px;
	}
	.economy-charts {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 35px;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-left: 375px;
	}
	.chart {
		margin-top: 30px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		width: 809px;
		height: 537px;
		z-index: -1;
	}
	.chart-divider {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 120px;
		margin-left: 20px;
	}
	.headers {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 35px;
		margin-left: 20px;
	}
	.chart-category-title {
		color: #9291a5;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font:
			400 18px Inter,
			sans-serif;
		margin-top: 0;
	}
	.chart-title {
		color: #3e6bff;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font:
			700 22px Poppins,
			sans-serif;
		margin-top: 0;
	}
	.lines-info {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		margin: 40px 0 0 590px;
	}

	.loss,
	.revenue {
		display: inline-flex;
		height: 35px;
		align-items: center;
		flex-shrink: 0;
		gap: 6px;
		border: 1px solid rgba(229, 229, 239, 0.21);
		border-radius: 8px;
		color: #3e6bff;
		text-align: center;
		font:
			400 15px Poppins,
			sans-serif;
		font-feature-settings:
			'liga' off,
			'clig' off;
	}

	.loss {
		justify-content: flex-end;
		padding: 0 12px;
	}

	.revenue {
		justify-content: center;
		width: 105px;
		gap: 9px;
	}
</style>
