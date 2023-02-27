export { type Theme, type ThemeActionParams } from './theme/types';

export { applyDarkTheme } from './theme/applyDarkTheme';
export { applyLightTheme } from './theme/applyLightTheme';
export { applyTheme } from './theme/applyTheme';
export { darkTheme } from './theme/darkTheme';
export { lightTheme } from './theme/lightTheme';
export { neutrals } from './theme/colors';
export { toggleDarkTheme } from './theme/toggleDarkTheme';

export { clickOutside } from './actions/clickOutside';
export { menuBarContextKey, menuItemContextKey } from './Menus.constants';

// ----- Component types ----- //
export type { ButtonVariant, ButtonShape } from './Button.types';
export type { MenuItemRegistration, MenuBarContext, MenuItemContext } from './Menus.types';
export type { ListContext } from './List.types';
export type { ProgressColorful } from './Progress.types';
export type { TextAreaResize } from './TextArea.types';
export type { TabData } from './Tabs.types';

// ----- Component constants ----- //
export { listContextKey } from './List.constants';
export { treeContextKey, treeItemContextKey } from './Tree.constants';

// ----- Components ----- //

import Button from './Button.svelte';
import Checkbox from './Checkbox.svelte';
import Dialog from './Dialog.svelte';
import Input from './Input.svelte';
import Label from './Label.svelte';
import List from './List.svelte';
import ListItem from './ListItem.svelte';
import Menu from './Menu.svelte';
import MenuBar from './MenuBar.svelte';
import MenuButton from './MenuButton.svelte';
import MenuItem from './MenuItem.svelte';
import MenuSeparator from './MenuSeparator.svelte';
import Progress from './Progress.svelte';
import Radio from './Radio.svelte';
import Select from './Select.svelte';
import Slider from './Slider.svelte';
import Switch from './Switch.svelte';
import Tab from './Tab.svelte';
import TabList from './TabList.svelte';
import TextArea from './TextArea.svelte';
import Tree from './Tree.svelte';
import TreeChevron from './TreeChevron.svelte';
import TreeItemDisplay from './TreeItemDisplay.svelte';

export {
  Button,
  Checkbox,
  Dialog,
  Input,
  Label,
  List,
  ListItem,
  Menu,
  MenuBar,
  MenuButton,
  MenuItem,
  MenuSeparator,
  Progress,
  Radio,
  Select,
  Slider,
  Switch,
  Tab,
  TabList,
  TextArea,
  Tree,
  TreeChevron,
  TreeItemDisplay
};
