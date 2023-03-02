# Tooltip

Helper information that appears floating above and nearby a reference element.

<script>
    import Playground from './TooltipPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Can choose whether hover or click shows/hides the tooltip
- Tooltip is portaled to allow it to float regardless of the parent CSS overflow.
- Can choose an element other than document.body as the portal target
- Can control the delay before the tooltip is shown

## Interactions

- Hover can display the tooltip
- Click can display the tooltip

## Props

| Name                   | Type              | Default         | Description                                  |
| ---------------------- | ----------------- | --------------- | -------------------------------------------- |
| autoShow               | `TooltipAutoShow` | `undefined`     | Which interaction shows/hides the tooltip    |
| hoverDelayMilliseconds | `number`          | `1000`          | How long to delay before showing the tooltip |
| open                   | `boolean`         | `false`         | If the tooltip is visible                    |
| portalTarget           | `HTMLElement`     | `document.body` | The element to target for the tooltip portal |

- TooltipAutoShow = `undefined` | `'click'` | `'hover'`

## Anatomy

```
default slot
anchor

Tooltip
    tip slot
```

The anchor is a non-displayed element immediately following the default slot.
It locates the preceding element to reference for positioning the tooltip.

## Slots

| Name    | Description                                       |
| ------- | ------------------------------------------------- |
| default | The reference content associated with the tooltip |
| tip     | The content of the tooltip                        |
