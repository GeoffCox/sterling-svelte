<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

A value and button where a dropdown can be opened for changing the value.

## Playground

<Playground />

## Features

- Define any content for the value and popup.
- The dropown is dynamically positioned based on avaiable screen space.

## Interactions

- Clicking the button opens/closes the dropdown.
- Clicking the value opens/closes the dropdown.
- Clicking outside the dropdown closes the dropdown.
- Pressing the escape key closes the dropdown.

## Usage

```svelte
<script lang="ts">
  let open = false;
  let low = 5;
  let high = 500;
</script>

<Dropdown bind:open>
  <div slot="value">
    Delta {high - low}
  </div>
  <div>
    <Slider bind:value={low} max={0} />
    <Slider bind:value={high} min={101} max={200} />
  </div>
</Dropdown>
```

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
| open  | `{open}`     |                       |

## Methods

| Name  | Parameters  | Description          |
| ----- | ----------- | -------------------- |
| blur  |             | HTMLDivElement.blur  |
| click |             | HTMLDivElement.click |
| focus | `(options)` | HTMLDivElement.focus |

## Anatomy

```
Dropdown (div)
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
