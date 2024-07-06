<script>
    import Playground from './ColorPickerPlayground.svelte';
</script>

# ColorPicker

A Dropdown containing a color value, an input for editing the color text, and sliders for choosing the color in RGB(A), HEX(8), or HSL(A) formats.

## Types

| Name        | Description                     |
| ----------- | ------------------------------- |
| ColorFormat | 'hex' &#124; 'rgb' &#124; 'hsl' |

## Members

| Name        | Type        | Default   | Description                                |
| ----------- | ----------- | --------- | ------------------------------------------ |
| colorText   | string      | '#000000' | The color value in HEX, RGB, or HSL format |
| colorFormat | ColorFormat | 'hex'     | The current color format                   |
| variant     | string      | ''        | Additional class names to apply            |
| (various)   |             |           | Dropdown props, events, and functions      |

## Considerations

- The dropdown displays a set of sliders based on the color format selected.
- Changing the input to a color value with a different color format, switches the selected color format.
- Switching from HSL to HEX or RGB rounds values to the nearest color.
- There are no slots due to the required coordination between sliders and the dropdown.

## Anatomy

```
<div class="sterling-color-picker">
  <Dropdown>
    <div class="value" slot="value">
      <div class="color-box" />
      <Input />
    </div>
    <div class="sterling-color-picker-popup">
      <div class="tabs">
        <TabList />
      </div>
      <div class="sliders">
        <HexColorSliders />
        <HslColorSliders />
        <RgbColorSliders />
      </div>
    </div>
  </Dropdown>
</div>
```

## Playground

<Playground />
