# Label

A styled `<label/>`.

<script>
    import Playground from './LabelPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Supports disabled state

## Usage

```svelte
<script lang="ts">
  let greeting: string = 'Hello';
</script>

<Label for="greeting">Greeting</Label>
<Input id="greeting" bind:value={greeting} />
```

## Props

| Name     | Type    | Default | Description                                |
| -------- | ------- | ------- | ------------------------------------------ |
| (label)  |         |         | HTMLLabelElement properties                |
| disabled | boolean | false   | Disables the label making it look inactive |

## Events

| Name    | Event.detail | Description             |
| ------- | ------------ | ----------------------- |
| (label) |              | HTMLLabelElement events |

## Methods

| Name  | Parameters  | Description            |
| ----- | ----------- | ---------------------- |
| blur  |             | HTMLLabelElement.blur  |
| click |             | HTMLLabelElement.click |
| focus | `(options)` | HTMLLabelElement.focus |

## Anatomy

```
HTML (label)
   default slot
```

## Slots

| Name    | Description                             |
| ------- | --------------------------------------- |
| default | The content to display within the label |
