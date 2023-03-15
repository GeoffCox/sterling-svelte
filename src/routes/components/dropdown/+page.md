<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

An displayed value and button where a dropdown appears when open.

## Playground

<Playground />

## Features

- Define any content for the value and popup.
- The panel is dynamically positioned based on avaiable screen space.
- Clicking the button opens/closes the dropdown.
- Clicking the value opens/closes the dropdown.
- Clicking outside the dropdown closes the dropdown.
- The escape key closes the dropdown.

## Usage

## Props

| Name                | Type      | Default | Description                                                                          |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------ |
| (div)               |           |         | HTMLDivElement properties                                                            |
| composed            | `boolean` | `false` | When true, the component should be styled to be hosted within a container component. |
| disabled            | `boolean` | `false` | When true, the component is disabled.                                                |
| open                | `boolean` | `false` | When true, the dropdown is opened.                                                   |
| stayOpenOnClickAway | `boolean` | `false` | When true and clicking outside the dropdown, it remains open.                        |

## Events

| Name  | Event.detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HTMLDivElement events |

## Anatomy

```
Dropdown
  value slot
  button slot
  dropdown
    default slot
```

## Slots

| Name    | Description                                    |
| ------- | ---------------------------------------------- |
| button  | The button that opens and closes the dropdown. |
| default | The items to display within the dropdown.      |
| value   | The content to display with the button.        |

## Let Parameters

| Name     | Passed to slots        |
| -------- | ---------------------- |
| composed | button, default, value |
| disabled | button, default, value |
| open     | button, default, value |
