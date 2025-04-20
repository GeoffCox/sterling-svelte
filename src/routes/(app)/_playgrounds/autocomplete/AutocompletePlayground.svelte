<svelte:options runes={true} />

<script lang="ts">
  import Autocomplete from '$lib/Autocomplete.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import { default as Label, default as LabelBox } from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let value = $state();
  let _class = $state('');
  let customFilter = $state(false);

  const startsWithFilter = (values: string[], text?: string): string[] => {
    const filtered = values.filter((v) => !text || v.toLowerCase().startsWith(text.toLowerCase()));

    if (filtered.length === 0) {
      return values;
    }

    return filtered;
  };

  const filter = $derived(customFilter ? startsWithFilter : undefined);

  let code = $derived(getPlaygroundCode({ _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <Autocomplete
      class={_class}
      {filter}
      onchange={() => console.log('<Autocomplete> onchange')}
      oninput={() => console.log('<Autocomplete> oninput')}
      bind:value
      values={countries}
    />
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={customFilter}>Custom filter: startswith</Checkbox>
  {/snippet}
</Playground>
