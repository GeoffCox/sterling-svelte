# Overview

## Why yet another component library?

Many component libraries for Svelte are ports of libraries from React or Angular.
Others are CSS ported from design systems like Material UI or Bootstrap.

Svelte builds components that encapsulate behavior, layout, and style.
This can make it difficult to provide component style customization.
Most existing libraries are either strictly opinionated and offer little customization,
or have an overwhelming number of specialty customization knobs.

I needed a component library built to take full advantage of Svelte.
I wanted a consistent minimalist style with a practical style customization.

**_sterling-svelte_**:

- is thin and lightweight
- is minimal and classically styled
- is ideomatic Svelte
- targets modern, evergreen browsers
- meets latest accessibility standards

## Design

### Theme and Styles

- Built in themes have a neutral color palette with high contrast ratios.
  This keeps the focus on the content of your application.
- Size, spacing, and borders are medium weight to make visual separation easy to see while maintaining a clean look.
- Each component scales its padding and layout based on font EMs to remain responsive and avoid hard-coded pixel values.
- The theme is applied as CSS variables to allow theme switching without re-rendering.
- The theme balances general purpose and component-specific variables to provide customization with the minimal performance cost.

### Slots

- Components use slots for customization and replacement of parts.
  For example, input components have a label slot for changing the label component rather than only providing a string value.
- The default slot is reserved for transclusion where the slot represents the content typically between the open and close tags.
  Named slots provide better semantic meaning and extensibility without breaking changes.

### Native HTML Element Components

- Components that render or wrap an HTML element will forward props and bubble events.

## Dependencies

- Dependencies are kept to an absolute minimum and the build tree-shakes out unused code.
  They are regularly reviewed as the library evolves.

| Library     | Usage                           |
| ----------- | ------------------------------- |
| uuid        | to create element identifiers   |
| floating-ui | to position popups and overlays |
| lodash-es   | for data utility functions      |

## Roadmap

The library is in alpha - anything and everything may change at any time.

| Component | Introduced in Version |
| --------- | --------------------- |
| (theme)   | 0.0.1                 |
| Button    | 0.0.3                 |
| Input     | 0.0.4                 |
| Checkbox  | 0.0.5                 |
| Radio     | 0.0.6                 |
| List      | 0.0.7                 |
| Select    | 0.0.7                 |
| Progress  | 0.0.8                 |
| Slider    | 0.0.8                 |
| Dialog    | 0.0.9                 |
| Label     | 0.0.10                |
| Switch    | 0.0.11                |
| TextArea  | 0.0.13                |
| Tree      | 0.0.14                |
| Tabs      | 0.0.15                |
| Menus     | 0.0.16                |

| Possible Future Components |
| -------------------------- |
| Tooltip                    |
| Toggle/Choice              |
| Accordion                  |
| Notifications              |
| Drawer                     |
