<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';

	import { currentTheme } from './_components/useCurrentTheme';

	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import List from '$lib/lists/List.svelte';

	import ButtonExamples from './_examples/ButtonExamples.svelte';
	import CheckboxExamples from './_examples/CheckboxExamples.svelte';
	import InputExamples from './_examples/InputExamples.svelte';
	import ListExamples from './_examples/ListExamples.svelte';
	import ProgressExamples from './_examples/ProgressExamples.svelte';
	import RadioExamples from './_examples/RadioExamples.svelte';
	import SelectExamples from './_examples/SelectExample.svelte';
	import SliderExamples from './_examples/SliderExamples.svelte';
	import ThemeExamples from './_examples/ThemeExamples.svelte';

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
	};

	const examples: Record<string, { name: string; component: typeof SvelteComponent }> = {
		button: {
			name: 'Button',
			component: ButtonExamples
		},
		checkbox: {
			name: 'Checkbox',
			component: CheckboxExamples
		},
		input: {
			name: 'Input',
			component: InputExamples
		},
		list: {
			name: 'List',
			component: ListExamples
		},
		progress: {
			name: 'Progress',
			component: ProgressExamples
		},
		radio: {
			name: 'Radio',
			component: RadioExamples
		},
		select: {
			name: 'Select',
			component: SelectExamples
		},
		slider: {
			name: 'Slider',
			component: SliderExamples
		},
		theme: {
			name: 'Theme',
			component: ThemeExamples
		}
	};

	const exampleKeys: string[] = Object.keys(examples);

	let selectedExampleIndex = 0;
	$: selectedExampleKey = exampleKeys[selectedExampleIndex];
	$: selectedExample = examples[selectedExampleKey].component;

	let mounted = false;

	// There is something wrong where the forwarded slots in nested components
	// fail to bind let:item when the component loads too quickly.
	// Delaying the load of the component until the main UI is mounted prevents
	// the error.
	onMount(() => {
		mounted = true;
	});
</script>

<div class="app" use:currentTheme={{ darkMode }} class:darkMode>
	<div>
		<Checkbox checked={darkMode} on:click={toggleDarkMode}>Dark Mode</Checkbox>
	</div>
	<div class="examples">
		<div class="example-list">
			<List items={exampleKeys} bind:selectedIndex={selectedExampleIndex} let:item>
				{examples[item].name}
			</List>
		</div>
		<div class="example">
			{#if mounted}
				<svelte:component this={selectedExample} />
			{/if}
		</div>
	</div>
</div>

<style>
	.app {
		background-color: var(--Common__background-color);
		min-height: 100vh;
	}

	.examples {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.example-list {
		align-self: flex-start;
	}

	.example {
		padding: 20px;
	}
</style>
