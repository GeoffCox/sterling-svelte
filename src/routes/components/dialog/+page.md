<script>
    import Example from './DialogManualExample.svelte';
    import FormExample from './DialogFormExample.svelte';
    import ThemePropCard from '../ThemePropCard.svelte';
</script>

# Dialog

A styled HTML `<dialog>` element for modal dialogs.

## Playground

### Form Submit

The native HTML `dialog` supports submitting a `form` within it.
When the form is submitted, the dialog closes.

Any element such as `button` or `input` with `type="submit"` will submit the form.
The dialog's `returnValue` will be set to the `value` prop of that element.
A value of empty string `''` indicates dialog was canceled.

The `Dialog` component has a `form` wrapping the content, so you don't need to add your own.

IMPORTANT!

- HTML button has a default `type="submit"`. Clicking it submits the form.
- This library's `Button` has a default `type="button"`. You will need to set `type="submit"` if you to submit the form.

<FormExample />

### Manual Action Buttons

This example demonstrates buttons that do not submit the form.
Instead, `on:click` handlers take action.

<Example />

## Features

- Bind the `open` prop to open or close the dialog.
- The `title`, `body`, and `footer` slots are provided for for typical dialog content layout.
- The `header` slot allows replacing both the title and close button.
- The `content` slot allows replacing the header, body, and footer.
- A `form` wraps the content to support dialog form submission.
- The `backdropCloses` closes the dialog when the backdrop is clicked.
- The dialog size is based on the content.
- Padding is based on the inherited font.
- HTML dialog props are forwarded and events are bubbled.

IMPORTANT!

- While the open prop on the native `dialog` creates a modeless window, this `Dialog` is **always modal**.
  Other components should be used for modeless windows.
- Because the `open` prop causes the dialog to be modeless, it is not forwarded to the `dialog` element.
- The `cancel` event is bubbled, but it is only raised when the escape key is pressed. It is not raised when the close button or any button with `value=''` is pressed.

## Usage

1. Declare a `Dialog` and bind `open` to a variable.
2. Fill in slots with the content you want to display.
3. Add buttons with `type="submit"` and `value` **or** Add buttons with `on:click` handlers to take action.
4. When you want to show the dialog, set `open` to true.

```ts
let open = false;

const deleteProduct = () => {
  // produce delete code would go here
  open = false;
};
```

```svelte
<Dialog bind:open>
  <div slot="title">Delete from catalog?</div>
  <div slot="body">Do you want to delete product 'A-113' from the catalog?</div>
  <div slot="footer">
    <div class="actions">
      <Button on:click={deleteProduct}>OK</Button>
      <Button autofocus on:click={() => (open = false)}>Cancel</Button>
    </div>
  </div>
</Dialog>

<Button on:click={() => (open = true)}>Delete</Button>
```

## Props

| Name           | Type    | Default | Description                                      |
| -------------- | ------- | ------- | ------------------------------------------------ |
| open           | boolean | false   | If the dialog is open (i.e. visible)             |
| backdropCloses | boolean | false   | If clicking outside the dialog should cancel it. |

## Anatomy

```
HTML dialog
  content slot
    header slot
      title slot
      close button
    body slot
    footer slot
```

## Slots

| Name     | Default                    | Description                   |
| -------- | -------------------------- | ----------------------------- |
| contents | header, body, footer slots | All content within the dialog |
| header   | title slot, close button   | The dialog header             |
| title    |                            | The dialog title              |
| body     |                            | The dialog body               |
| footer   |                            | The dialog footer             |
