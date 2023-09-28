<script>
    import Playground from './LabelPlayground.svelte';
</script>

# Label

A label container for an interactive element such as an input, select, list, or tree.

- Set the status and message of the label to provide more information to the user.
- Set the required property to indicate the user must fill in a value and requiredReason to explain why.
- Label watches the contained content to detect and set disabled state.

## Types

```ts
type LabelStatus = 'none' | 'info' | 'success' | 'warning' | 'danger';
```

## Props

HTMLLabelElement props are included.

```ts
/**
 * If true, clicking the label invokes a click on the content.
 * Only necessary when the label is not associated with the content through containment or the for/id relationship.
 */
export let forwardClick = false;

/** The text to display in the label. Not used if the text slot is filled. */
export let text: string | undefined = undefined;

/** The status message to display */
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

Use the default slot for the content that should be labeled.
This is most often a form input control.

```svelte
<label>
  <slot name="text"{disabled} {for} {forwardClick} {required} {text} {variant} />
  <slot />
  <slot name="message" {disabled} {message} {required} {status} {variant}>
  <slot name="required" {requiredReason} {variant}>
</label>
```

<Playground />
