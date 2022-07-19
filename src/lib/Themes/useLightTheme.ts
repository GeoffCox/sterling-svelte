/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { neutrals } from './colors';
import { theme } from './useTheme';

// background, color, border
// rest, hover, focus, active, selected, disabled
// button, input, container, item
// default, accent

export const lightThemeVars: CSSVarSet = {
	// ----- Common ---- //
	'--Common__background-color': neutrals.neutral100,
	'--Common__border-color': neutrals.neutral60,
	'--Common__border-radius': '0',
	'--Common__border-style': 'solid',
	'--Common__border-width': '2px',
	'--Common__color': neutrals.neutral15,

	// hover
	'--Common__background-color--hover': neutrals.neutral100,
	'--Common__border-color--hover': neutrals.neutral45,
	'--Common__color--hover': neutrals.neutral15,

	// focus
	'--Common__background-color--focus': neutrals.neutral96,
	'--Common__border-color--focus': neutrals.neutral0,
	'--Common__color--focus': neutrals.neutral15,

	// outline
	'--Common__outline-color': neutrals.neutral15,
	'--Common__outline-offset': '0',
	'--Common__outline-style': 'solid',
	'--Common__outline-width': '2px',

	// disabled
	'--Common__background-color--disabled': neutrals.neutral96,
	'--Common__border-color--disabled': neutrals.neutral60,
	'--Common__color--disabled': neutrals.neutral60,

	// ----- BaseLayer ---- //
	'--BaseLayer__background-color': neutrals.neutral100,
	'--BaseLayer__color': neutrals.neutral15,

	'--BaseLayer__background-color--1': neutrals.neutral98,
	'--BaseLayer__color--1': neutrals.neutral15,

	'--BaseLayer__background-color--2': neutrals.neutral96,
	'--BaseLayer__color--2': neutrals.neutral15,

	'--BaseLayer__background-color--3': neutrals.neutral92,
	'--BaseLayer__color--3': neutrals.neutral15,

	// ----- Button ----- //

	'--Button__background-color': neutrals.neutral96,
	'--Button__border-color': neutrals.neutral60,
	'--Button__border-radius': '8px',
	'--Button__border-style': 'solid',
	'--Button__border-width': '2px',
	'--Button__color': neutrals.neutral15,

	// hover
	'--Button__background-color--hover': neutrals.neutral96,
	'--Button__border-color--hover': neutrals.neutral45,
	'--Button__color--hover': neutrals.neutral15,

	// active
	'--Button__background-color--active': neutrals.neutral92,
	'--Button__border-color--active': neutrals.neutral30,
	'--Button__color--active': neutrals.neutral30,

	// focus
	'--Button__background-color--focus': neutrals.neutral96,
	'--Button__border-color--focus': neutrals.neutral0,
	'--Button__color--focus': neutrals.neutral15,

	// disabled
	'--Button__background-color--disabled': neutrals.neutral85,
	'--Button__border-color--disabled': neutrals.neutral60,
	'--Button__color--disabled': neutrals.neutral60,

	// ----- Input ----- //
	'--Input__background-color': neutrals.neutral98,
	'--Input__border-color': neutrals.neutral60,
	'--Input__border-radius': '3px',
	'--Input__border-style': 'solid',
	'--Input__border-width': '2px',
	'--Input__color': neutrals.neutral15,
	'--Input__placeholder__color': neutrals.neutral85,

	// hover
	'--Input__background-color--hover': neutrals.neutral100,
	'--Input__border-color--hover': neutrals.neutral45,
	'--Input__color--hover': neutrals.neutral15,

	// focus
	'--Input__background-color--focus': neutrals.neutral100,
	'--Input__border-color--focus': neutrals.neutral15,
	'--Input__color--focus': neutrals.neutral15,

	// selected
	'--Input__background-color--selected': neutrals.neutral92,
	'--Input__border-color--selected': neutrals.neutral30,
	'--Input__color--selected': neutrals.neutral15,

	// disabled
	'--Input__background-color--disabled': neutrals.neutral96,
	'--Input__border-color--disabled': neutrals.neutral75,
	'--Input__color--disabled': neutrals.neutral75,
	'--Input__placeholder__color--disabled': neutrals.neutral85,

	// ----- Display ----- //
	'--Display__background-color': neutrals.neutral92,
	'--Display__border-color': neutrals.neutral60,
	'--Display__color': neutrals.neutral15,

	'--Display__background-color--info': neutrals.neutral92,
	'--Display__border-color--info': neutrals.neutral60,
	'--Display__color--info': '#025E73',

	'--Display__background-color--progress': neutrals.neutral92,
	'--Display__border-color--progress': neutrals.neutral60,
	'--Display__color--progress': '#0099DD',

	'--Display__background-color--success': neutrals.neutral92,
	'--Display__border-color--success': neutrals.neutral60,
	'--Display__color--success': '#03A64A',

	'--Display__background-color--warning': neutrals.neutral92,
	'--Display__border-color--warning': neutrals.neutral60,
	'--Display__color--warning': '#F2A71B',

	'--Display__background-color--error': neutrals.neutral92,
	'--Display__border-color--error': neutrals.neutral60,
	'--Display__color--error': '#A62B1F',

	// ----- List ----- //
	'--List__background-color': neutrals.neutral100,
	'--List__border-color': neutrals.neutral60,
	'--List__border-radius': '0',
	'--List__border-style': 'solid',
	'--List__border-width': '2px',
	'--List__color': neutrals.neutral15,

	// hover
	'--List__background-color--hover': neutrals.neutral100,
	'--List__border-color--hover': neutrals.neutral45,
	'--List__color--hover': neutrals.neutral15,

	// focus
	'--List__background-color--focus': neutrals.neutral100,
	'--List__border-color--focus': neutrals.neutral15,
	'--List__color--focus': neutrals.neutral15,

	// disabled
	'--List__background-color--disabled': neutrals.neutral96,
	'--List__border-color--disabled': neutrals.neutral75,
	'--List__color--disabled': neutrals.neutral75,

	// ----- ListItem ----- //
	'--ListItem__background-color': neutrals.neutral100,
	'--ListItem__border-color': neutrals.neutral60,
	'--ListItem__border-radius': '0',
	'--ListItem__border-style': 'solid',
	'--ListItem__border-width': '2px',
	'--ListItem__color': neutrals.neutral15,

	// hover
	'--ListItem__background-color--hover': neutrals.neutral92,
	'--ListItem__border-color--hover': neutrals.neutral45,
	'--ListItem__color--hover': neutrals.neutral15,

	// focus
	'--ListItem__background-color--focus': neutrals.neutral100,
	'--ListItem__border-color--focus': neutrals.neutral15,
	'--ListItem__color--focus': neutrals.neutral15,

	// selected
	'--ListItem__background-color--selected': neutrals.neutral85,
	'--ListItem__border-color--selected': neutrals.neutral30,
	'--ListItem__color--selected': neutrals.neutral15,

	// disabled
	'--ListItem__background-color--disabled': neutrals.neutral96,
	'--ListItem__border-color--disabled': neutrals.neutral75,
	'--ListItem__color--disabled': neutrals.neutral75,
	'--ListItem__placeholder__color--disabled': neutrals.neutral85
};

export const lightTheme = (node: HTMLElement) => {
	return theme(node, lightThemeVars);
};
