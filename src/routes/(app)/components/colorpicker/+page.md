<script>
    import Playground from './ColorPickerPlayground.svelte';
</script>

# ColorPicker

An RGB(A), HEX(8), or HSL(A) color input with a dropdown of color sliders.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  /** when true, the component should be styled to be hosted within a container component. */
  export let colorText: string = '#000000';
  export let colorFormat: ColorFormat = 'hex';
</script>

<!-- Anatomy -->

<div>
  <Dropdown>
    <div slot="value">
      <!-- Color -->
      <div />
      <Input />
    </div>
    <div>
      <TabList />
      <!-- One color slider displayed based on tab selection -->
      <HexColorSliders />
      <HslColorSliders />
      <RgbColorSliders />
    </div>
  </Dropdown>
</div>
```
