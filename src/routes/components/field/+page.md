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
- Clicks on the label click the interactive element.
- HTML label props are forwarded and events are bubbled.

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
| forwardClick | `boolean`     | `false`                    | If clicks on the label click the interactive element |
| label        | `string`      |                            | Text content of the label                            |
| message      | `string`      |                            | Text content of the field message                    |
| required     | `boolean`     | `false`                    | If the field displays a required indicator           |
| requiredTip  | `string`      | `'This field is required'` | The tooltip for the required indicator               |
| status       | `FieldStatus` | `'none'`                   | Status of the field message                          |

- FieldStatus = 'none' | 'info' | 'success' | 'warning' | 'error'

## Anatomy

```
HTML label
   _default_ slot
```

## Slots

| Name     | Description                                        |
| -------- | -------------------------------------------------- |
| default  | The interactive control for the field              |
| label    | The label content. Defaults to the label prop.     |
| message  | The message content. Defaults to the message prop. |
| required | The required indicator. Defaults to '\*'.          |

## Let Params

| Name        | Passed to slots          |
| ----------- | ------------------------ |
| disabled    | label, message, required |
| for         | label                    |
| label       | label                    |
| message     | message                  |
| status      | message                  |
| required    | label, message           |
| requiredTip | required                 |
