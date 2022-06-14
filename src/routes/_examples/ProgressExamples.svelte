<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Progress from '$lib/display/Progress.svelte';

	let percent = 35;
</script>

<div>
	<ExampleSection title="Progress">
		<ExampleCard name="default">
			<div class="progress-container">
				<Progress {percent} />
			</div>
		</ExampleCard>
		<ExampleCard name="vertical">
			<div class="progress-container">
				<Progress {percent} vertical />
			</div>
		</ExampleCard>
		<input type="range" bind:value={percent} min={0} max={100} step={1} />
	</ExampleSection>
</div>

<style>
	.progress-container {
		box-sizing: content-box;
		display: block;
	}
</style>
