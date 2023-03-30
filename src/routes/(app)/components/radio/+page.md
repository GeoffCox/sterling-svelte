# Radio

A styled `<input type="radio" />`

<script>
    import Playground from './RadioPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Add label content to describe the checkbox.

## Usage

```svelte
<script lang="ts">
  import Radio from '@geoffcox/sterling-svelte/Radio.svelte';

  const values = ['apple', 'banana', 'grapes', 'orange'];
  let selectedValue = 'apple';
</script>

<div class="component" slot="component">
  {#each values as value}
    <Radio bind:group={selectedValue} name="fruits" {value}>{value}</Radio>
  {/each}
</div>
```

## Props

| Name    | Type                           | Default     | Description                                          |
| ------- | ------------------------------ | ----------- | ---------------------------------------------------- |
| (input) |                                |             | HTMLInputElement properties                          |
| group   | `any` \| `null` \| `undefined` | `undefined` | Use with bind to set the value as a radio is checked |

## Events

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| (input) |      | HTMLInputElement events |

## Methods

| Name  | Parameters  | Description            |
| ----- | ----------- | ---------------------- |
| blur  |             | HTMLInputElement.blur  |
| click |             | HTMLInputElement.click |
| focus | `(options)` | HTMLInputElement.focus |

## Anatomy

```
Radio (div)
  input //hidden
  radio dot (div)
  Label
    default slot
      {value}
```

## Slots

| Name    | Description         |
| ------- | ------------------- |
| default | Radio label content |

## Let Params

| Name     | Passed to slots |
| -------- | --------------- |
| checked  | default         |
| disabled | default         |
| group    | default         |
| inputId  | default         |
| value    | default         |
