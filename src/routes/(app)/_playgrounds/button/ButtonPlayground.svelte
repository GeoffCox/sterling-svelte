<svelte:options runes={true} />

<script lang="ts">
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null | undefined = $state(false);
  let _class: string = $state('');
  let text = $state('sterling-svelte');
  let withIcon: boolean | null | undefined = $state(true);

  let code = $derived(getPlaygroundCode({ disabled, text, _class, withIcon }));
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component">
      <Button {disabled} class={_class} onclick={() => console.log('Button onclick')}>
        {#if withIcon}
          <SvelteIcon />
        {/if}
        {text}
      </Button>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput
      bind:class={_class}
      availableVariants={['capsule', 'circular ', 'colorful', 'secondary', 'square', 'tool']}
    />
  {/snippet}
  {#snippet tweaks()}
    <Label text="(children)">
      <Input bind:value={text} />
    </Label>
    <Checkbox bind:checked={withIcon}>include icon</Checkbox>
  {/snippet}
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
