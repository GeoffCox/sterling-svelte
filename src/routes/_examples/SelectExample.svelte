<script lang="ts">
	import Select from '$lib/inputs/Select.svelte';
	import { sendNotification } from '../../stores';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Input from '$lib/inputs/Input.svelte';

	const items = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	];

	let disabled = false;
	let label = 'U.S. STATES';
</script>

<Example name="Select">
	<div class="component" slot="component">
		{#if label}
			<Select
				{items}
				{disabled}
				on:itemSelected={(event) => {
					sendNotification(
						`Select: on:select [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
				on:pendingItemSelected={(event) => {
					sendNotification(
						`Select: on:pendingSelect [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
			>
				<svelte:fragment slot="label">{label}</svelte:fragment>
			</Select>
		{:else}
			<Select
				{items}
				{disabled}
				on:itemSelected={(event) => {
					sendNotification(
						`Select: on:select [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
				on:pendingItemSelected={(event) => {
					sendNotification(
						`Select: on:pendingSelect [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
			/>
		{/if}
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
		<div />
		<div>
			<Input bind:value={label}>label</Input>
		</div>
	</div>
</Example>

<style>
	.options {
		align-items: center;
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 1rem;
		margin-bottom: 1rem;
		width: max-content;
		padding: 50px;
	}

	.component {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0;
		height: 410px;
		justify-items: stretch;
	}
</style>
