<script>
    import Playground from './*Playground.svelte';
</script>

# COMPONENT

## Playground

## Features

- Set the variant to change the style.

## Interactions

- Up/Down arrow keys select the previous/next item.
- Clicking the button, opens the item.

## Usage

```svelte
<script lang="ts">
  import Component from '@geoffcox/sterling-svelte/Component.svelte';
</script>

<Component />
```

## Props

| Name  | Type   | Default | Description               |
| ----- | ------ | ------- | ------------------------- |
| (div) |        |         | HTMLDivElement properties |
| prop  | `type` | `value` | description               |

## Events

| Name  | Event.detail | Description           |
| ----- | ------------ | --------------------- |
| (div) |              | HTMLDivElement events |
| event | `{}`         | description           |

## Methods

| Name   | Parameters | Description |
| ------ | ---------- | ----------- |
| method | `()`       | description |

## Anatomy

```
COMPONENT (div)
  default slot
```

## Slots

| Name | Description |
| ---- | ----------- |
| slot | description |

## Let Params

| Name  | Passed to slots |
| ----- | --------------- |
| param | slot            |

## NAME Context

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
|      |      |         |             |
