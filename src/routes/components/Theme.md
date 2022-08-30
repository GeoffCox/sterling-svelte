# Theme

Each theme provides a set of CSS variables used to style components consistently.

<script>
    import ThemeExample from '../_examples/ThemeExample.svelte';
    import PaletteExample from '../_examples/NeutralColorsExample.svelte';
</script>

<ThemeExample />

## Applying themes

You can apply a custom theme through the use:theme action.
For convienence, you can apply use:lightTheme or use:darkTheme to use one of the built in themes.

```html
<div use:theme="{myTheme}">
	<!-- Components go here -->
</div>

<div use:lightTheme>
	<!-- Components go here -->
</div>

<div use:darkTheme>
	<!-- Components go here -->
</div>
```

## Neutral Colors

The built in dark and light themes use the following neutral colors.
These allow for sufficient contrast for accessibility and subtle design.

<PaletteExample />
