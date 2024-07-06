<script lang="ts">
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../../components/Playground.svelte';

  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Link from '$lib/Link.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import { base } from '$app/paths';

  let disabled = false;
  let variant = '';
  let withIcon = true;
  let href = `${base}/components/link`;
  let text = 'sterling-svelte';

  $: code = getPlaygroundCode({
    disabled,
    href,
    text,
    withIcon,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Link {disabled} {href} {variant} on:click={() => console.log('<Link> on:click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {text}
    </Link>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Label text="href">
      <Input bind:value={href} />
    </Label>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput bind:variant availableVariants={['colorful', 'ghost', 'undecorated']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="(link content)">
      <Input bind:value={text} />
    </Label>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>
