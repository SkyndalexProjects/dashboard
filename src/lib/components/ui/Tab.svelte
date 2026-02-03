<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TabConfig {
		label: string;
		icon?: Snippet;
	}

	const {
		tabs = [],
		selectedTab = '',
		onTabSelect = () => {},
		children,
		style = ''
	} = $props<{
		tabs: (string | TabConfig)[];
		selectedTab?: string;
		onTabSelect?: (tab: string) => void;
		children?: Snippet;
		style?: string;
	}>();

	let activeTab = $state(selectedTab || (tabs.length > 0 ? getTabLabel(tabs[0]) : ''));

	function getTabLabel(tab: string | TabConfig): string {
		return typeof tab === 'string' ? tab : tab.label;
	}

	function selectTab(tab: string | TabConfig) {
		const label = getTabLabel(tab);
		activeTab = label;
		onTabSelect(label);
	}
</script>

<div class="tabs {style}">
	{#each tabs as tab, index (index)}
		{@const label = getTabLabel(tab)}
		<button class="tab" class:selected={label === activeTab} onclick={() => selectTab(tab)}>
			{#if typeof tab === 'object' && tab.icon}
				<span class="tab-icon">
					{@render tab.icon()}
				</span>
			{/if}
			{label}
		</button>
	{/each}
</div>
{@render children?.()}

<style>
	.tabs {
		display: flex;
		width: max-content;
		padding-bottom: var(--tabs-padding-bottom, 0.5rem);
		z-index: 1;
	}
	.tab {
		background: var(--tab-background, none);
		border: none;
		cursor: pointer;
		font-size: var(--tab-font-size);
		border-bottom: var(--tab-border-bottom);
		font-family: var(--tab-font-family, inherit), sans-serif;
		transition:
			border-color 0.2s,
			color 0.2s,
			background 0.2s;
		color: var(--tab-color, #858585);
		width: var(--tab-width, auto);
		height: var(--tab-height, auto);
		text-align: center;
		display: flex;
		align-items: center;
		gap: var(--tab-icon-gap, 8px);
		padding-right: var(--tab-padding-right, 20px);
		border-radius: var(--tab-border-radius, 0);
		font-weight: var(--tab-font-weight, normal);
		min-width: 71px;
		text-wrap: nowrap;
	}
	.tab-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding-left: 10px;
	}
	.tab.selected {
		color: var(--tab-selected-color, #ffffff);
		font-weight: var(--tab-selected-weight, bold);
		border-bottom: var(--tab-selected-border-bottom, 2px solid #ffffff);
		background: var(--tab-selected-background, var(--tab-background, none));
		font-family: var(--tab-selected-font-family, inherit), sans-serif;
		height: var(--tab-selected-height, auto);
		text-align: left;
		padding-right: var(--tab-selected-padding-right, 0);
		border-radius: var(--tab-selected-border-radius, 0);
	}
	.tab:hover:not(.selected) {
		color: var(--tab-hover-color, #333);
	}
</style>
