import type { ComponentDoc } from './types';
import { makeExtendsComment, commonProps } from './commonDoc';

import { buttonDoc } from './buttonDoc';
import { calloutDoc } from './calloutDoc';
import { checkboxDoc } from './checkboxDoc';
import { colorPickerDoc } from './colorPickerDoc';
import { dialogDoc } from './dialogDoc';
import { dropdownDoc } from './dropdownDoc';
import { hexColorSliderDoc } from './hexColorSlidersDoc';
import { hslColorSlidersDoc } from './hslColorSlidersDoc';
import { inputDoc } from './inputDoc';
import { labelDoc } from './labelDoc';
import { linkDoc } from './linkDoc';
import { listDoc } from './listDoc';
import { listItemDoc } from './listItemDoc';
import { menuDoc } from './menuDoc';
import { menuBarDoc } from './menuBarDoc';
import { menuButtonDoc } from './menuButtonDoc';
import { menuItemDoc } from './menuItemDoc';
import { menuItemDisplayDoc } from './menuitemDisplayDoc';
import { menuSeparatorDoc } from './menuSeparatorDoc';
import { popoverDoc } from './popoverDoc';
import { progressDoc } from './progressDoc';
import { radioDoc } from './radioDoc';
import { selectDoc } from './selectDoc';
import { sliderDoc } from './sliderDoc';
import { switchDoc } from './switchDoc';
import { tabDoc } from './tabDoc';
import { tabListDoc } from './tabListDoc';
import { textAreaDoc } from './textAreaDoc';
import { tooltipDoc } from './tooltipDoc';
import { treeDoc } from './treeDoc';
import { treeChevronDoc } from './treeChevronDoc';
import { treeItemDoc } from './treeItemDoc';
import { treeItemDisplayDoc } from './treeItemDisplayDoc';

export const componentDocs: Record<string, ComponentDoc> = {
  button: buttonDoc,
  callout: calloutDoc,
  checkbox: checkboxDoc,
  colorpicker: colorPickerDoc,
  dialog: dialogDoc,
  dropdown: dropdownDoc,
  hexcolorsliders: hexColorSliderDoc,
  hslcolorsliders: hslColorSlidersDoc,
  input: inputDoc,
  label: labelDoc,
  link: linkDoc,
  list: listDoc,
  listitem: listItemDoc,
  menu: menuDoc,
  menubar: menuBarDoc,
  menubutton: menuButtonDoc,
  menuitem: menuItemDoc,
  menuitemdisplay: menuItemDisplayDoc,
  menuseparator: menuSeparatorDoc,
  popover: popoverDoc,
  progress: progressDoc,
  radio: radioDoc,
  select: selectDoc,
  slider: sliderDoc,
  switch: switchDoc,
  tab: tabDoc,
  tablist: tabListDoc,
  textarea: textAreaDoc,
  tooltip: tooltipDoc,
  tree: treeDoc,
  treechevron: treeChevronDoc,
  treeitem: treeItemDoc,
  treeitemdisplay: treeItemDisplayDoc
};
