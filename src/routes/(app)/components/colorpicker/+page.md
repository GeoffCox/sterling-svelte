<script>
    import Playground from './ColorPickerPlayground.svelte';
</script>

# ColorPicker

An Dropdown displaying a color value, an input for editing the color text, and sliders for choosing
a RGB(A), HEX(8), or HSL(A) color.

- The dropdown displays a set of sliders based on the color format selected.
- Changing the input to a color value with a different color format, switches the selected color format.

<Playground />

```svelte
<script lang="ts">
  // ----- Props ----- //

  export let colorText: string = '#000000';
  export let colorFormat: ColorFormat = 'hex';

  // ----- Props (forwarded to Dropdown) ----- //

  export let colorful: boolean = false;
  /** when true, the component should be styled to be hosted within a container component. */
  let composed: boolean = false;
  let disabled: boolean = false;
  let open = false;

  /** when true, then clicking outside the dropdown won't close it. */
  let stayOpenOnClickAway = false;
</script>

<!-- Anatomy -->

<Dropdown>
  <div slot="value">
    <!-- Color indicator -->
    <div />
    <Input />
  </div>
  <div>
    <!-- Color format tabs -->
    <TabList />
    <!-- One color slider is displayed based on tab selection -->
    <HexColorSliders />
    <HslColorSliders />
    <RgbColorSliders />
  </div>
</Dropdown>
```
