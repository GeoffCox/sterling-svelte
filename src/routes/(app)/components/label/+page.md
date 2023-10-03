<script>
    import Playground from './LabelPlayground.svelte';
</script>

# Label

A label container for an interactive element such as an input, select, list, or tree.

- An optional message and status can provide information to the user about their value.
- The required property and requiredReason indicate the user must fill in a value and why.

## Types

```ts
export type LabelStatus = 'none' | 'info' | 'success' | 'warning' | 'danger';
```

## Props

HTMLLabelElement props are included.

```ts
/**
 * If true, clicking the label invokes a click on the content.
 * Needed only when the label is not associated with the content through containment or the `for`/`id` relationship.
 */
export let forwardClick = false;

/** The text to display in the label. Not used if the text slot is filled. */
export let text: string | undefined = undefined;

/** The status message to display. */
export let message: string | undefined = undefined;

/** When true, indicates a value is required. */
export let required = false;

/** The reason the value is required. */
export let requiredReason = 'required';

/** The status of the label. */
export let status: LabelStatus = 'none';

/** Additional class names to apply. */
export let variant: string = '';

/** When true, the label appears above the content. */
export let vertical = true;
```

## Events

HTMLLabelElement events are included.

## Methods

HTMLLabelElement `blur`, `click`, and `focus` methods are included.

## Anatomy

```svelte
<label class="sterling-label">
   <slot name="text" {disabled} {for} {forwardClick} {required} {text} {variant}>
    <div class="text">{text}</div>
    </slot>
  <div class="content">
    <slot />
  </div>
  <slot name="message" {disabled} {message} {required} {status} {variant}>
    <div class="message">{message}</div>
  </slot>
  <slot name="required" {requiredReason} {variant}>
    <Tooltip>
      <span class="required-reason" slot="tip">{requiredReason}</span>
      <div class="required">*</div>
    </Tooltip>
  </slot>
</label>
```

<Playground />
