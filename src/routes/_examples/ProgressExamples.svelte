<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Progress from '$lib/display/Progress.svelte';

	let value = 35;
	let percent: number;
</script>

<div>
	<ExampleSection title="Progress">
		<ExampleCard name="default">
			<div class="progress-container">
				<Progress {value} bind:percent />
				{percent}
			</div>
		</ExampleCard>
		<ExampleCard name="vertical">
			<div class="progress-container">
				<Progress {value} vertical />
			</div>
		</ExampleCard>
		<input type="range" bind:value min={0} max={100} step={1} />
	</ExampleSection>
</div>

<style>
	.progress-container {
		box-sizing: content-box;
		display: block;
	}
</style>
