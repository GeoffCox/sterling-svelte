<script>
    import Playground from './DropdownPlayground.svelte';
</script>

# Dropdown

Displays a value and button that opens a dropdown for changing the value.

## Members

| Name                | Type    | Default | Description                                                           |
| ------------------- | ------- | ------- | --------------------------------------------------------------------- |
| disabled            | boolean | false   | When true, the dropdown is disabled and closed                        |
| open                | boolean | false   | When true, the dropdown is open                                       |
| stayOpenOnClickAway | boolean | false   | When true and the user clicks away from the dropdown, it remains open |
| variant             | string  | ''      | Additional class names to apply                                       |
| on:open             | event   |         | Raised when the dropdown opens or closes                              |
| (various)           |         |         | HTMLDivElement props, events, and functions                           |

## Anatomy

```
<div class="sterling-dropdown">
  <div class="value">
    <slot name="value" {disabled} {open} {variant} />
  </div>
  <slot name="button" {disabled} {open} {variant}>
    <div class="button">
      <slot name="icon" {disabled} {open} {variant}>
        <div class="chevron" />
      </slot>
    </div>
  </slot>
  <Popover>
    <div class="sterling-dropdown-popup-content">
      <slot {disabled} {open} {variant} />
    </div>
  </Popover>
</div>
```

## Playground

<Playground />
