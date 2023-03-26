<script>
    import Playground from './LinkPlayground.svelte';
</script>

# Link

A styled `<a />`.

## Playground

<Playground />

## Features

- The link can be disabled.
- You can choose different variants of the link style.

## Usage

```svelte
<Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">
  &lt;a&gt;: The Anchor element
</Link>
```

## Props

| Name     | Type        | Default   | Description                        |
| -------- | ----------- | --------- | ---------------------------------- |
| (a)      |             |           | HTMLAnchorElement properties       |
| disabled | boolean     | false     | Disables the component             |
| variant  | LinkVariant | 'regular' | Changes the style of the component |

- LinkVariant: 'regular' | 'ghost' | 'undecorated'

## Events

| Name | Event.detail | Description              |
| ---- | ------------ | ------------------------ |
| (a)  |              | HTMLAnchorElement events |

## Methods

| Name  | Parameters  | Description             |
| ----- | ----------- | ----------------------- |
| blur  |             | HTMLAnchorElement.blur  |
| click |             | HTMLAnchorElement.click |
| focus | `(options)` | HTMLAnchorElement.focus |

## Anatomy

```
Link (<a />)
  default slot
```

## Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Content within the link |

## Let Params

| Name     | Passed to slots |
| -------- | --------------- |
| disabled | default         |
| href     | default         |
| variant  | default         |
