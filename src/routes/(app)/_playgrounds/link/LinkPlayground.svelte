<svelte:options runes={true} />

<script lang="ts">
  import { base } from '$app/paths';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Link from '$lib/Link.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled: boolean | undefined | null = $state(false);
  let withIcon: boolean | undefined | null = $state(true);
  let href = $state(`${base}/components/link`);
  let text = $state('sterling-svelte');

  let code = $derived(
    getPlaygroundCode({
      disabled,
      href,
      text,
      withIcon,
      _class: _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <Link {disabled} {href} class={_class} onclick={() => console.log('<Link> onclick')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {text}
    </Link>
  {/snippet}
  {#snippet props()}
    <Label text="href">
      <Input bind:value={href} />
    </Label>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput
      bind:class={_class}
      sterlingClasses={['ghost', 'text-underline', 'undecorated']}
    />
  {/snippet}
  {#snippet tweaks()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
    <Checkbox bind:checked={withIcon}>children with icon</Checkbox>
  {/snippet}
</Playground>
