<script>
    import Example from './TabListPlayground.svelte';
</script>

# TabList

A list where selecting an item switches to its associated view.

## Playground

<Example />

## Features

- Choose between vertical or horizontal layout.
- Choose if selection follows focus.
- Users can focus the previous/next tab with arrow keys.
- Users can focus the first/last tab with the home/end keys.
- Provide tabs as an array of data or declare tabs in HTML.

## Props

| Name                  | Type           | Description                                   |
| --------------------- | -------------- | --------------------------------------------- |
| disabled              | `boolean`      | Disables the tab list and tabs                |
| tabs                  | `TabData<T>[]` | The items in the list                         |
| vertical              | `boolean`      | If tabs are displayed vertically              |
| selectedTab           | `TabData<T>`   | The data of the selected tab when databinding |
| selectedTabId         | `string`       | The ID of the selected tab                    |
| selectionFollowsFocus | `boolean`      | If a tab is selected whenever it is focused   |

## Events

| Name   | Event.detail     | Description                    |
| ------ | ---------------- | ------------------------------ |
| select | `{ tabId, tab }` | Raised when a tab is selected. |

## Anatomy

```
TabList
  list of tabs
    Tab
  _default_ slot
```

## Slots

| Name       | Description                              |
| ---------- | ---------------------------------------- |
| default    | Any declared children                    |
| tabContent | A template for the content of each `Tab` |

- default slot `let` params: (none)
- tabContent slot `let` params: data, disabled, selected, tabId, text
