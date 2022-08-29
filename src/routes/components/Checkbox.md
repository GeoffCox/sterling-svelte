# Checkbox

Checkbox provides a styled HTML input element with type=checkbox.

<script>
    import Example from '../_examples/CheckboxExample.svelte';
</script>

<Example />

## Design

- The checkbox, checkmark, and label sizes are based on the inherited font
- The checkmark is rendered with CSS rather than an SVG or font icon
- The HTML input is rendered but not visible in order to apply styles
- HTML input props and events are forwarded

## Props

| Name    | Type    | Details                             |
| ------- | ------- | ----------------------------------- |
| checked | boolean | Controls if the checkbox is checked |

## Slots

| Name      | Details                                               |
| --------- | ----------------------------------------------------- |
| (default) | Content for the label that appears after the checkbox |

## Theme Variables

| Name                                  | Used when/for  |
| ------------------------------------- | -------------- |
| --Common\_\_color                     | label          |
| --Common\_\_outline-color             | keyboard focus |
| --Common\_\_outline-offset            | keyboard focus |
| --Common\_\_outline-style             | keyboard focus |
| --Common\_\_outline-width             | keyboard focus |
| --Input\_\_background-color           | checkbox       |
| --Input\_\_background-color--disabled | checkbox       |
| --Input\_\_border-color               | checkbox       |
| --Input\_\_border-color--disabled     | checkbox       |
| --Input\_\_border-style               | checkbox       |
| --Input\_\_border-width               | checkbox       |
| --Input\_\_color                      | checkmark      |
| --Input\_\_color--disabled            | checkmark      |
