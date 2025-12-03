<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | undefined | null = $state(false);
  let text = $state('sterling-svelte');
  let _class = $state('');

  let code = $derived(getPlaygroundCode({ disabled, text, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    {#if text}
      <Checkbox {disabled} class={_class} onchange={() => console.log(`<Checkbox> onchange`)}
        >{text}</Checkbox
      >
    {:else}
      <Checkbox {disabled} class={_class} onchange={() => console.log(`<Checkbox> onchange`)} />
    {/if}
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:class={_class} sterlingClasses={['button']} />
  {/snippet}
  {#snippet snippets()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>
