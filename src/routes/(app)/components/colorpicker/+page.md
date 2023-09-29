<script>
    import Playground from './ColorPickerPlayground.svelte';
</script>

# ColorPicker

A Dropdown containing a color value, an input for editing the color text, and sliders for choosing the color in RGB(A), HEX(8), or HSL(A) formats.

- The dropdown displays a set of sliders based on the color format selected.
- Changing the input to a color value with a different color format, switches the selected color format.
- Switching from HSL to HEX or RGB rounds values to the nearest color.

## Types

```ts
type ColorFormat = 'hex' | 'rgb' | 'hsl';
```

## Props

Dropdown props are included.

```ts
/** The color value in HEX, RGB, or HSL format */
export let colorText: string = defaultColorText;

/** The current color format */
export let colorFormat: ColorFormat = 'hex';

/** Additional class names to apply. */
export let variant: string = '';
```

## Events

Dropdown events are included.

## Anatomy

As a composite control that coordinates the input and the slider values,
there are no slots for ColorPicker.

```svelte
<Dropdown>
  <div slot="value">
    <!-- Color indicator -->
    <div />
    <!-- Color text input -->
    <Input />
  </div>
  <div>
    <!-- Color format tabs -->
    <TabList />
    <!-- Color sliders -->
    <HexColorSliders />
    <HslColorSliders />
    <RgbColorSliders />
  </div>
</Dropdown>
```

## Playground

<Playground />
