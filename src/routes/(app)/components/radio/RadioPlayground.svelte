<script lang="ts">
  import Radio from '$lib/Radio.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;

  const seed = [...Array(5).keys()];

  let colorful = false;
  let disabled = false;
  let label = 'Sterling';
  let selectedValue = '';

  $: possibleValues = seed.map((x) => `${label}-${x}`);
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    {#each possibleValues as possibleValue}
      <Radio
        bind:group={selectedValue}
        {colorful}
        {disabled}
        name="choices"
        value={possibleValue}
        on:change={() => exampleRef.recordEvent(`change value:${possibleValue}`)}
        >{possibleValue}</Radio
      >
    {/each}
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="label (prefix)">
      <Input bind:value={label} composed />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>selectedValue: {selectedValue}</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    row-gap: 5px;
  }
</style>
