<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  const seed = [...Array(5).keys()];

  let disabled = false;
  let label = 'sterling-svelte';
  let selectedValue = '';
  let variant = '';

  $: possibleValues = seed.map((x) => `${label}-${x}`);
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    {#each possibleValues as possibleValue}
      <Radio
        bind:group={selectedValue}
        {disabled}
        name="choices"
        value={possibleValue}
        {variant}
        on:change={() => exampleRef.recordEvent(`change value:${possibleValue}`)}
        >{possibleValue}</Radio
      >
    {/each}
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="label (prefix)">
      <Input bind:value={label} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    padding: 0;
    row-gap: 5px;
  }
</style>
