<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import LabelBox from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null = $state(false);
  let placeholder = $state('');
  let text = $state('');
  let value = $state('sterling-svelte');
  let _class = $state('');

  let code = $derived(getPlaygroundCode({ disabled, placeholder, text, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    {#if text}
      <Input
        {disabled}
        {placeholder}
        class={_class}
        bind:value
        oninput={() => console.log('input')}
        onchange={() => console.log('change')}>{text}</Input
      >
    {:else}
      <Input
        {disabled}
        {placeholder}
        class={_class}
        bind:value
        oninput={() => console.log('input')}
        onchange={() => console.log('change')}
      />
    {/if}
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox text="placeholder">
      <Input bind:value={placeholder} />
    </LabelBox>
    <Label text="label (text)">
      <Input bind:value={text} />
    </Label>
    <VariantInput bind:class={_class} availableVariants={['colorful', 'composed']} />
  {/snippet}
</Playground>
