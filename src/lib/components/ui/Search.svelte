<script lang="ts">
	import { slide } from 'svelte/transition';

	let { menuItems = [], placeholder = '', inputValue = '', icon = '' } = $props();

	let filteredItems: string[] = $derived([]);
	let showDropdown = $state(false);

	function handleInput(event: Event) {
		filteredItems = menuItems.filter((item) => item.toLowerCase().match(inputValue.toLowerCase()));
		showDropdown = true;
	}

	function handleFocus() {
		filteredItems = menuItems;
		showDropdown = true;
	}

	function handleBlur() {
		setTimeout(() => (showDropdown = false), 100);
	}
	function selectItem(item: string) {
		inputValue = item;
		showDropdown = false;
	}
</script>

<div class="autocomplete-container">
	<img src={icon} alt="Search Icon" class="icon" />

	<input
		type="text"
		{placeholder}
		autocomplete="off"
		id="searchInput"
		bind:value={inputValue}
		oninput={handleInput}
		onfocus={handleFocus}
		onblur={handleBlur}
	/>

	<img src="/icons/indicator.svg" alt="indicator" class="indicator" class:rotated={showDropdown} />
	{#if showDropdown && filteredItems.length > 0}
		<ul class="dropdown" transition:slide={{ duration: 200 }}>
			{#each filteredItems as item}
				<button type="button" class="dropdown-item" onmousedown={() => selectItem(item)}>
					{item}
				</button>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.autocomplete-container {
		position: relative;
		display: inline-block;
	}

	button {
		all: unset;
	}
	#searchInput {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		box-sizing: border-box;
		font-size: 1.2rem;
		border: 1px solid #8e8e8e;
		background: rgba(32, 32, 32, 0.1);
		border-radius: 10px;
		border-bottom: 1px solid #ddd;
		color: #ffffff;
		width: 303px;
		height: 42px;
		padding-left: 40px;
		font-family: Poppins, sans-serif;
		font-weight: 700;
	}
	.dropdown {
		position: absolute;
		z-index: 10001;
		top: 100%;
		left: 0;
		width: 303px;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
		border-radius: 10px;
		height: auto;
		max-height: 200px;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: none;
		padding: 0;
		list-style: none;
		margin-top: 10px;
	}

	.dropdown::-webkit-scrollbar {
		display: none;
	}
	.dropdown-item {
		position: relative;
		z-index: 10001;
		display: flex;
		align-items: flex-start;
		padding: 10px;
		cursor: pointer;
		color: #ffffff;
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 700;
		background-color: black;
		transition: background-color 0.2s ease;
		margin-bottom: 10px;
		border-radius: 5px;
		border: none;
		width: 100%;
		text-align: left;
	}
	.dropdown-item:hover {
		background-color: rgba(62, 107, 255, 0.15);
	}
	.icon {
		position: absolute;
		left: 2px;
		top: 50%;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
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
