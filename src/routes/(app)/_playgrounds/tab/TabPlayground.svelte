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
  let _class: string = $state('');

  let selectedValue = $state('');
  let tabListDisabled = $state(false);
  const value = 'tab';
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
      value,
      _class,
      vertical
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <Tab {disabled} {value} class={_class}>{text}</Tab>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <VariantInput bind:class={_class} availableVariants={['colorful']} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={tabListDisabled}>disabled (TabList)</Checkbox>
    <Checkbox bind:checked={selected}>selected (TabList)</Checkbox>
    <Checkbox bind:checked={vertical}>vertical (TabList)</Checkbox>
  {/snippet}
</Playground>
