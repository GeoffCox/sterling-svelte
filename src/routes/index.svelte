<script lang="ts">
	import { notification } from '../stores';
	import { currentTheme } from './_components/useCurrentTheme';

	import ExampleCard from './_components/ExampleCard.svelte';
	import BaseLayer from '$lib/BaseLayer.svelte';

	import CheckboxExamples from './_examples/CheckboxExamples.svelte';
	import InputExamples from './_examples/InputExamples.svelte';
	import RadioExamples from './_examples/RadioExamples.svelte';
	import ButtonExamples from './_examples/ButtonExamples.svelte';
	import BaseLayerExamples from './_examples/BaseLayerExamples.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
import ListExamples from './_examples/ListExamples.svelte';

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
	};
</script>

<div class="app" use:currentTheme={{ darkMode }} class:darkMode>
	<BaseLayer>
		<div class="notification">{$notification}</div>
		<div>
			<Checkbox checked={darkMode} on:click={toggleDarkMode}
				><div slot="after">Dark Mode</div></Checkbox
			>
		</div>
		<ListExamples />
		<BaseLayerExamples />
		<ButtonExamples />
		<CheckboxExamples />
		<InputExamples />
		<RadioExamples />
	</BaseLayer>
</div>

<style>
	.notification {
		width: 100%;
		background: aliceblue;
		color: steelblue;
		font-size: 0.9rem;
		text-align: center;
		padding: 5px;
		position: sticky;
		top: 0;
		height: 0.9rem;
		z-index: 1;
	}
</style>
