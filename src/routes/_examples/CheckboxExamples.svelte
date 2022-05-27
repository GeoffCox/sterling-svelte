<script lang="ts">
	import { sendNotification } from '../../stores';

	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Checkbox from '$lib/inputs/Checkbox.svelte';
</script>

<div>
	<ExampleSection title="Checkbox">
		<ExampleCard name="default">
			<Checkbox />
		</ExampleCard>
		<ExampleCard name="disabled">
			<Checkbox disabled />
			<Checkbox checked disabled />
		</ExampleCard>
		<ExampleCard name="before">
			<Checkbox>
				<svelte:fragment slot="before">Sterling</svelte:fragment>
			</Checkbox>
		</ExampleCard>
		<ExampleCard name="after">
			<Checkbox>
				<svelte:fragment slot="after">Sterling</svelte:fragment>
			</Checkbox>
		</ExampleCard>
	</ExampleSection>
</div>
