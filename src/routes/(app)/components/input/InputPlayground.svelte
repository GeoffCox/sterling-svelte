<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import LabelBox from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  import Playground from '../Playground.svelte';

  let exampleRef: any;

  let disabled = false;
  let label = 'sterling-svelte';
  let placeholder = '';
  let value = '';
  let variant = '';
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    {#if label.length > 0}
      <Input
        {disabled}
        {placeholder}
        {variant}
        bind:value
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}>{label}</Input
      >
    {:else}
      <Input
        {disabled}
        {placeholder}
        {variant}
        bind:value
        on:input={() => exampleRef.recordEvent('input')}
        on:change={() => exampleRef.recordEvent('change')}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox text="placeholder">
      <Input bind:value={placeholder} />
    </LabelBox>
    <Label text="default slot (text)">
      <Input bind:value={label} />
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
</Playground>
