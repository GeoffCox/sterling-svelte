<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { notification } from '../stores';
	import { currentTheme } from './_components/useCurrentTheme';

	import BaseLayer from '$lib/BaseLayer.svelte';
	import CheckboxExamples from './_examples/CheckboxExamples.svelte';
	import InputExamples from './_examples/InputExamples.svelte';
	import RadioExamples from './_examples/RadioExamples.svelte';
	import SelectExamples from './_examples/SelectExample.svelte';
	import ButtonExamples from './_examples/ButtonExamples.svelte';
	import BaseLayerExamples from './_examples/BaseLayerExamples.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import ListExamples from './_examples/ListExamples.svelte';
	import List from '$lib/lists/List.svelte';
	import ProgressExamples from './_examples/ProgressExamples.svelte';

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
	};

	const examples: Record<string, { name: string; component: typeof SvelteComponent }> = {
		select: {
			name: 'Select',
			component: SelectExamples
		},
		input: {
			name: 'Input',
			component: InputExamples
		},
		list: {
			name: 'List',
			component: ListExamples
		},
		baseLayer: {
			name: 'BaseLayer',
			component: BaseLayerExamples
		},
		button: {
			name: 'Button',
			component: ButtonExamples
		},
		checkbox: {
			name: 'Checkbox',
			component: CheckboxExamples
		},
		radio: {
			name: 'Radio',
			component: RadioExamples
		},
		progress: {
			name: 'Progress',
			component: ProgressExamples
		}
	};

	const exampleKeys: string[] = Object.keys(examples);

	let selectedExampleIndex = 0;
	$: selectedExampleKey = exampleKeys[selectedExampleIndex];
	$: selectedExample = examples[selectedExampleKey].component;
</script>

<div class="app" use:currentTheme={{ darkMode }} class:darkMode>
	<BaseLayer>
		<div class="notification">{$notification}</div>
		<div>
			<Checkbox checked={darkMode} on:click={toggleDarkMode}
				><div slot="after">Dark Mode</div></Checkbox
			>
		</div>
		<div class="examples">
			<div class="example-list">
				<List items={exampleKeys} bind:selectedIndex={selectedExampleIndex} let:item let:index>
					{examples[exampleKeys[index]].name}
				</List>
			</div>
			<div class="example">
				<svelte:component this={selectedExample} />
			</div>
		</div>
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

	.examples {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.example-list {
		align-self: flex-start;
	}
</style>
