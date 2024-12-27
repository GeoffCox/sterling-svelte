<script lang="ts">
  import Input from '$lib/Input.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import Playground from '../Playground.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Label from '$lib/Label.svelte';
  import { TEXT_AREA_RESIZES } from '$lib';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = '';
  let disabled = false;
  let placeholder = '';
  let autoHeight = false;
  let value = '';

  let resize: TextAreaResize = 'none';

  $: code = getPlaygroundCode({ autoHeight, disabled, placeholder, resize, _class });
</script>

<Playground {code}>
  {#snippet component()}
    <TextArea
      bind:value
      {autoHeight}
      {disabled}
      {placeholder}
      bind:resize
      class={_class}
      oninput={(e) => console.log('TextArea.oninput event:', e)}
      onchange={(e) => console.log('TextArea.onchange event:', e)}
    />
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={autoHeight}>autoHeight</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="placeholder">
      <Input bind:value={placeholder} />
    </Label>
    <Label text="resize" forwardClick>
      <Select bind:selectedValue={resize}>
        {#each TEXT_AREA_RESIZES as resizeValue}
          <ListItem value={resizeValue}>{resizeValue}</ListItem>
        {/each}
      </Select>
    </Label>
    <VariantInput bind:class={_class} availableVariants={['colorful', 'composed']} />
  {/snippet}
</Playground>
