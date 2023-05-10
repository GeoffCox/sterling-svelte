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
backgroundColor="--stsv-Common__background-color" 
borderColor="--stsv-Common__border-color"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common__color"
/>
<br/>
Secondary, subtle, and faint colors are used for less important text, placeholders, visually separate regions, and decorations.

> The background-color and color pairs do not guarantee sufficient accessibility contrast.

<br/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--secondary" 
color="--stsv-Common__color--secondary"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--subtle" 
color="--stsv-Common__color--subtle"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--faint" 
color="--stsv-Common__color--faint"
/>
<br/>
Outline colors are used across components to indicate keyboard focus.
<br/>
<br/>
<Swatch 
outlineColor="--stsv-Common__outline-color"
outlineOffset="--stsv-Common__outline-offset"
outlineStyle="--stsv-Common__outline-style"
outlineWidth="--stsv-Common__outline-width"
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
--stsv-Disabled__background
<br/>
<br/>

### Button

These are used for clickable buttons that take action.

<Swatch 
backgroundColor="--stsv-Button__background-color" 
borderColor="--stsv-Button__border-color"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button__background-color--hover" 
borderColor="--stsv-Button__border-color--hover"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button__background-color--focus" 
borderColor="--stsv-Button__border-color--focus"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--focus"
/>
<br/><Swatch 
backgroundColor="--stsv-Button__background-color--active" 
borderColor="--stsv-Button__border-color--active"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--active"
/>
<br/>

### Input

These are used with interactive input controls (e.g. checkbox, text input, radio)

<Swatch 
backgroundColor="--stsv-Input__background-color" 
borderColor="--stsv-Input__border-color"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input__background-color--hover" 
borderColor="--stsv-Input__border-color--hover"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input__background-color--focus" 
borderColor="--stsv-Input__border-color--focus"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--disabled" 
borderColor="--stsv-Common__border-color--disabled"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Common__color--disabled"
/>

## Colorful

Many components provde a `colorful` prop to apply accent colors.

Notice that the default neutral styling, hover and focus states get darker.
With colorful, hover and focus states get lighter.
This is because the eye perceives darker neutrals as active, and brighter colors as lit up.

### Common

<Swatch 
backgroundColor="--stsv-Common--colorful__background-color" 
borderColor="--stsv-Common--colorful__border-color"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common--colorful__color"
/>
<br/>
<br/>
<Swatch 
backgroundColor="--stsv-Common--colorful__background-color--secondary" 
color="--stsv-Common--colorful__color--secondary"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common--colorful__background-color--subtle" 
color="--stsv-Common--colorful__color--subtle"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common--colorful__background-color--faint" 
color="--stsv-Common--colorful__color--faint"
/>

### Button

<Swatch 
backgroundColor="--stsv-Button--colorful__background-color" 
borderColor="--stsv-Button--colorful__border-color"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button--colorful__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button--colorful__background-color--hover" 
borderColor="--stsv-Button--colorful__border-color--hover"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button--colorful__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button--colorful__background-color--focus" 
borderColor="--stsv-Button--colorful__border-color--focus"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button--colorful__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button--colorful__background-color--active" 
borderColor="--stsv-Button--colorful__border-color--active"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button--colorful__color--active"
/>

### Input

<Swatch 
backgroundColor="--stsv-Input--colorful__background-color" 
borderColor="--stsv-Input--colorful__border-color"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input--colorful__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input--colorful__background-color--hover" 
borderColor="--stsv-Input--colorful__border-color--hover"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input--colorful__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input--colorful__background-color--focus" 
borderColor="--stsv-Input--colorful__border-color--focus"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input--colorful__color--focus"
/>

## Status colors

Several colors can be used to give meaning to status.

<Swatch
backgroundColor="--stsv-Info__background-color"
borderColor="--stsv-Info__border-color"
color="--stsv-Info__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Success__background-color"
borderColor="--stsv-Success__border-color"
color="--stsv-Success__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Warning__background-color"
borderColor="--stsv-Warning__border-color"
color="--stsv-Warning__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Error__background-color"
borderColor="--stsv-Error__border-color"
color="--stsv-Error__color"
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
  '--stsv-Common__background-color': '#fff',
  '--stsv-Common__border-color': '#222',
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
