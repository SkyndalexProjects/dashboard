<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Item {
		id: string;
		name: string;
	}

	let {
		menuItems = [],
		placeholder = '',
		inputValue = '',
		icon = '',
		multiSelect = false,
		onChange
	}: {
		menuItems?: Item[];
		placeholder?: string;
		inputValue?: string;
		icon?: string;
		multiSelect?: boolean;
		onChange?: (value: string | string[]) => void;
	} = $props();

	let filteredItems: Item[] = $state([]);
	let showDropdown = $state(false);
	let selectedItems: Item[] = $state([]);
	let inputEl: HTMLInputElement | null = $state(null);

	function handleInput() {
		const q = inputValue.toLowerCase();
		filteredItems = menuItems.filter((item) => item?.name?.toLowerCase().includes(q));
		showDropdown = true;
	}

	function handleFocus() {
		filteredItems = menuItems;
		showDropdown = true;
	}

	function handleBlur() {
		if (multiSelect) return;
		setTimeout(() => (showDropdown = false), 100);
	}
	function selectItem(item: Item) {
		if (multiSelect) {
			const exists = selectedItems.some((i) => i.id === item.id);
			selectedItems = exists
				? selectedItems.filter((i) => i.id !== item.id)
				: [...selectedItems, item];

			inputValue = '';
			filteredItems = menuItems;
			onChange?.(selectedItems.map((i) => i.id));
		} else {
			inputValue = item.name;
			showDropdown = false;
			onChange?.(item.id);
		}
	}
	function clickOutside(node: HTMLElement) {
		const onPointerDown = (e: PointerEvent) => {
			if (!node.contains(e.target as Node)) showDropdown = false;
		};
		document.addEventListener('pointerdown', onPointerDown, true);
	}
	function removeSelected(itemId: string) {
		selectedItems = selectedItems.filter((i) => i.id !== itemId);
		onChange?.(selectedItems.map((i) => i.id));
	}
</script>

<div class="autocomplete-container" class:has-icon={!!icon} use:clickOutside>
	{#if icon}
		<img src={icon} alt="Search Icon" class="icon" />
	{/if}

	{#if multiSelect}
		<button
			class="input-tags"
			tabindex="0"
			onfocusin={handleFocus}
			onclick={() => inputEl && inputEl.focus()}
		>
			{#each selectedItems as item, index (`${item.id}-${index}`)}
				<span class="selected-item">
					{item.name}
					<span
						class="remove-btn"
						role="button"
						tabindex="0"
						onclick={() => removeSelected(item.id)}
						onkeydown={(e) => e.key === 'Enter' && removeSelected(item.id)}>×</span
					>
				</span>
			{/each}

			<input
				id="searchInput"
				type="text"
				placeholder={selectedItems.length === 0 ? placeholder : ''}
				autocomplete="off"
				bind:this={inputEl}
				bind:value={inputValue}
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleBlur}
			/>
		</button>
	{:else}
		<input
			id="searchInput"
			type="text"
			{placeholder}
			autocomplete="off"
			bind:value={inputValue}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
		/>
	{/if}

	<img src="/icons/indicator.svg" alt="indicator" class="indicator" class:rotated={showDropdown} />

	{#if showDropdown && filteredItems.length > 0}
		<ul class="dropdown" transition:slide={{ duration: 200 }}>
			{#each filteredItems as item, index (`${item.id}-${index}`)}
				<button
					type="button"
					class="dropdown-item"
					class:selected={selectedItems.some((i) => i.id === item.id)}
					value={item.id}
					onmousedown={() => selectItem(item)}
				>
					{item.name}
					{#if multiSelect && selectedItems.some((i) => i.id === item.id)}✓{/if}
				</button>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.autocomplete-container {
		position: relative;
		display: inline-block;
		width: 303px;
	}

	button {
		all: unset;
		cursor: pointer;
	}

	#searchInput {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		font-size: 1.2rem;
		border: 1px solid #8e8e8e;
		background: rgba(32, 32, 32, 0.1);
		border-radius: 10px;
		color: #ffffff;
		width: 100%;
		height: 42px;
		padding: 0 34px 0 12px;
		font-family: Poppins, sans-serif;
		font-weight: 700;
	}
	.has-icon #searchInput {
		padding-left: 32px;
	}

	.input-tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
		box-sizing: border-box;
		width: 100%;
		border: 1px solid #8e8e8e;
		background: rgba(32, 32, 32, 0.1);
		border-radius: 10px;
		color: #ffffff;
		padding: 6px 34px 6px 12px;
		font-family: Poppins, sans-serif;
		font-weight: 700;
		max-height: 170px;
		overflow-y: auto;
		height: 50px;
	}
	.has-icon .input-tags {
		padding-left: 32px;
	}

	.input-tags #searchInput {
		border: none;
		outline: none;
		background: transparent;
		height: auto;
		padding: 0;
		flex: 1;
		min-width: 60px;
		color: #ffffff;
		font-family: inherit;
		font-weight: inherit;
		font-size: 1.2rem;
		max-height: 100px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		overflow-y: hidden;
	}

	.dropdown {
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 10001;
		border-radius: 10px;
		max-height: 200px;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: none;
		padding: 0;
		list-style: none;
		background-color: #0f1117;
		border-left: 1px solid rgba(255, 255, 255, 0.2);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.dropdown::-webkit-scrollbar {
		display: none;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.dropdown-item {
		display: flex;
		align-items: flex-start;
		padding: 10px;
		cursor: pointer;
		color: #ffffff;
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 700;
		transition: background-color 0.2s ease;
		border-radius: 5px;
		border: none;
		width: 100%;
		text-align: left;
		z-index: 10001;
	}
	.dropdown-item:hover {
		background-color: rgba(62, 107, 255, 0.15);
	}
	.dropdown-item.selected {
		background-color: rgba(62, 107, 255, 0.35);
	}

	.selected-item {
		background: #3e6bff;
		color: #fff;
		border-radius: 5px;
		padding: 3px 8px;
		font-size: 13px;
		display: flex;
		align-items: center;
	}

	.icon {
		position: absolute;
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		pointer-events: none;
	}

	.indicator {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 15px;
		height: 15px;
		pointer-events: none;
		transition: transform 0.3s ease;
	}
	.rotated {
		transform: translateY(-50%) rotate(180deg);
	}
</style>
