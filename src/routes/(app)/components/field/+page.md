# Field

A label container for an interactive element such as an input, select, list, or tree.

<script>
    import Playground from './FieldPlayground.svelte';
</script>

## Playground

<Playground />

## Features

- Wraps the interactive element with a label.
- Provides a border and background with hover, disabled, and focus states.
- Disables the label when the interactive element is disabled.
- Accepts the label `for` attribute to associate with the `id` of the interactive element.
- An optional message can be displayed within the field border.
- The optional message can be associated with a status.

## Interactions

- Clicking on the label focuses the interactive element.

## Usage

Use `for` to reference the `id` of the interactive element.

Sterling container controls with their own borders typically have a `composed` propperty.
Setting `composed` removes the borders and background to allow the field to manage them.

```svelte
<Field label="First Name" for="FirstName">
  <Input id="FirstName" bind:value={firstName} composed />
</Field>
```

If you don't use `for`, you get the default behavior of a `label` wrapped
around the interactive element.

```svelte
<Field label="First Name">
  <Input bind:value={firstName} composed />
</Field>
```

## Props

| Name         | Type          | Default                    | Description                                          |
| ------------ | ------------- | -------------------------- | ---------------------------------------------------- |
| (label)      |               |                            | HTMLLabelElement properties                          |
| forwardClick | `boolean`     | `false`                    | If clicks on the label click the interactive element |
| label        | `string`      |                            | Text content of the label                            |
| message      | `string`      |                            | Text content of the field message                    |
| required     | `boolean`     | `false`                    | If the field displays a required indicator           |
| requiredTip  | `string`      | `'This field is required'` | The tooltip for the required indicator               |
| status       | `FieldStatus` | `'none'`                   | Status of the field message                          |

- FieldStatus = 'none' | 'info' | 'success' | 'warning' | 'error'

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
Field (label)
  label slot
  default slot
  message slot
```

## Slots

| Name     | Default content          | Description                                        |
| -------- | ------------------------ | -------------------------------------------------- |
| default  |                          | The interactive control for the field              |
| label    | label text               | The label content. Defaults to the label prop.     |
| message  | message text with status | The message content. Defaults to the message prop. |
| required | required \* with tooltip | The required indicator. Defaults to '\*'.          |

## Let Params

| Name         | Passed to slots          |
| ------------ | ------------------------ |
| disabled     | label, message, required |
| for          | label                    |
| forwardClick | label                    |
| label        | label                    |
| message      | message                  |
| status       | message                  |
| required     | label, message           |
| requiredTip  | required                 |
