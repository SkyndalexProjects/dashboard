<script lang="ts">
    const { tabs = [], selectedTab = '', onTabSelect = () => {}, children, style = '' } = $props();
    let activeTab = $state(selectedTab || (tabs.length > 0 ? tabs[0] : ''));
    function selectTab(tab: string) {
        activeTab = tab;
        onTabSelect(tab);
    }
</script>

<div class="tabs {style}">
    {#each tabs as tab}
        <button class="tab" class:selected={tab === activeTab} onclick={() => selectTab(tab)}>
            {tab}
        </button>
    {/each}
</div>
{@render children?.()}

<style>
    .tabs {
        display: flex;
        border-bottom: 2px solid var(--tabs-border-color, #e0e0e0);
        width: max-content;
        padding-bottom: var(--tabs-padding-bottom, 0.5rem);
        z-index: 1;
    }
    .tab {
        background: var(--tab-background, none);
        border: none;
        cursor: pointer;
        font-size: var(--tab-font-size, 1rem);
        border-bottom: 2px solid #ffffff;
        transition: border-color 0.2s, color 0.2s, background 0.2s;
        color: var(--tab-color, #858585);
        width: var(--tab-width, auto);
        height: var(--tab-height, auto);
    }
    .tab.selected {
        color: var(--tab-selected-color, #ffffff);
        font-weight: var(--tab-selected-weight, bold);
        border-bottom: 2px solid #275EE7;
        background: var(--tab-selected-background, var(--tab-background, none));
        width: var(--tab-selected-width, auto);
        height: var(--tab-selected-height, auto);
    }
    .tab:hover:not(.selected) {
        color: var(--tab-hover-color, #333);
    }
</style>
