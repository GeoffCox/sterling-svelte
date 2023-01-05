# Overview

## Why yet another component library?

You can choose from a wide spectrum of rich and powerful component libraries. They vary between the unopinionated
that require significant configuration to look decent and the opinionated ones that start great out-of-the-box, but
offer little customization. As Svelte is the new kid on the block, most are built for other frameworks like
React or Angular.

I want components designed and built to take full advantage of Svelte. I try to balance consistency and customization
with global, usage, and component-specific theme properties. Since Svelte naturally builds self-contained
components the layout, behavior, and style, components will be opinionated. I kept the design minimal and neutral to
allow custom themes to shine.

## Design Tenets

sterling-svelte is designed to:

- be razor thin
- have classic and minimalistic style
- ideomatically Svelte
- target modern, evergreen browser features
- follow the latest accessibility standards

### Theme and Styles

Components have a neutral color scheme with high contrast ratios. Borders are medium weight. To be responsive, each component scales its padding and layout based on font ems. In some cases, pixel spacing or thickness is used but only
after verifying it looks correct and multiple sizes.

The theme is implemented using CSS variables. Care was taken to balance between too few and generic variables and an overwhelming number of component-specific variables. Sets of variables are defined for common usage, buttons (i.e. clickable things), form inputs, containers/lists, and information display. Additionally, a set of semantic colors
display information, success, and errors states.

### Slots

Components leverage Svelte's slots for customization and replacement of component parts. For example, input components
have a label slot for changing the label component rather than only providing a string value.

### Native Element Components

Components that wrap an HTML element will forward props to the element and bubble events from the element. If the
native element type is not suitable, a component may avoid using the native element in favor of its own behavior
and style via div elements.

## Dependencies

Dependencies are kept to an absolute minimum. All dependencies are reviewed as the library evolves to determine if
they should be inlined or can be removed.

- uuid to create element identifiers
- floating-ui to position popups and overlays
- lodash-es for data utility functions

## Roadmap

| Component | Published in Version |
| --------- | -------------------- |
| (theme)   | 0.0.1                |
| Button    | 0.0.3                |
| Input     | 0.0.4                |
| Checkbox  | 0.0.5                |
| Radio     | 0.0.6                |
| List      | 0.0.7                |
| Select    | 0.0.7                |
| Slider    |                      |
| Progress  |                      |
| Menu      |                      |
| Tree      |                      |
| Tooltip   |                      |
| Dialog    |                      |
