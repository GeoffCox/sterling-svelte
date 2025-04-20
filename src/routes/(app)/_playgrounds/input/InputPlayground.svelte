<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import { default as Label, default as LabelBox } from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
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
        oninput={() => console.log('<Input> oninput')}
        onchange={() => console.log('<Input> onchange')}>{text}</Input
      >
    {:else}
      <Input
        {disabled}
        {placeholder}
        class={_class}
        bind:value
        oninput={() => console.log('<Input> oninput')}
        onchange={() => console.log('<Input> onchange')}
      />
    {/if}
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <LabelBox text="placeholder">
      <Input bind:value={placeholder} />
    </LabelBox>
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
  {#snippet snippets()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>
