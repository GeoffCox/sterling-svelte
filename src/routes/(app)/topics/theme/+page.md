<script>
    import DisabledSwatch from '../../_shared/DisabledSwatch.svelte';
    import Swatch from '../../_shared/Swatch.svelte';
</script>

# Sterling Theme

While sterling-svelte components do not apply any default style, a set of CSS styles defined is provided for you to use if you like.

You can choose to import all the component styles:

```
import '@geoffcox/sterling-svelte/css/sterling.css'
```

or pick the individual component styles:

```
import '@geoffcox/sterling-svelte/css/light-mode.css'
import '@geoffcox/sterling-svelte/css/dark-mode.css'
import '@geoffcox/sterling-svelte/css/Button.css'
import '@geoffcox/sterling-svelte/css/Checkbox.css'
```

## Component classes

Components render HTML structure and class names to support styling and themes.
They can be considered an API contract for the CSS styles. Any changes are considered breaking changes.

- Each component's root element has a `stering-<component>` class name. For example, `Button` has `sterling-button`.
- Components use the natural state pseudo-selectors whenever they exist for the HTML element being rendered. For example, `Button` styles use `:hover`, `:active`, and `:disabled` selectors.
- When components have state that isn't represented by built-in pseudo-selectors, they apply class names (e.g. `'.checked`, `.open`, `.disabled`, `.vertical`).
- Components also apply class names to help identify child elements (e.g. `.item`, `.container`, `.fill`, `.thumb`).

## CSS variables

- The sterling theme uses css variables starting with `--stsv-` to switch modes.
- Each CSS variable follows the [Block**Element**Modifier (BEM)](https://getbem.com/introduction/) naming convention. For example, `--stsv-button__background-color`, `--stsv-button__border-color`, and `-stsv-button__color`.
- There are fewer than 100 CSS variables defined to handle common, button, input, and status colors.

## Light and dark modes

The sterling theme supports light and dark mode by changing CSS variable values.

- The `applyLightDarkMode` action applies `.light-mode` or `.dark-mode` class name and the theme will apply styles based on selecting these. This action can automatically switch modes based on the browser and user preferences.
- When light/dark mode changes, the variables are updated to show the theme without re-rendering the button.

## Variants

Each component has a `variant` string property. The variant value appended to the component's root element class property. This allows callers to vary the style.

You can apply multiple variants. For example `Button` can have `circular` and `tool` applied. The variants are listed in each component's documentation.

## Custom Theming

You can define CSS in your application using any CSS framework you like (e.g. LESS, SASS, Tailwind, Bootstrap). Then you can include it after the sterling theme, or replace the sterling theme.

To figure out what selectors to put in your CSS, you can look at the component source, inspect the component's HTML, or use the sterling theme CSS as an example.

For example, the base Button styles [here](https://github.com/GeoffCox/sterling-svelte/blob/main/src/lib/css/Button.base.css) demonstrate setting the default and state styles.

- `.sterling-button`
- `.sterling-button:hover`
- `.sterling-button:active`
- `.sterling-button:focus-visible`
- `.sterling-button:disabled`

The `.sterling-button:disabled::after` style shows the disabled diagnonal stripe (i.e. no step) pattern over the button.

## Theme Values

### Common

The common variables are used for body text and containers (e.g. lists, trees).

<Swatch 
backgroundColor="--stsv-common__background-color" 
borderColor="--stsv-common__border-color"
color="--stsv-common__color"
/>
<br/>

### Common - Outline

Outline colors are used across components to indicate keyboard focus.
<Swatch 
borderColor="--stsv-common__outline-color"
/>
<br/>

### Common - Disabled

Components indicate disabled state as an overlay with a diagonal striped pattern.

<br/>
<DisabledSwatch />
<br/>

- The pattern is taken from the diagonal "NO STEP" pattern on aircraft.
- The stripes are white and black with low opacity and work well across light and dark themes.

> Traditionally, disabled state is indicated using dimmed colors of the component often
> centering aroound a midline gray. This tends to damage contrast when the background,
> border, and foreground colors are near the disabled colors.

<br/>

### Common - Secondary, Subtle, and Faint

Secondary, subtle, and faint colors are used for less important text, placeholders, visually separate regions, and decorations.

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

### Button

These are used for clickable buttons that take action.

<Swatch 
backgroundColor="--stsv-button__background-color" 
borderColor="--stsv-button__border-color"
color="--stsv-button__color"
/>
<br/>

### Button - Hover

<Swatch 
backgroundColor="--stsv-button__background-color--hover" 
borderColor="--stsv-button__border-color--hover"
color="--stsv-button__color--hover"
/>
<br/>

### Button - Focus

<Swatch 
backgroundColor="--stsv-button__background-color--focus" 
borderColor="--stsv-button__border-color--focus"
color="--stsv-button__color--focus"
/>
<br/>

### Button - Active

<Swatch 
backgroundColor="--stsv-button__background-color--active" 
borderColor="--stsv-button__border-color--active"
color="--stsv-button__color--active"
/>
<br/>

### Input

These are used with interactive form controls (e.g. checkbox, text input, radio)

<Swatch 
backgroundColor="--stsv-input__background-color" 
borderColor="--stsv-input__border-color"
color="--stsv-input__color"
/>
<br/>

### Input - Hover

<Swatch 
backgroundColor="--stsv-input__background-color--hover" 
borderColor="--stsv-input__border-color--hover"
color="--stsv-input__color--hover"
/>
<br/>

### Input - Focus

<Swatch 
backgroundColor="--stsv-input__background-color--focus" 
borderColor="--stsv-input__border-color--focus"
color="--stsv-input__color--focus"
/>

### Input - Selected

<Swatch 
backgroundColor="--stsv-input__background-color--selected" 
borderColor="--stsv-input__border-color--selected"
color="--stsv-input__color--selected"
/>

### Status Colors

Several colors are used to create an association with a status.

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
backgroundColor="--stsv-status--danger__background-color"
borderColor="--stsv-status--danger__border-color"
color="--stsv-status--danger__color"
/>
<br/>

## Sterling Theme Colorful CSS Vars

Many components support a `colorful` variant to apply accent colors.

### Common

<Swatch 
backgroundColor="--stsv-common--colorful__background-color" 
borderColor="--stsv-common--colorful__border-color"
color="--stsv-common--colorful__color"
/>
<br/>

### Common - Secondary, Subtle, and Faint

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
color="--stsv-button--colorful__color"
/>
<br/>

### Button - Hover

<Swatch 
backgroundColor="--stsv-button--colorful__background-color--hover" 
borderColor="--stsv-button--colorful__border-color--hover"
color="--stsv-button--colorful__color--hover"
/>
<br/>

### Button - Focus

<Swatch 
backgroundColor="--stsv-button--colorful__background-color--focus" 
borderColor="--stsv-button--colorful__border-color--focus"
color="--stsv-button--colorful__color--focus"
/>
<br/>

### Button - Active

<Swatch 
backgroundColor="--stsv-button--colorful__background-color--active" 
borderColor="--stsv-button--colorful__border-color--active"
color="--stsv-button--colorful__color--active"
/>

### Input

<Swatch 
backgroundColor="--stsv-input--colorful__background-color" 
borderColor="--stsv-input--colorful__border-color"
color="--stsv-input--colorful__color"
/>
<br/>

### Input - Hover

<Swatch 
backgroundColor="--stsv-input--colorful__background-color--hover" 
borderColor="--stsv-input--colorful__border-color--hover"
color="--stsv-input--colorful__color--hover"
/>
<br/>

### Input - Focus

<Swatch 
backgroundColor="--stsv-input--colorful__background-color--focus" 
borderColor="--stsv-input--colorful__border-color--focus"
color="--stsv-input--colorful__color--focus"
/>

### Input - Selected

<Swatch 
backgroundColor="--stsv-input--colorful__background-color--selected" 
borderColor="--stsv-input--colorful__border-color--selected"
color="--stsv-input--colorful__color--selected"
/>
