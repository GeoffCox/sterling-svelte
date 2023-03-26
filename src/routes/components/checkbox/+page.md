<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled `<input type=checkbox />`.

## Playground

<Playground />

## Features

- Add label content to describe the checkbox.

## Usage

```svelte
<script lang="ts">
  import Checkbox from '@geoffcox/sterling-svelte/Checkbox.svelte';

  let checked = false;

  const onChange = () => {
    //do something on the change
  };
</script>

<Checkbox bind:checked on:change={onChange}>sterling-svelte</Checkbox>
```

## Props

| Name    | Type | Default | Description                 |
| ------- | ---- | ------- | --------------------------- |
| (input) |      |         | HTMLInputElement properties |

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
Checkbox (div)
  input type=checkbox //hidden
  checkmark (div)
  Label
    default slot
      {value}
```

## Slots

| Name    | Description            |
| ------- | ---------------------- |
| default | Checkbox label content |

## Let Params

| Name     | Passed to slots |
| -------- | --------------- |
| checked  | default         |
| disabled | default         |
| inputId  | default         |
| value    | default         |
