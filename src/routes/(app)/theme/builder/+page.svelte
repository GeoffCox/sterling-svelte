<script lang="ts">
  import { lightTheme } from '$lib';
  import Swatch from './EditorSwatch.svelte';
  import ThemeBuilderNav from './archive/ThemeBuilderNav.svelte';
  import { reduce } from 'lodash-es';
  import ThemeEditor from './ThemeEditor.svelte';

  let theme = Object.assign({}, lightTheme) as Record<string, string>;

  let selectedValue = 'common222';
</script>

<div class="theme-builder">
  <ThemeEditor {theme} />
  {#if selectedValue === 'common'}
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
  {/if}
  {#if selectedValue === 'common-secondary'}
    <Swatch
      backgroundColorName="--stsv-common__background-color--secondary"
      bind:backgroundColorValue={theme['stsv-common__background-color--secondary']}
      colorName="--stsv-common__color--secondary"
      bind:colorValue={theme['stsv-common__color--secondary']}
    />
  {/if}
  {#if selectedValue === 'common-subtle'}
    <Swatch
      backgroundColorName="--stsv-common__background-color--subtle"
      bind:backgroundColorValue={theme['stsv-common__background-color--subtle']}
      colorName="--stsv-common__color--subtle"
      bind:colorValue={theme['stsv-common__color--subtle']}
    />
  {/if}
  {#if selectedValue === 'common-faint'}
    <Swatch
      backgroundColorName="--stsv-common__background-color--faint"
      bind:backgroundColorValue={theme['stsv-common__background-color--faint']}
      colorName="--stsv-common__color--faint"
      bind:colorValue={theme['stsv-common__color--faint']}
    />
  {/if}
  {#if selectedValue === 'common-outline'}
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
  {/if}
  {#if selectedValue === 'common-colorful'}
    <Swatch
      backgroundColorName="--stsv-common--colorful__background-color"
      bind:backgroundColorValue={theme['stsv-common--colorful__background-color']}
      borderColorName="--stsv-common--colorful__border-color"
      bind:borderColorValue={theme['stsv-common--colorful__border-color']}
      colorName="--stsv-common--colorful__color"
      bind:colorValue={theme['stsv-common--colorful__color']}
    />
  {/if}
  {#if selectedValue === 'common-colorful-secondary'}
    <Swatch
      backgroundColorName="--stsv-common--colorful__background-color--secondary"
      bind:backgroundColorValue={theme['stsv-common--colorful__background-color--secondary']}
      colorName="--stsv-common--colorful__color--secondary"
      bind:colorValue={theme['stsv-common--colorful__color--secondary']}
    />
  {/if}
  {#if selectedValue === 'common-colorful-subtle'}
    <Swatch
      backgroundColorName="--stsv-common--colorful__background-color--subtle"
      bind:backgroundColorValue={theme['stsv-common--colorful__background-color--subtle']}
      colorName="--stsv-common--colorful__color--subtle"
      bind:colorValue={theme['stsv-common--colorful__color--subtle']}
    />
  {/if}
  {#if selectedValue === 'common-colorful-faint'}
    <Swatch
      backgroundColorName="--stsv-common--colorful__background-color--faint"
      bind:backgroundColorValue={theme['stsv-common--colorful__background-color--faint']}
      colorName="--stsv-common--colorful__color--faint"
      bind:colorValue={theme['stsv-common--colorful__color--faint']}
    />
  {/if}
  {#if selectedValue === 'button'}
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
  {/if}
  {#if selectedValue === 'button-hover'}
    <Swatch
      backgroundColorName="--stsv-button__background-color--hover"
      bind:backgroundColorValue={theme['stsv-button__background-color--hover']}
      borderColorName="--stsv-button__border-color--hover"
      bind:borderColorValue={theme['stsv-button__border-color--hover']}
      colorName="--stsv-button__color--hover"
      bind:colorValue={theme['stsv-button__color--hover']}
    />
  {/if}
  {#if selectedValue === 'button-focus'}
    <Swatch
      backgroundColorName="--stsv-button__background-color--focus"
      bind:backgroundColorValue={theme['stsv-button__background-color--focus']}
      borderColorName="--stsv-button__border-color--focus"
      bind:borderColorValue={theme['stsv-button__border-color--focus']}
      colorName="--stsv-button__color--focus"
      bind:colorValue={theme['stsv-button__color--focus']}
    />
  {/if}
  {#if selectedValue === 'button-active'}
    <Swatch
      backgroundColorName="--stsv-button__background-color--active"
      bind:backgroundColorValue={theme['stsv-button__background-color--active']}
      borderColorName="--stsv-button__border-color--active"
      bind:borderColorValue={theme['stsv-button__border-color--active']}
      colorName="--stsv-button__color--active"
      bind:colorValue={theme['stsv-button__color--active']}
    />
  {/if}
  {#if selectedValue === 'button-colorful'}
    <Swatch
      backgroundColorName="--stsv-button--colorful__background-color"
      bind:backgroundColorValue={theme['stsv-button--colorful__background-color']}
      borderColorName="--stsv-button--colorful__border-color"
      bind:borderColorValue={theme['stsv-button--colorful__border-color']}
      colorName="--stsv-button--colorful__color"
      bind:colorValue={theme['stsv-button--colorful__color']}
    />
  {/if}
  {#if selectedValue === 'button-colorful-hover'}
    <Swatch
      backgroundColorName="--stsv-button--colorful__background-color--hover"
      bind:backgroundColorValue={theme['stsv-button--colorful__background-color--hover']}
      borderColorName="--stsv-button--colorful__border-color--hover"
      bind:borderColorValue={theme['stsv-button--colorful__border-color--hover']}
      colorName="--stsv-button--colorful__color--hover"
      bind:colorValue={theme['stsv-button--colorful__color--hover']}
    />
  {/if}
  {#if selectedValue === 'button-colorful-focus'}
    <Swatch
      backgroundColorName="--stsv-button--colorful__background-color--focus"
      bind:backgroundColorValue={theme['stsv-button--colorful__background-color--focus']}
      borderColorName="--stsv-button--colorful__border-color--focus"
      bind:borderColorValue={theme['stsv-button--colorful__border-color--focus']}
      colorName="--stsv-button--colorful__color--focus"
      bind:colorValue={theme['stsv-button--colorful__color--focus']}
    />
  {/if}
  {#if selectedValue === 'button-colorful-active'}
    <Swatch
      backgroundColorName="--stsv-button--colorful__background-color--active"
      bind:backgroundColorValue={theme['stsv-button--colorful__background-color--active']}
      borderColorName="--stsv-button--colorful__border-color--active"
      bind:borderColorValue={theme['stsv-button--colorful__border-color--active']}
      colorName="--stsv-button--colorful__color--active"
      bind:colorValue={theme['stsv-button--colorful__color--active']}
    />
  {/if}
  {#if selectedValue === 'input'}
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
  {/if}
  {#if selectedValue === 'input-hover'}
    <Swatch
      backgroundColorName="--stsv-input__background-color--hover"
      bind:backgroundColorValue={theme['stsv-input__background-color--hover']}
      borderColorName="--stsv-input__border-color--hover"
      bind:borderColorValue={theme['stsv-input__border-color--hover']}
      colorName="--stsv-input__color--hover"
      bind:colorValue={theme['stsv-input__color--hover']}
    />
  {/if}
  {#if selectedValue === 'input-focus'}
    <Swatch
      backgroundColorName="--stsv-input__background-color--focus"
      bind:backgroundColorValue={theme['stsv-input__background-color--focus']}
      borderColorName="--stsv-input__border-color--focus"
      bind:borderColorValue={theme['stsv-input__border-color--focus']}
      colorName="--stsv-input__color--focus"
      bind:colorValue={theme['stsv-input__color--focus']}
    />
  {/if}
  {#if selectedValue === 'input-selected'}
    <Swatch
      backgroundColorName="--stsv-input__background-color--selected"
      bind:backgroundColorValue={theme['stsv-input__background-color--selected']}
      borderColorName="--stsv-input__border-color--selected"
      bind:borderColorValue={theme['stsv-input__border-color--selected']}
      colorName="--stsv-input__color--selected"
      bind:colorValue={theme['stsv-input__color--selected']}
    />
  {/if}
  {#if selectedValue === 'input-colorful'}
    <Swatch
      backgroundColorName="--stsv-input--colorful__background-color"
      bind:backgroundColorValue={theme['stsv-input--colorful__background-color']}
      borderColorName="--stsv-input--colorful__border-color"
      bind:borderColorValue={theme['stsv-input--colorful__border-color']}
      colorName="--stsv-input--colorful__color"
      bind:colorValue={theme['stsv-input--colorful__color']}
    />
  {/if}
  {#if selectedValue === 'input-colorful-hover'}
    <Swatch
      backgroundColorName="--stsv-input--colorful__background-color--hover"
      bind:backgroundColorValue={theme['stsv-input--colorful__background-color--hover']}
      borderColorName="--stsv-input--colorful__border-color--hover"
      bind:borderColorValue={theme['stsv-input--colorful__border-color--hover']}
      colorName="--stsv-input--colorful__color--hover"
      bind:colorValue={theme['stsv-input--colorful__color--hover']}
    />
  {/if}
  {#if selectedValue === 'input-colorful-focus'}
    <Swatch
      backgroundColorName="--stsv-input--colorful__background-color--focus"
      bind:backgroundColorValue={theme['stsv-input--colorful__background-color--focus']}
      borderColorName="--stsv-input--colorful__border-color--focus"
      bind:borderColorValue={theme['stsv-input--colorful__border-color--focus']}
      colorName="--stsv-input--colorful__color--focus"
      bind:colorValue={theme['stsv-input--colorful__color--focus']}
    />
  {/if}
  {#if selectedValue === 'input-colorful-selected'}
    <Swatch
      backgroundColorName="--stsv-input--colorful__background-color--selected"
      bind:backgroundColorValue={theme['stsv-input--colorful__background-color--selected']}
      borderColorName="--stsv-input--colorful__border-color--selected"
      bind:borderColorValue={theme['stsv-input--colorful__border-color--selected']}
      colorName="--stsv-input--colorful__color--selected"
      bind:colorValue={theme['stsv-input--colorful__color--selected']}
    />
  {/if}
  {#if selectedValue === 'status-info'}
    <Swatch
      backgroundColorName="--stsv-status--info__background-color"
      bind:backgroundColorValue={theme['stsv-status--info__background-color']}
      borderColorName="--stsv-status--info__border-color"
      bind:borderColorValue={theme['stsv-status--info__border-color']}
      colorName="--stsv-status--info__color"
      bind:colorValue={theme['stsv-status--info__color']}
    />
  {/if}
  {#if selectedValue === 'status-success'}
    <Swatch
      backgroundColorName="--stsv-status--success__background-color"
      bind:backgroundColorValue={theme['stsv-status--success__background-color']}
      borderColorName="--stsv-status--success__border-color"
      bind:borderColorValue={theme['stsv-status--success__border-color']}
      colorName="--stsv-status--success__color"
      bind:colorValue={theme['stsv-status--success__color']}
    />
  {/if}
  {#if selectedValue === 'status-warning'}
    <Swatch
      backgroundColorName="--stsv-status--warning__background-color"
      bind:backgroundColorValue={theme['stsv-status--warning__background-color']}
      borderColorName="--stsv-status--warning__border-color"
      bind:borderColorValue={theme['stsv-status--warning__border-color']}
      colorName="--stsv-status--warning__color"
      bind:colorValue={theme['stsv-status--warning__color']}
    />
  {/if}
  {#if selectedValue === 'status-error'}
    <Swatch
      backgroundColorName="--stsv-status--error__background-color"
      bind:backgroundColorValue={theme['stsv-status--error__background-color']}
      borderColorName="--stsv-status--error__border-color"
      bind:borderColorValue={theme['stsv-status--error__border-color']}
      colorName="--stsv-status--error__color"
      bind:colorValue={theme['stsv-status--error__color']}
    />
  {/if}
</div>

<style>
  .theme-builder {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1em;
  }

  .nav {
    max-height: 400px;
    display: grid;
    align-items: stretch;
    overflow: hidden;
  }
</style>
