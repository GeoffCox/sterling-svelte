# Theme

- Each theme consists of a set of CSS variables.
- Components use these in styles to follow the theme and respond to theme changes.
- Each CSS variable that is a part of the sterling-svelte design is prefixed with stsv.

<script>
    import BlueColorsExample from './BlueColorsExample.svelte';
    import NeutralColorsExample from './NeutralColorsExample.svelte';
    import DisabledSwatch from './DisabledSwatch.svelte';
    import Swatch from './Swatch.svelte';
</script>

## Common

The common variables are used for body text and containers (e.g. lists, trees).

<Swatch 
backgroundColor="--stsv-common__background-color" 
borderColor="--stsv-common__border-color"
borderRadius="--stsv-common__border-radius"
borderStyle="--stsv-common__border-style"
borderWidth="--stsv-common__border-width"
color="--stsv-common__color"
/>
<br/>
Secondary, subtle, and faint colors are used for less important text, placeholders, visually separate regions, and decorations.

> The background-color and color pairs do not guarantee sufficient accessibility contrast.

<br/>
<br/>
<Swatch 
backgroundColor="--stsv-common__background-color--secondary" 
color="--stsv-common__color--secondary"
/>
<br/>
<Swatch 
backgroundColor="--stsv-common__background-color--subtle" 
color="--stsv-common__color--subtle"
/>
<br/>
<Swatch 
backgroundColor="--stsv-common__background-color--faint" 
color="--stsv-common__color--faint"
/>
<br/>
Outline colors are used across components to indicate keyboard focus.
<br/>
<br/>
<Swatch 
outlineColor="--stsv-common__outline-color"
outlineOffset="--stsv-common__outline-offset"
outlineStyle="--stsv-common__outline-style"
outlineWidth="--stsv-common__outline-width"
/>
<br/>
Components indicate disabled state as an overlay with a diagonal striped pattern.

- The pattern is taken from the diagonal "NO STEP" pattern on aircraft.
- The stripes are white and black with low opacity and work well across light and dark themes.

> Traditionally, disabled state is indicated using dimmed colors of the component often
> centering aroound a midline gray. This tends to damange contrast when the background,
> border, and foreground colors are near the disabled colors.

<br/>
<br/>
<DisabledSwatch />
<br/>
<br/>

### Button

These are used for clickable buttons that take action.

<Swatch 
backgroundColor="--stsv-button__background-color" 
borderColor="--stsv-button__border-color"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-button__background-color--hover" 
borderColor="--stsv-button__border-color--hover"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-button__background-color--focus" 
borderColor="--stsv-button__border-color--focus"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button__color--focus"
/>
<br/><Swatch 
backgroundColor="--stsv-button__background-color--active" 
borderColor="--stsv-button__border-color--active"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button__color--active"
/>
<br/>

### Input

These are used with interactive input controls (e.g. checkbox, text input, radio)

<Swatch 
backgroundColor="--stsv-input__background-color" 
borderColor="--stsv-input__border-color"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-input__background-color--hover" 
borderColor="--stsv-input__border-color--hover"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-input__background-color--focus" 
borderColor="--stsv-input__border-color--focus"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input__color--focus"
/>

## Colorful

Many components provde a `colorful` prop to apply accent colors.

Notice that the default neutral styling, hover and focus states get darker.
With colorful, hover and focus states get lighter.
This is because the eye perceives darker neutrals as active, and brighter colors as lit up.

### Common

<Swatch 
backgroundColor="--stsv-common--colorful__background-color" 
borderColor="--stsv-common--colorful__border-color"
borderRadius="--stsv-common__border-radius"
borderStyle="--stsv-common__border-style"
borderWidth="--stsv-common__border-width"
color="--stsv-common--colorful__color"
/>
<br/>
<br/>
<Swatch 
backgroundColor="--stsv-common--colorful__background-color--secondary" 
color="--stsv-common--colorful__color--secondary"
/>
<br/>
<Swatch 
backgroundColor="--stsv-common--colorful__background-color--subtle" 
color="--stsv-common--colorful__color--subtle"
/>
<br/>
<Swatch 
backgroundColor="--stsv-common--colorful__background-color--faint" 
color="--stsv-common--colorful__color--faint"
/>

