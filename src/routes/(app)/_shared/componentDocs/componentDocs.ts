import type { ComponentDoc } from './types';

import { autocompleteDoc } from './autocompleteDoc';
import { autocomplete2Doc } from './autocomplete2Doc';
import { buttonDoc } from './buttonDoc';
import { calloutDoc } from './calloutDoc';
import { callout2Doc } from './callout2Doc';
import { checkboxDoc } from './checkboxDoc';
import { dialogDoc } from './dialogDoc';
import { dropdownDoc } from './dropdownDoc';
import { dropdown2Doc } from './dropdown2Doc';
import { inputDoc } from './inputDoc';
import { labelDoc } from './labelDoc';
import { linkDoc } from './linkDoc';
import { listDoc } from './listDoc';
import { listItemDoc } from './listItemDoc';
import { menuDoc } from './menuDoc';
import { menuBarDoc } from './menuBarDoc';
import { menuBar2Doc } from './menuBar2Doc';
import { menuButtonDoc } from './menuButtonDoc';
import { menuButton2Doc } from './menuButton2Doc';
import { menuItemDoc } from './menuItemDoc';
import { menuItem2Doc } from './menuItem2Doc';
import { menuSeparatorDoc } from './menuSeparatorDoc';
import { paginationDoc } from './paginationDoc';
import { popoverDoc } from './popoverDoc';
import { popover2Doc } from './popover2Doc';
import { progressDoc } from './progressDoc';
import { radioDoc } from './radioDoc';
import { selectDoc } from './selectDoc';
import { select2Doc } from './select2Doc';
import { sliderDoc } from './sliderDoc';
import { splitterDoc } from './splitterDoc';
import { switchDoc } from './switchDoc';
import { tabDoc } from './tabDoc';
import { tabListDoc } from './tabListDoc';
import { textAreaDoc } from './textAreaDoc';
import { tooltipDoc } from './tooltipDoc';
import { tooltip2Doc } from './tooltip2Doc';
import { treeDoc } from './treeDoc';
import { treeChevronDoc } from './treeChevronDoc';
import { treeItemDoc } from './treeItemDoc';

export const componentDocs: Record<string, ComponentDoc> = {
  autocomplete: autocompleteDoc,
  autocomplete2: autocomplete2Doc,
  button: buttonDoc,
  callout: calloutDoc,
  callout2: callout2Doc,
  checkbox: checkboxDoc,
  dialog: dialogDoc,
  dropdown: dropdownDoc,
  dropdown2: dropdown2Doc,
  input: inputDoc,
  label: labelDoc,
  link: linkDoc,
  list: listDoc,
  listitem: listItemDoc,
  menu: menuDoc,
  menubar: menuBarDoc,
  menubar2: menuBar2Doc,
  menubutton: menuButtonDoc,
  menubutton2: menuButton2Doc,
  menuitem: menuItemDoc,
  menuitem2: menuItem2Doc,
  menuseparator: menuSeparatorDoc,
  pagination: paginationDoc,
  popover: popoverDoc,
  popover2: popover2Doc,
  progress: progressDoc,
  radio: radioDoc,
  select: selectDoc,
  select2: select2Doc,
  slider: sliderDoc,
  splitter: splitterDoc,
  switch: switchDoc,
  tab: tabDoc,
  tablist: tabListDoc,
  textarea: textAreaDoc,
  tooltip: tooltipDoc,
  tooltip2: tooltip2Doc,
  tree: treeDoc,
  treechevron: treeChevronDoc,
  treeitem: treeItemDoc
};
