# Changelog

## 1.0.3

- Fix: Dropdown and Select missing an icon slot to allow customization within the button.
- Fix: Dropdown rendering value div was not conditional on the value slot.
- Fix: Popover and Callout created ResizeObserver before mount causing a ResizeObserver undefined error
- Feature: Added menuVariant to MenuButton to provide style customization.
- Feature: Added listVariant to Select to provide style customization.

## 1.0.2

- Fix: sterling.css Input styles used .label instead of .sterling-input.label |

## 1.0.1

- Fix: Dialog.svelte inadvertly imported sterling.css.