### Button

<Swatch 
backgroundColor="--stsv-button--colorful__background-color" 
borderColor="--stsv-button--colorful__border-color"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button--colorful__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-button--colorful__background-color--hover" 
borderColor="--stsv-button--colorful__border-color--hover"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button--colorful__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-button--colorful__background-color--focus" 
borderColor="--stsv-button--colorful__border-color--focus"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button--colorful__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-button--colorful__background-color--active" 
borderColor="--stsv-button--colorful__border-color--active"
borderRadius="--stsv-button__border-radius"
borderStyle="--stsv-button__border-style"
borderWidth="--stsv-button__border-width"
color="--stsv-button--colorful__color--active"
/>

### Input

<Swatch 
backgroundColor="--stsv-input--colorful__background-color" 
borderColor="--stsv-input--colorful__border-color"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input--colorful__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-input--colorful__background-color--hover" 
borderColor="--stsv-input--colorful__border-color--hover"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input--colorful__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-input--colorful__background-color--focus" 
borderColor="--stsv-input--colorful__border-color--focus"
borderRadius="--stsv-input__border-radius"
borderStyle="--stsv-input__border-style"
borderWidth="--stsv-input__border-width"
color="--stsv-input--colorful__color--focus"
/>

## Status colors

Several colors can be used to give meaning to status.

<Swatch
backgroundColor="--stsv-status--info__background-color"
borderColor="--stsv-status--info__border-color"
color="--stsv-status--info__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-status--success__background-color"
borderColor="--stsv-status--success__border-color"
color="--stsv-status--success__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-status--warning__background-color"
borderColor="--stsv-status--warning__border-color"
color="--stsv-status--warning__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-status--error__background-color"
borderColor="--stsv-status--error__border-color"
color="--stsv-status--error__color"
/>
<br/>

## Neutrals

The built-in dark and light themes use these neutral colors.

<NeutralColorsExample />

## Colorful

The built-in dark and light themes use these blues in colorful components.

<BlueColorsExample />

## Basic Usage

You can apply a theme with `use:theme`.

```
<div use:theme={{theme: myTheme}}>
  <!-- Components go here -->
</div>
```

You can directly use either of the built-in themes with `use:lightTheme` or `use:darkTheme`.

```
<div use:lightTheme>
	<!-- Components go here -->
</div>
```

```
<div use:darkTheme>
  <!-- Components go here -->
</div>
```

## Toggling between Light and Dark

You can toggle between the light and dark themes with `use:toggleDarkTheme`.
This will automatically follow the OS/browser light or dark theme setting.

```
<div use:toggleDarkTheme>
  <!-- Components go here -->
</div>
```

You can also provide the dark value to directly control the toggling.

```
<div use:toggleDarkTheme={{dark: myToggleValue}}>
  <!-- Components go here -->
</div>
```

## Applying to Document Root

Applying a theme to an element within the body may cause the document element
colors to not match. This often appears as a mismatched background color on the page
when the user scrolls to the top or bottom of the document.

You can apply a theme to the root docment element with any of the theme actions.

```
<div use:theme={{theme: myTheme, atDocumentRoot: true}}>
  <!-- Components go here -->
</div>
```

```
<div use:toggleDarkTheme={atDocumentRoot: true}}>
  <!-- Components go here -->
</div>
```

# Creating a Custom Theme

You can create a custom theme by defining a map of CSS variables to color value.

To allow components to conform to your theme, be sure to define a value for each
CSS variable defined in either the `lightTheme` or `darkTheme`.

```ts
import type { CSSVarSet } from '@geoffcox/sterling-svelte';

export const myTheme: Theme = {
  '--stsv-common__background-color': '#fff',
  '--stsv-common__border-color': '#222',
  //...
```

If you want to make using your theme easier, you can write a Svelte action.

```ts
export const applyMyTheme = (node: HTMLElement, params?: Omit<ThemeActionParams, 'theme'>) => {
  return applyTheme(node, { ...params, theme: myTheme });
};
```

```
<div use:applyMyTheme>
  <!-- Components go here -->
</div>
```
