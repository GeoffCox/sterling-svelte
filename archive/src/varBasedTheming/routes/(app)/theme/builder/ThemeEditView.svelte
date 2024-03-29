<script lang="ts">
  import DisabledSwatchEditor from './DisabledSwatchEditor.svelte';
  import Swatch from './SwatchEditor.svelte';

  export let theme: Record<string, string>;
</script>

<div class="theme-editor">
  <h2>Common</h2>
  <Swatch
    backgroundColorName="--stsv-common__background-color"
    bind:backgroundColorValue={theme['stsv-common__background-color']}
    borderColorName="--stsv-common__border-color"
    bind:borderColorValue={theme['stsv-common__border-color']}
    borderRadiusName="--stsv-common__border-radius"
    bind:borderRadiusValue={theme['stsv-common__border-radius']}
    borderStyleName="--stsv-common__border-style"
    bind:borderStyleValue={theme['stsv-common__border-style']}
    borderWidthName="--stsv-common__border-width"
    bind:borderWidthValue={theme['stsv-common__border-width']}
    colorName="--stsv-common__color"
    bind:colorValue={theme['stsv-common__color']}
  />
  <h3>Common - Outline</h3>
  <Swatch
    outlineColorName="--stsv-common__outline-color"
    bind:outlineColorValue={theme['stsv-common__outline-color']}
    outlineOffsetName="--stsv-common__outline-offset"
    bind:outlineOffsetValue={theme['stsv-common__outline-offset']}
    outlineStyleName="--stsv-common__outline-style"
    bind:outlineStyleValue={theme['stsv-common__outline-style']}
    outlineWidthName="--stsv-common__outline-width"
    bind:outlineWidthValue={theme['stsv-common__outline-width']}
  />
  <h3>Common - Disabled</h3>
  <DisabledSwatchEditor
    color1Name="--stsv-common--disabled__stripe-color"
    color1Value={theme['stsv-common--disabled__stripe-color']}
    color2Name="--stsv-common--disabled__stripe-color--alt"
    color2Value={theme['stsv-common--disabled__stripe-color--alt']}
    stripeAngle="--stsv-common--disabled__stripe-angle"
    stripeAngleValue={theme['stsv-common--disabled__stripe-angle']}
    stripeWidth="--stsv-common--disabled__stripe-width"
    stripeWidthValue={theme['stsv-common--disabled__stripe-width']}
  />
  <h3>Common - Secondary, Subtle, and Faint</h3>
  <Swatch
    backgroundColorName="--stsv-common__background-color--secondary"
    bind:backgroundColorValue={theme['stsv-common__background-color--secondary']}
    colorName="--stsv-common__color--secondary"
    bind:colorValue={theme['stsv-common__color--secondary']}
  />
  <Swatch
    backgroundColorName="--stsv-common__background-color--subtle"
    bind:backgroundColorValue={theme['stsv-common__background-color--subtle']}
    colorName="--stsv-common__color--subtle"
    bind:colorValue={theme['stsv-common__color--subtle']}
  />
  <Swatch
    backgroundColorName="--stsv-common__background-color--faint"
    bind:backgroundColorValue={theme['stsv-common__background-color--faint']}
    colorName="--stsv-common__color--faint"
    bind:colorValue={theme['stsv-common__color--faint']}
  />
  <h2>Button</h2>
  <Swatch
    backgroundColorName="--stsv-button__background-color"
    bind:backgroundColorValue={theme['stsv-button__background-color']}
    borderColorName="--stsv-button__border-color"
    bind:borderColorValue={theme['stsv-button__border-color']}
    borderRadiusName="--stsv-button__border-radius"
    bind:borderRadiusValue={theme['stsv-button__border-radius']}
    borderStyleName="--stsv-button__border-style"
    bind:borderStyleValue={theme['stsv-button__border-style']}
    borderWidthName="--stsv-button__border-width"
    bind:borderWidthValue={theme['stsv-button__border-width']}
    colorName="--stsv-button__color"
    bind:colorValue={theme['stsv-button__color']}
  />
  <h3>Button - Hover</h3>
  <Swatch
    backgroundColorName="--stsv-button__background-color--hover"
    bind:backgroundColorValue={theme['stsv-button__background-color--hover']}
    borderColorName="--stsv-button__border-color--hover"
    bind:borderColorValue={theme['stsv-button__border-color--hover']}
    colorName="--stsv-button__color--hover"
    bind:colorValue={theme['stsv-button__color--hover']}
  />
  <h3>Button - Focus</h3>
  <Swatch
    backgroundColorName="--stsv-button__background-color--focus"
    bind:backgroundColorValue={theme['stsv-button__background-color--focus']}
    borderColorName="--stsv-button__border-color--focus"
    bind:borderColorValue={theme['stsv-button__border-color--focus']}
    colorName="--stsv-button__color--focus"
    bind:colorValue={theme['stsv-button__color--focus']}
  />
  <h3>Button - Active</h3>
  <Swatch
    backgroundColorName="--stsv-button__background-color--active"
    bind:backgroundColorValue={theme['stsv-button__background-color--active']}
    borderColorName="--stsv-button__border-color--active"
    bind:borderColorValue={theme['stsv-button__border-color--active']}
    colorName="--stsv-button__color--active"
    bind:colorValue={theme['stsv-button__color--active']}
  />
  <h2>Input</h2>
  <Swatch
    backgroundColorName="--stsv-input__background-color"
    bind:backgroundColorValue={theme['stsv-input__background-color']}
    borderColorName="--stsv-input__border-color"
    bind:borderColorValue={theme['stsv-input__border-color']}
    borderRadiusName="--stsv-input__border-radius"
    bind:borderRadiusValue={theme['stsv-input__border-radius']}
    borderStyleName="--stsv-input__border-style"
    bind:borderStyleValue={theme['stsv-input__border-style']}
    borderWidthName="--stsv-input__border-width"
    bind:borderWidthValue={theme['stsv-input__border-width']}
    colorName="--stsv-input__color"
    bind:colorValue={theme['stsv-input__color']}
  />
  <h3>Input - Hover</h3>
  <Swatch
    backgroundColorName="--stsv-input__background-color--hover"
    bind:backgroundColorValue={theme['stsv-input__background-color--hover']}
    borderColorName="--stsv-input__border-color--hover"
    bind:borderColorValue={theme['stsv-input__border-color--hover']}
    colorName="--stsv-input__color--hover"
    bind:colorValue={theme['stsv-input__color--hover']}
  />
  <h3>Input - Focus</h3>
  <Swatch
    backgroundColorName="--stsv-input__background-color--focus"
    bind:backgroundColorValue={theme['stsv-input__background-color--focus']}
    borderColorName="--stsv-input__border-color--focus"
    bind:borderColorValue={theme['stsv-input__border-color--focus']}
    colorName="--stsv-input__color--focus"
    bind:colorValue={theme['stsv-input__color--focus']}
  />
  <h3>Input - Selected</h3>
  <Swatch
    backgroundColorName="--stsv-input__background-color--selected"
    bind:backgroundColorValue={theme['stsv-input__background-color--selected']}
    borderColorName="--stsv-input__border-color--selected"
    bind:borderColorValue={theme['stsv-input__border-color--selected']}
    colorName="--stsv-input__color--selected"
    bind:colorValue={theme['stsv-input__color--selected']}
  />
  <h2>Status</h2>
  <h3>Status - Info</h3>
  <Swatch
    backgroundColorName="--stsv-status--info__background-color"
    bind:backgroundColorValue={theme['stsv-status--info__background-color']}
    borderColorName="--stsv-status--info__border-color"
    bind:borderColorValue={theme['stsv-status--info__border-color']}
    colorName="--stsv-status--info__color"
    bind:colorValue={theme['stsv-status--info__color']}
  />
  <h3>Status - Success</h3>
  <Swatch
    backgroundColorName="--stsv-status--success__background-color"
    bind:backgroundColorValue={theme['stsv-status--success__background-color']}
    borderColorName="--stsv-status--success__border-color"
    bind:borderColorValue={theme['stsv-status--success__border-color']}
    colorName="--stsv-status--success__color"
    bind:colorValue={theme['stsv-status--success__color']}
  />
  <h3>Status - Warning</h3>
  <Swatch
    backgroundColorName="--stsv-status--warning__background-color"
    bind:backgroundColorValue={theme['stsv-status--warning__background-color']}
    borderColorName="--stsv-status--warning__border-color"
    bind:borderColorValue={theme['stsv-status--warning__border-color']}
    colorName="--stsv-status--warning__color"
    bind:colorValue={theme['stsv-status--warning__color']}
  />
  <h3>Status - Error</h3>
  <Swatch
    backgroundColorName="--stsv-status--danger__background-color"
    bind:backgroundColorValue={theme['stsv-status--danger__background-color']}
    borderColorName="--stsv-status--danger__border-color"
    bind:borderColorValue={theme['stsv-status--danger__border-color']}
    colorName="--stsv-status--danger__color"
    bind:colorValue={theme['stsv-status--danger__color']}
  />
  <h1>Colorful</h1>
  <h2>Common</h2>
  <Swatch
    backgroundColorName="--stsv-common--colorful__background-color"
    bind:backgroundColorValue={theme['stsv-common--colorful__background-color']}
    borderColorName="--stsv-common--colorful__border-color"
    bind:borderColorValue={theme['stsv-common--colorful__border-color']}
    colorName="--stsv-common--colorful__color"
    bind:colorValue={theme['stsv-common--colorful__color']}
  />
  <h3>Common - Secondary, Subtle, and Faint</h3>
  <Swatch
    backgroundColorName="--stsv-common--colorful__background-color--secondary"
    bind:backgroundColorValue={theme['stsv-common--colorful__background-color--secondary']}
    colorName="--stsv-common--colorful__color--secondary"
    bind:colorValue={theme['stsv-common--colorful__color--secondary']}
  />
  <Swatch
    backgroundColorName="--stsv-common--colorful__background-color--subtle"
    bind:backgroundColorValue={theme['stsv-common--colorful__background-color--subtle']}
    colorName="--stsv-common--colorful__color--subtle"
    bind:colorValue={theme['stsv-common--colorful__color--subtle']}
  />
  <Swatch
    backgroundColorName="--stsv-common--colorful__background-color--faint"
    bind:backgroundColorValue={theme['stsv-common--colorful__background-color--faint']}
    colorName="--stsv-common--colorful__color--faint"
    bind:colorValue={theme['stsv-common--colorful__color--faint']}
  />
  <h2>Button</h2>
  <Swatch
    backgroundColorName="--stsv-button--colorful__background-color"
    bind:backgroundColorValue={theme['stsv-button--colorful__background-color']}
    borderColorName="--stsv-button--colorful__border-color"
    bind:borderColorValue={theme['stsv-button--colorful__border-color']}
    colorName="--stsv-button--colorful__color"
    bind:colorValue={theme['stsv-button--colorful__color']}
  />
  <h3>Button - Hover</h3>
  <Swatch
    backgroundColorName="--stsv-button--colorful__background-color--hover"
    bind:backgroundColorValue={theme['stsv-button--colorful__background-color--hover']}
    borderColorName="--stsv-button--colorful__border-color--hover"
    bind:borderColorValue={theme['stsv-button--colorful__border-color--hover']}
    colorName="--stsv-button--colorful__color--hover"
    bind:colorValue={theme['stsv-button--colorful__color--hover']}
  />
  <h3>Button - Focus</h3>
  <Swatch
    backgroundColorName="--stsv-button--colorful__background-color--focus"
    bind:backgroundColorValue={theme['stsv-button--colorful__background-color--focus']}
    borderColorName="--stsv-button--colorful__border-color--focus"
    bind:borderColorValue={theme['stsv-button--colorful__border-color--focus']}
    colorName="--stsv-button--colorful__color--focus"
    bind:colorValue={theme['stsv-button--colorful__color--focus']}
  />
  <h3>Button - Active</h3>
  <Swatch
    backgroundColorName="--stsv-button--colorful__background-color--active"
    bind:backgroundColorValue={theme['stsv-button--colorful__background-color--active']}
    borderColorName="--stsv-button--colorful__border-color--active"
    bind:borderColorValue={theme['stsv-button--colorful__border-color--active']}
    colorName="--stsv-button--colorful__color--active"
    bind:colorValue={theme['stsv-button--colorful__color--active']}
  />
  <h2>Input</h2>
  <Swatch
    backgroundColorName="--stsv-input--colorful__background-color"
    bind:backgroundColorValue={theme['stsv-input--colorful__background-color']}
    borderColorName="--stsv-input--colorful__border-color"
    bind:borderColorValue={theme['stsv-input--colorful__border-color']}
    colorName="--stsv-input--colorful__color"
    bind:colorValue={theme['stsv-input--colorful__color']}
  />
  <h3>Input - Hover</h3>
  <Swatch
    backgroundColorName="--stsv-input--colorful__background-color--hover"
    bind:backgroundColorValue={theme['stsv-input--colorful__background-color--hover']}
    borderColorName="--stsv-input--colorful__border-color--hover"
    bind:borderColorValue={theme['stsv-input--colorful__border-color--hover']}
    colorName="--stsv-input--colorful__color--hover"
    bind:colorValue={theme['stsv-input--colorful__color--hover']}
  />
  <h3>Input - Focus</h3>
  <Swatch
    backgroundColorName="--stsv-input--colorful__background-color--focus"
    bind:backgroundColorValue={theme['stsv-input--colorful__background-color--focus']}
    borderColorName="--stsv-input--colorful__border-color--focus"
    bind:borderColorValue={theme['stsv-input--colorful__border-color--focus']}
    colorName="--stsv-input--colorful__color--focus"
    bind:colorValue={theme['stsv-input--colorful__color--focus']}
  />
  <h3>Input - Selected</h3>
  <Swatch
    backgroundColorName="--stsv-input--colorful__background-color--selected"
    bind:backgroundColorValue={theme['stsv-input--colorful__background-color--selected']}
    borderColorName="--stsv-input--colorful__border-color--selected"
    bind:borderColorValue={theme['stsv-input--colorful__border-color--selected']}
    colorName="--stsv-input--colorful__color--selected"
    bind:colorValue={theme['stsv-input--colorful__color--selected']}
  />
</div>

<style>
  .theme-editor {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    row-gap: 1em;
  }
</style>
