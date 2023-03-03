<script>
    import Playground from './TabListPlayground.svelte';
</script>

# TabList

A list of tabs where on tab can be selected.

## Playground

<Playground />

## Features

- Horizontal or vertical layout.

## Interactions

- Clicking a tab selects it
- Arrow keys select the previous or next tab.
- Home/End keys select the first/last tab.

## Props

| Name          | Type      | Description                      |
| ------------- | --------- | -------------------------------- | ----------------------------- |
| disabled      | `boolean` | Disables the tab list and tabs   |
| vertical      | `boolean` | If tabs are displayed vertically |
| selectedValue | `string   | undefined`                       | The value of the selected tab |

## Events

| Name   | Event.detail | Description                    |
| ------ | ------------ | ------------------------------ |
| select | `{ value }`  | Raised when a tab is selected. |

## Anatomy

```
TabList
  default slot
```

## Slots

| Name    | Description                                |
| ------- | ------------------------------------------ |
| default | Declared children, typically Tab controls. |

## Let Params

| Name          | Type      | Passed to slots |
| ------------- | --------- | --------------- |
| disabled      | `boolean` | default         |
| selectedValue | `string`  | default         |
| vertical      | `boolean` | default         |
