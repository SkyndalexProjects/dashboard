<script lang="ts">
	const { tabs = [], selectedTab = '', onTabSelect = () => {}, children } = $props();
	let activeTab = $state(selectedTab || (tabs.length > 0 ? tabs[0] : ''));
	function selectTab(tab: string) {
		activeTab = tab;
		onTabSelect(tab);
	}
</script>

<!-- TODO: custom tab styling-->

<div class="tabs">
	{#each tabs as tab}
		<button class:selected={tab === activeTab} onclick={() => selectTab(tab)}>
			{tab}
		</button>
	{/each}
</div>
{@render children?.()}

<style>
	.tabs {
		display: flex;
		gap: 0.5rem;
		border-bottom: 2px solid #e0e0e0;
		width: max-content;
		padding-bottom: 0.5rem;
		z-index: 1;
	}
	button {
		background: none;
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-size: 1rem;
		border-bottom: 2px solid transparent;
		transition:
			border-color 0.2s,
			color 0.2s;
		color: #858585;
	}
	button.selected {
		color: white;
		font-weight: bold;
	}
	button:hover:not(.selected) {
		color: #333;
	}
</style>
