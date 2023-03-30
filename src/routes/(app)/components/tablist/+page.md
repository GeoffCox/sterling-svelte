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

- Clicking a tab selects it.
- Left/Right arrow keys select the previous/next tab when horizontal.
- Up/Down arrow keys select the previous/next tab when vertical.
- Home/End keys select the first/last tab.

## Usage

```svelte
<script lang="ts">
  import TabList from '@geoffcox/sterling-svelte/TabList.svelte';
  import Tab from '@geoffcox/sterling-svelte/Tab.svelte';

  let selectedValue: string = 'apple';
</script>

<TabList bind:selectedValue>
  <Tab value="apple">Apple</Tab>
  <Tab value="banana">Banana</Tab>
  <Tab value="grapes">Grapes</Tab>
  <Tab value="orange">Orange</Tab>
</TabList>
```

## Props

| Name          | Type                    | Description                      |
| ------------- | ----------------------- | -------------------------------- |
| (div)         |                         | HTMLDivElement properties        |
| disabled      | `boolean`               | Disables the tab list and tabs   |
| vertical      | `boolean`               | If tabs are displayed vertically |
| selectedValue | `string` \| `undefined` | The value of the selected tab    |

## Events

| Name   | Event.detail | Description                    |
| ------ | ------------ | ------------------------------ |
| (div)  |              | HTMLDivElement events          |
| select | `{ value }`  | Raised when a tab is selected. |

## Methods

| Name              | Parameters  | Description                          |
| ----------------- | ----------- | ------------------------------------ |
| blur              |             | HTMLDivElement.blur                  |
| click             |             | HTMLDivElement.click                 |
| focus             | `(options)` | HTMLDivElement.focus                 |
| selectFirstTab    |             | Selects the first tab in the list    |
| selectPreviousTab |             | Selects the previous tab in the list |
| selectNextTab     |             | Selects the next tab in the list     |
| selectLastTab     |             | Selects the last tab in the list     |

## Anatomy

```
TabList (div)
  default slot
```

## Slots

| Name    | Description                                 |
| ------- | ------------------------------------------- |
| default | TabList content. Typically `Tab` components |

## Let Params

| Name          | Type      | Passed to slots |
| ------------- | --------- | --------------- |
| disabled      | `boolean` | default         |
| selectedValue | `string`  | default         |
| vertical      | `boolean` | default         |

## TabListContext

- TabList sets TabListContext for children

| Name          | Type                            | Default     | Description                                 |
| ------------- | ------------------------------- | ----------- | ------------------------------------------- |
| disabled      | `Readable<boolean>`             | `false`     | If the tab list is disabled                 |
| usingKeyboard | `Readable<boolean>`             | `false`     | If the user is navigating with the keyboard |
| vertical      | `Readable<boolean>`             | `false`     | If the tab list is vertical                 |
| selectedValue | `Writable<string`\|`undefined>` | `undefined` | The selected tab value                      |
