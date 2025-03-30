<svelte:options runes={true} />

<script lang="ts">
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../Playground.svelte';
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
      sterlingClasses={[
        'capsule',
        'circular ',
        'secondary',
        'square',
        'blue',
        'tool',
        'green',
        'orange',
        'red'
      ]}
    />
  {/snippet}
  {#snippet snippets()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
    <Checkbox bind:checked={withIcon}>children with icon</Checkbox>
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
