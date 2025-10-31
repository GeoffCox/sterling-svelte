import type { ComponentDoc } from './types';

import { autocompleteDoc } from './autocompleteDoc';
import { buttonDoc } from './buttonDoc';
import { calloutDoc } from './calloutDoc';
import { checkboxDoc } from './checkboxDoc';
import { dialogDoc } from './dialogDoc';
import { dropdownDoc } from './dropdownDoc';
import { inputDoc } from './inputDoc';
import { labelDoc } from './labelDoc';
import { linkDoc } from './linkDoc';
import { listDoc } from './listDoc';
import { listItemDoc } from './listItemDoc';
import { menuDoc } from './menuDoc';
import { menuBarDoc } from './menuBarDoc';
import { menuButtonDoc } from './menuButtonDoc';
import { menuItemDoc } from './menuItemDoc';
import { menuSeparatorDoc } from './menuSeparatorDoc';
import { paginationDoc } from './paginationDoc';
import { popoverDoc } from './popoverDoc';
import { progressDoc } from './progressDoc';
import { radioDoc } from './radioDoc';
import { selectDoc } from './selectDoc';
import { sliderDoc } from './sliderDoc';
import { splitterDoc } from './splitterDoc';
import { switchDoc } from './switchDoc';
import { tabDoc } from './tabDoc';
import { tabListDoc } from './tabListDoc';
import { textAreaDoc } from './textAreaDoc';
import { tooltipDoc } from './tooltipDoc';
import { treeDoc } from './treeDoc';
import { treeChevronDoc } from './treeChevronDoc';
import { treeItemDoc } from './treeItemDoc';

export const componentDocs: Record<string, ComponentDoc> = {
  autocomplete: autocompleteDoc,
  button: buttonDoc,
  callout: calloutDoc,
  checkbox: checkboxDoc,
  dialog: dialogDoc,
  dropdown: dropdownDoc,
  input: inputDoc,
  label: labelDoc,
  link: linkDoc,
  list: listDoc,
  listitem: listItemDoc,
  menu: menuDoc,
  menubar: menuBarDoc,
  menubutton: menuButtonDoc,
  menuitem: menuItemDoc,
  menuseparator: menuSeparatorDoc,
  pagination: paginationDoc,
  popover: popoverDoc,
  progress: progressDoc,
  radio: radioDoc,
  select: selectDoc,
  slider: sliderDoc,
  splitter: splitterDoc,
  switch: switchDoc,
  tab: tabDoc,
  tablist: tabListDoc,
  textarea: textAreaDoc,
  tooltip: tooltipDoc,
  tree: treeDoc,
  treechevron: treeChevronDoc,
  treeitem: treeItemDoc
};
