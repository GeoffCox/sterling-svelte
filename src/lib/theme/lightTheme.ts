import type { Theme } from './types';
import { neutrals } from './colors';

export const lightTheme: Theme = {
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

	// ----- Layer ---- //
	'--Layer__background-color--1': neutrals.neutral98,
	'--Layer__color--1': neutrals.neutral15,

	'--Layer__background-color--2': neutrals.neutral96,
	'--Layer__color--2': neutrals.neutral15,

	'--Layer__background-color--3': neutrals.neutral92,
	'--Layer__color--3': neutrals.neutral15,

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

	// ----- Display ----- //
	'--Display__background-color': neutrals.neutral92,
	'--Display__border-color': neutrals.neutral60,
	'--Display__color': neutrals.neutral15,

	'--Display__color--subtle': neutrals.neutral30,
	'--Display__color--faint': neutrals.neutral85,
	'--Display__color--disabled': neutrals.neutral85,

	'--Display__color--info': '#025E73',
	'--Display__color--progress': '#0099DD',
	'--Display__color--success': '#03A64A',
	'--Display__color--warning': '#F2A71B',
	'--Display__color--error': '#A62B1F'
};
