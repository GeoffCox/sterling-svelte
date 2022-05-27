<script lang="ts">
	import { sendNotification } from '../../stores';
	
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';
	
	import Radio from '$lib/inputs/Radio.svelte';
</script>

<div>
	<ExampleSection title="Radio">
		<ExampleCard name="default">
			<Radio name="radioDefault" value={1}/>
			<Radio name="radioDefault" value={2} />
			<Radio name="radioDefault" value={3} />
			<Radio name="radioDefault" value={4} />
		</ExampleCard>
		<ExampleCard name="disabled">
			<Radio disabled name="radioDisabled" value={1}/>
			<Radio disabled name="radioDisabled" value={2} checked />
			<Radio disabled name="radioDisabled" value={3} />
			<Radio disabled name="radioDisabled" value={4} />
		</ExampleCard>
		<ExampleCard name="before">
			<Radio name="radioBefore" value={1}>
				<svelte:fragment slot="before">Sterling 1</svelte:fragment>
			</Radio>
			<Radio name="radioBefore" value={2}>
				<svelte:fragment slot="before">Sterling 2</svelte:fragment>
			</Radio>
			<Radio name="radioBefore" value={3}>
				<svelte:fragment slot="before">Sterling 3</svelte:fragment>
			</Radio>
			<Radio name="radioBefore" value={4}>
				<svelte:fragment slot="before">Sterling 4</svelte:fragment>
			</Radio>
		</ExampleCard>
		<ExampleCard name="after">
			<Radio name="radioAfter" value={1}>
				<svelte:fragment slot="after">Sterling 1</svelte:fragment>
			</Radio>
			<Radio name="radioAfter" value={2}>
				<svelte:fragment slot="after">Sterling 2</svelte:fragment>
			</Radio>
			<Radio name="radioAfter" value={3}>
				<svelte:fragment slot="after">Sterling 3</svelte:fragment>
			</Radio>
			<Radio name="radioAfter" value={4}>
				<svelte:fragment slot="after">Sterling 4</svelte:fragment>
			</Radio>
		</ExampleCard>
	</ExampleSection>
</div>
