export { type Theme, type ThemeActionParams } from './theme/types';

export { applyDarkTheme } from './theme/applyDarkTheme';
export { applyLightTheme } from './theme/applyLightTheme';
export { applyTheme } from './theme/applyTheme';
export { darkTheme } from './theme/darkTheme';
export { lightTheme } from './theme/lightTheme';
export { neutrals } from './theme/colors';
export { toggleDarkTheme } from './theme/toggleDarkTheme';

export { clickOutside } from './clickOutside';
export { menuBarContextKey, menuItemContextKey } from './containers/Menus.constants';

// ----- Component types ----- //
export type { ButtonVariant, ButtonShape } from './buttons/Button.types';
export type {
  MenuItemRegistration,
  MenuBarContext,
  MenuItemContext
} from './containers/Menus.types';
export type { ListContext } from './containers/List.types';
export type { ProgressColorful } from './display/Progress.types';
export type { TextAreaResize } from './inputs/TextArea.types';
export type { TabData } from './containers/Tabs.types';

// ----- Component constants ----- //
export { listContextKey } from './containers/List.constants';

// ----- Components ----- //

import Button from './buttons/Button.svelte';
import Checkbox from './inputs/Checkbox.svelte';
import Dialog from './surfaces/Dialog.svelte';
import Input from './inputs/Input.svelte';
import Label from './display/Label.svelte';
import List from './containers/List.svelte';
import ListItem from './containers/ListItem.svelte';
import Menu from './containers/Menu.svelte';
import MenuBar from './containers/MenuBar.svelte';
import MenuButton from './buttons/MenuButton.svelte';
import MenuItem from './containers/MenuItem.svelte';
import MenuSeparator from './containers/MenuSeparator.svelte';
import Progress from './display/Progress.svelte';
import Radio from './inputs/Radio.svelte';
import Select from './inputs/Select.svelte';
import Slider from './inputs/Slider.svelte';
import Switch from './inputs/Switch.svelte';
import Tab from './containers/Tab.svelte';
import TabList from './containers/TabList.svelte';
import TextArea from './inputs/TextArea.svelte';
import Tree from './containers/Tree.svelte';
import TreeChevron from './containers/TreeChevron.svelte';
import TreeItemDisplay from './containers/TreeItemDisplay.svelte';

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
