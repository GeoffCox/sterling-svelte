<svelte:options runes={true} />

<script lang="ts">
  import { setContext } from 'svelte';

  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';

  import { TAB_LIST_CONTEXT_KEY } from '$lib/TabList.constants';
  import Tab from '$lib/Tab.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import type { TabListContext } from '$lib';

  // ----- Context ----- //

  let text = $state('sterling-svelte');
  let disabled: boolean | null | undefined = $state(false);
  let selected: boolean | null | undefined = $state(false);
  let variant: string = $state('');

  let selectedValue = $state('');
  let tabListDisabled = $state(false);
  let vertical: boolean | null | undefined = $state(false);

  let tabListContext: TabListContext = {
    get disabled() {
      return tabListDisabled;
    },
    set disabled(value) {
      tabListDisabled = value;
    },
    get selectedValue() {
      return selectedValue;
    },
    set selectedValue(value) {
      selectedValue = value;
    },
    get vertical() {
      return vertical;
    },
    set vertical(value) {
      vertical = value;
    }
  };

  $effect(() => {
    tabListContext.disabled = tabListDisabled;
  });

  $effect(() => {
    tabListContext.selectedValue = selected ? 'tab' : '';
  });

  $effect(() => {
    tabListContext.vertical = vertical;
  });

  setContext<TabListContext>(TAB_LIST_CONTEXT_KEY, tabListContext);

  let code = $derived(
    getPlaygroundCode({
      disabled,
      selected,
      text,
      value: 'tab',
      variant,
      vertical
    })
  );
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Tab {disabled} value="tab" class="variant">{text}</Tab>
  </svelte:fragment>>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <VariantInput bind:class={variant} availableVariants={['colorful']} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={tabListDisabled}>disabled (TabList)</Checkbox>
    <Checkbox bind:checked={selected}>selected</Checkbox>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
</Playground>
