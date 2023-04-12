# sterling-svelte Overview

- lightweight (`< 300K`)
- minimal and classic design
- fast rendering performance thanks to Svelte
- ideomatic Svelte
- for modern, evergreen browsers
- follows aria accessibility standards

## Sterling Design System

- The sterling theme is a set of CSS variables set by the `applyTheme` action.
- CSS variables allow theme switching without re-rendering components.
- The theme balances general purpose and component-specific variables.
  This provides practical customization with minimal cost.
- Each theme variable is prefixed with `--stsv-` to indicate it belongs to sterling-svelte.
- Each theme variable also follows the Block Element Module (BEM) naming convention.

### Built in themes

- A neutral color palette keeps the focus on the content of your application.
- High contrast ratios meet or exceed accessibility standards.
- Medium weight (size, spacing, and borders) create clear visual separation with a clean style.
- Components use font `em`s for non-theme layout to remain responsive and avoid hard-coded pixel values.

## Dependencies

- Dependencies are kept to an absolute minimum and the build tree-shakes out unused code.
  They are regularly reviewed as the library evolves.

| Library     | Usage                           |
| ----------- | ------------------------------- |
| floating-ui | to position popups and overlays |
| keyborg     | for typing detection            |
| lodash-es   | for data utility functions      |
