<script>
    import Playground from './CheckboxPlayground.svelte';
</script>

# Checkbox

A styled HTML `input` element with `type=checkbox`.

## Members

| Name      | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| variant   | string | ''      | Additional class names to apply               |
| (various) |        |         | HTMLInputElement props, events, and functions |

## Anatomy

```
<div class="sterling-checkbox">
  <div class="container">
    <!-- hidden-->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {inputId} {value} {variant} />
  </label>
</div>
```

## Playground

<Playground />
