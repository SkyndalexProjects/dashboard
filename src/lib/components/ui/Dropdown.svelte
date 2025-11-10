<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface DropdownProps {
		position?: 'left' | 'right' | 'center';
		maxWidth?: string;
		trigger?: Snippet;
		items?: Snippet;
	}

	const { trigger, items }: DropdownProps = $props();

	let isDropdownOpen = $state(false);
	let dropdownRef: HTMLDivElement;

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: FocusEvent) => {
		if (
			relatedTarget instanceof HTMLElement &&
			currentTarget instanceof HTMLElement &&
			currentTarget.contains(relatedTarget)
		)
			return;
		isDropdownOpen = false;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isDropdownOpen = false;
		}
	};

	$effect(() => {
		if (isDropdownOpen) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="dropdown-container" bind:this={dropdownRef}>
	<div class="dropdown" onfocusout={handleDropdownFocusLoss}>
		<button class="dropdown-trigger" onclick={handleDropdownClick}>
			{#if trigger}
				{@render trigger()}
			{:else}
				<div class="default-trigger">
					{#if isDropdownOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="inline-block h-6 w-6 stroke-current"
						>
							<title>Close Dropdown</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="inline-block h-6 w-6 stroke-current"
						>
							<title>Open Dropdown</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</div>
			{/if}
		</button>

		{#if isDropdownOpen}
			<div class="dropdown-menu" transition:slide={{ duration: 200 }}>
				{#if items}
					<div class="dropdown-items-container">
						{@render items()}
					</div>
				{:else}
					<button class="dropdown-item">Item 1</button>
					<button class="dropdown-item">Item 2</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	button {
		all: unset;
	}
	.dropdown-container {
		position: relative;
		display: inline-block;
	}
	.dropdown-trigger {
		cursor: pointer;
		padding: 0;
	}

	.default-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.dropdown-items-container {
		width: max-content;
		max-height: 300px;
		overflow-y: auto;
		scrollbar-width: none;
		scrollbar-color: transparent transparent;
		-ms-overflow-style: none;
	}
	.default-trigger:hover {
		background-color: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.dropdown-menu {
		width: max-content;
		position: absolute;
		top: 100%;
		left: 0;
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		border-radius: 8px;
		background: linear-gradient(180deg, var(--color-bg-start) 0%, var(--color-bg-end) 100%);
	}
	.dropdown-item {
		background-color: black;
		transition: background-color 0.2s ease;
		display: flex;
		flex-direction: column;
		color: #ffffff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 14px;
		font-weight: 500;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.dropdown-item:hover {
		background-color: rgba(62, 107, 255, 0.15);
	}

	.dropdown-item:focus {
		outline: none;
		background-color: rgba(62, 107, 255, 0.25);
	}
</style>
