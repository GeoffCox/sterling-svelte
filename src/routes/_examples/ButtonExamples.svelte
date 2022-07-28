<script lang="ts">
	import { sendNotification } from '../../stores';

	import Button from '$lib/buttons/Button.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import GhostButton from '$lib/buttons/GhostButton.svelte';
	import OutlineButton from '$lib/buttons/OutlineButton.svelte';

	import Example from '../_components/Example.svelte';
	import SvelteIcon from '../_components/SvelteIcon.svelte';

	let buttonDisabled = false;
	let buttonWithText = true;
	let buttonWithIcon = true;

	let outlineButtonDisabled = false;
	let outlineButtonWithText = true;
	let outlineButtonWithIcon = true;

	let ghostButtonDisabled = false;
	let ghostButtonWithText = true;
	let ghostButtonWithIcon = true;
</script>

<div>
	<Example name="Button">
		<div class="component" slot="component">
			<Button disabled={buttonDisabled} on:click={() => sendNotification('Button clicked')}>
				{#if buttonWithIcon}
					<SvelteIcon />
				{/if}
				{#if buttonWithText}
					Sterling
				{/if}
			</Button>
		</div>
		<div class="options" slot="options">
			<div />
			<div>
				<Checkbox bind:checked={buttonDisabled}>
					<svelte:fragment slot="after">disabled</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={buttonWithText}>
					<svelte:fragment slot="after">with text</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={buttonWithIcon}>
					<svelte:fragment slot="after">with icon</svelte:fragment>
				</Checkbox>
			</div>
		</div>
	</Example>
	<Example name="OutlineButton">
		<div class="component" slot="component">
			<OutlineButton
				disabled={outlineButtonDisabled}
				on:click={() => sendNotification('OutlineButton clicked')}
			>
				{#if outlineButtonWithIcon}
					<SvelteIcon />
				{/if}
				{#if outlineButtonWithText}
					Sterling
				{/if}
			</OutlineButton>
		</div>
		<div class="options" slot="options">
			<div />
			<div>
				<Checkbox bind:checked={outlineButtonDisabled}>
					<svelte:fragment slot="after">disabled</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={outlineButtonWithText}>
					<svelte:fragment slot="after">with text</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={outlineButtonWithIcon}>
					<svelte:fragment slot="after">with icon</svelte:fragment>
				</Checkbox>
			</div>
		</div>
	</Example>
	<Example name="GhostButton">
		<div class="component" slot="component">
			<GhostButton
				disabled={ghostButtonDisabled}
				on:click={() => sendNotification('OutlineButton clicked')}
			>
				{#if ghostButtonWithIcon}
					<SvelteIcon />
				{/if}
				{#if ghostButtonWithText}
					Sterling
				{/if}
			</GhostButton>
		</div>
		<div class="options" slot="options">
			<div />
			<div>
				<Checkbox bind:checked={ghostButtonDisabled}>
					<svelte:fragment slot="after">disabled</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={ghostButtonWithIcon}>
					<svelte:fragment slot="after">with icon</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={ghostButtonWithText}>
					<svelte:fragment slot="after">with text</svelte:fragment>
				</Checkbox>
			</div>
		</div>
	</Example>
</div>

<style>
	.options {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 1rem;
		margin-bottom: 1rem;
		width: max-content;
		padding: 50px;
	}

	.component {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		padding: 0;
	}
</style>
