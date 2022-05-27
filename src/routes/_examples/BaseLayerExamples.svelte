<script lang="ts">
	import BaseLayer from '$lib/BaseLayer.svelte';

	import { sendNotification } from '../../stores';

	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';
	import SvelteIcon from '../_components/SvelteIcon.svelte';
</script>

<div>
	<ExampleSection title="BaseLayer">
		<ExampleCard name="default">
			<BaseLayer><div class="item">Sterling</div></BaseLayer>
		</ExampleCard>
		<ExampleCard name="level 1">
			<BaseLayer level={1}><div class="item">Sterling</div></BaseLayer>
		</ExampleCard>
		<ExampleCard name="level 2">
			<BaseLayer level={2}><div class="item">Sterling</div></BaseLayer>
		</ExampleCard>
		<ExampleCard name="level 3">
			<BaseLayer level={3}><div class="item">Sterling</div></BaseLayer>
		</ExampleCard>
	</ExampleSection>
</div>

<style>
	.item {
		box-sizing: border-box;
		width: 150px;
		height: 100px;
		text-align: center;
		vertical-align: middle;
		padding: 40px;
	}
</style>
