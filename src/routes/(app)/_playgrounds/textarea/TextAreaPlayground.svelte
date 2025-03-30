<svelte:options runes={true} />

<script lang="ts">
  import { TEXT_AREA_RESIZES } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import TextArea from '$lib/TextArea.svelte';
  import type { TextAreaResize } from '$lib/TextArea.types';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled = $state(false);
  let placeholder = $state('');
  let autoHeight = $state(false);
  let value = $state('');

  let resize: TextAreaResize = $state('none');

  let code = $derived(getPlaygroundCode({ autoHeight, disabled, placeholder, resize, _class }));
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
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
</Playground>
