# Tooltip

Descriptive information that floats above and near another element.

<script>
    import Playground from './TooltipPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Set if hover or click shows the tooltip
- The tooltip floats above other element via portaling
- Set another element as the portal target
- Set the delay before the tooltip is shown

## Interactions

- Hovering over the reference element can display the tooltip
- Clicking the reference element can display the tooltip

## Usage

```svelte
<script lang="ts">
  import Tooltip from '@geoffcox/sterling-svelte/Tooltip.svelte';
</script>

<Tooltip>
  <div>sterling-svelte</div>
  <div slot="tip">A modern, accessible, and lightweight component library for Svelte.</div>
</Tooltip>
```

## Props

| Name                   | Type               | Default         | Description                                                 |
| ---------------------- | ------------------ | --------------- | ----------------------------------------------------------- |
| disabled               | `boolean`          | `false`         | If showing the tooltip is disabled.\*                       |
| showOn                 | `TooltipShowOn`    | `hover`         | Which interaction shows/hides the tooltip                   |
| hoverDelayMilliseconds | `number`           | `1000`          | How long to delay before showing the tooltip                |
| open                   | `boolean`          | `false`         | If the tooltip is visible                                   |
| placement              | `TooltipPlacement` | `top`           | Where the tooltip appears relative to the reference element |
| portalTarget           | `HTMLElement`      | `document.body` | The element to target for the tooltip portal                |

- TooltipShowOn = `'click'` | `'hover'`
- TooltipPlacement = `'top'` | `'right'` | `'bottom'` | `'left'` | `'top-start'` | `'right-start'` | `'bottom-start'` | `'left-start'` | `'top-end'` | `'right-end'` | `'bottom-end'` | `'left-end'`
- \* Disabling the tooltip only prevents showing it. It does not disable the default slot contents.

## Anatomy

```
default slot
origin (div)

Tooltip (div)
    tip slot
```

The origin is a non-displayed element immediately following the default slot.
It locates the preceding element to reference for positioning the tooltip.

## Slots

| Name    | Description                                       |
| ------- | ------------------------------------------------- |
| default | The reference content associated with the tooltip |
| tip     | The content of the tooltip                        |

# Let Params

| Name     | Passed to slots |
| -------- | --------------- |
| disabled | default         |
| open     | default         |
