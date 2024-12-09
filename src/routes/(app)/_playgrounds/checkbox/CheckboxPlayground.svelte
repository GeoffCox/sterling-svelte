<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | undefined | null = $state(false);
  let text = $state('sterling-svelte');
  let _class = $state('');

  let code = $derived(getPlaygroundCode({ disabled, text, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    {#if text}
      <Checkbox
        {disabled}
        class={_class}
        onchange={(event) =>
          console.log(`Checkbox onchange checked:${event.currentTarget.checked}`)}>{text}</Checkbox
      >
    {:else}
      <Checkbox
        {disabled}
        class={_class}
        onchange={(event) =>
          console.log(`Checkbox onchange checked:${event.currentTarget.checked}`)}
      />
    {/if}
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:class={_class} availableVariants={['colorful']} />
  {/snippet}
  {#snippet tweaks()}
    <Label text="(children)">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>
