<script lang="ts">
  import type { ColorFormat } from '$lib/ColorPicker.types';

  import Checkbox from '$lib/Checkbox.svelte';
  import ColorPicker from '$lib/ColorPicker.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';

  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let colorText = 'hsla(222, 50%, 70%, 0.5)';
  let colorFormat: ColorFormat = 'hsl';

  let disabled = false;
  let open = false;
  let variant: string = '';

  $: code = getPlaygroundCode({ colorFormat, colorText, disabled, open, variant });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <ColorPicker bind:colorText bind:colorFormat bind:open {disabled} {variant} />
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
</Playground>
