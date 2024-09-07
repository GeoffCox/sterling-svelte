<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import LabelBox from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null = false;
  let placeholder = '';
  let text = '';
  let value = 'sterling-svelte';
  let variant = '';

  $: code = getPlaygroundCode({ disabled, placeholder, text, value, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    {#if text}
      <Input
        {disabled}
        {placeholder}
        class={variant}
        bind:value
        on:input={() => console.log('input')}
        on:change={() => console.log('change')}>{text}</Input
      >
    {:else}
      <Input
        {disabled}
        {placeholder}
        class={variant}
        bind:value
        oninput={() => console.log('input')}
        onchange={() => console.log('change')}
      />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox text="placeholder">
      <Input bind:value={placeholder} />
    </LabelBox>
    <Label text="label (text)">
      <Input bind:value={text} />
    </Label>
    <Label text="value">
      <Input bind:value />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful', 'composed']} />
  </svelte:fragment>
</Playground>
