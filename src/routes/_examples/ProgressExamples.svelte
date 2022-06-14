<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Progress from '$lib/display/Progress.svelte';
</script>

<div>
	<ExampleSection title="Progress">
		<ExampleCard name="default">
			<div class="progress-container">
				<Progress percent={35} />
			</div>
		</ExampleCard>
		<ExampleCard name="vertical">
			<div class="progress-container">
				<Progress percent={35} vertical />
			</div>
		</ExampleCard>
	</ExampleSection>
</div>

<style>
	.progress-container {
		box-sizing: content-box;
		display: block;
	}
</style>
