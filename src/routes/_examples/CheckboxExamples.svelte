<script lang="ts">
	import { sendNotification } from '../../stores';

	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Example from '../_components/Example.svelte';

	let disabled = false;
</script>

<Example name="Checkbox">
	<div slot="component" class="component">
		<Checkbox {disabled}>Sterling</Checkbox>
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
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
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		padding: 0;
	}
</style>
