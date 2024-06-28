<script>
    import Playground from './LabelPlayground.svelte';
</script>

# Label

A label container for an interactive element such as an input, select, list, or tree.

- An optional message and status can provide information to the user about their value.
- The required property and requiredReason indicate the user must fill in a value and why.

## Types

| Name        | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| LabelStatus | 'none' &#124; 'info' &#124; 'success' &#124; 'warning' &#124; 'danger' |

## Members

| Name           | Type        | Default | Description                                                           |
| -------------- | ----------- | ------- | --------------------------------------------------------------------- |
| forwardClick   | boolean     | false   | If true, clicking the label invokes a click on the content.           |
| text           | string      | ''      | The text to display in the label. Not used if the text slot is filled |
| message        | string      | ''      | The status message to display                                         |
| required       | boolean     | false   | When true, the label will indicate a value is required                |
| requiredReason | string      | ''      | The reason a value is required                                        |
| status         | LabelStatus | ''      | The status of the label message                                       |
| variant        | string      | ''      | Additional class names to apply                                       |
| vertical       | boolean     | true    | When true, the label appears above the content                        |
| (various)      |             |         | HTMLLabelElement props, events, and functions                         |

## Anatomy

```
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

## Considerations

- forwardClick is not used when the label is associated with the content through containment or the `for`/`id` relationship.

## Playground

<Playground />
