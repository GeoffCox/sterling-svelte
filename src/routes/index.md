# Overview

**sterling-svelte** is a modern, accessible, and lightweight component library for Svelte.

## Why yet another component library?

There is already a wide spectrum of rich and powerful component libraries to choose from. Some are unopinionated like Semantic UI. Others provide a CSS utility composition model like Bootstrap and Tailwind. Many are highly opinionated like Fluent UI, Material UI, and Ant Design.

Most of the existing component libraries and designs are were built for other frameworks like React or Angular. They tend to have heavier APIs as they compete for features, extend their frameworks for company and product specific goals, or add backward compatibility for previous versions and older browsers. As I looked at the Svelte ports of these libraries, none felt like they were built for Svelte.

## Design Tenets

sterling-svelte is designed as razor thin, classically styled, and ideomatically Svelte. It targets modern, evergreen browser features and the latest accessibility standards.

### Theme and Styles

Components are styled to help focus on the content of the site. They have a neutral color scheme with high contrast ratios. Borders are a medium weight. To be responsive, each component scales its padding and layout font-size.

The theme is a set of CSS variables. Care was taken to balance between too few and generic variables and an overwhelming number of overly-specific variables. Sets of variables are defined for common usage, buttons (i.e. clickable things), input controls, and information display. Additionally, a few semantic colors exist to display information, success, and errors states.

### Slots

Slots provide for customization and replacement of component parts. Input components have a label slot to display a label within the boundaries of the component. This is both the current design fashion and has proven easier for users to parse with limited visual clutter.

### Core Components

Core components that wrap an HTML element will forward props and events to the element. This keeps the props API as thin as possible and supports web standards.

### Dependencies

The API surface is minimal while supporting options common to almost every component library. The package takes dependencies on uuid to create element identifiers, floating-ui to position popups and menus, and lodash-es for data utility functions.
