/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { theme } from './useTheme';

// background, color, border
// rest, hover, focus, active, selected, disabled
// button, input, container, item
// default, accent

const newCSSVars: CSSVarSet = {
	// ----- Control ---- //
	'--Common__background-color': '#fff',
	'--Common__border-color': '#777',
	'--Common__border-radius': '0',
	'--Common__border-style': 'solid',
	'--Common__border-width': '2px',
	'--Common__color': '#222',

	// hover
	'--Common__background-color--hover': '#fff',
	'--Common__border-color--hover': '#555',
	'--Common__color--hover': '#222',

	// focus
	'--Common__background-color--focus': '#f5f5f5',
	'--Common__border-color--focus': '#000',
	'--Common__color--focus': '#222',

	// outline
	'--Common__outline-color': '#222',
	'--Common__outline-offset': '0',
	'--Common__outline-style': 'solid',
	'--Common__outline-width': '2px',

	// disabled
	'--Common__background-color--disabled': '#f5f5f5', //whitesmoke
	'--Common__border-color--disabled': '#a9a9a9', // darkgray
	'--Common__color--disabled': '#a9a9a9', // darkgray

	// ----- Button ----- //
	'--Button__background-color': '#fafafa',
	'--Button__border-color': '#777',
	'--Button__border-radius': '8px',
	'--Button__border-style': 'solid',
	'--Button__border-width': '2px',
	'--Button__color': '#222',

	// hover
	'--Button__background-color--hover': '#f5f5f5',
	'--Button__border-color--hover': '#555',
	'--Button__color--hover': '#222',

	// active
	'--Button__background-color--active': '#ebebeb',
	'--Button__border-color--active': '#444',
	'--Button__color--active': '#444',

	// focus
	'--Button__background-color--focus': '#f5f5f5',
	'--Button__border-color--focus': '#000',
	'--Button__color--focus': '#222',

	// ----- Input ----- //
	'--Input__background-color': '#fefefe',
	'--Input__border-color': '#777',
	'--Input__border-radius': '3px',
	'--Input__border-style': 'solid',
	'--Input__border-width': '2px',
	'--Input__color': '#222',
	'--Input__placeholder__color': '#d3d3d3', // lightgray

	// hover
	'--Input__background-color--hover': '#fff',
	'--Input__border-color--hover': '#555',
	'--Input__color--hover': '#222',

	// focus
	'--Input__background-color--focus': '#fff',
	'--Input__border-color--focus': '#222',
	'--Input__color--focus': '#222',

	// selected
	'--Input__background-color--selected': '#ebebeb',
	'--Input__border-color--selected': '#444',
	'--Input__color--selected': '#222',

	// ----- Display ----- //
	'--Display__background-color': '#ebebeb',
	'--Display__border-color': '#777',
	'--Display__color': '#222',

	'--Display__background-color--info': '#ebebeb',
	'--Display__border-color--info': '#777',
	'--Display__color--info': '#025E73',

	'--Display__background-color--progress': '#ebebeb',
	'--Display__border-color--progress': '#777',
	'--Display__color--progress': '#0099DD',

	'--Display__background-color--success': '#ebebeb',
	'--Display__border-color--success': '#777',
	'--Display__color--success': '#03A64A',

	'--Display__background-color--warning': '#ebebeb',
	'--Display__border-color--warning': '#777',
	'--Display__color--warning': '#F2A71B',

	'--Display__background-color--error': '#ebebeb',
	'--Display__border-color--error': '#777',
	'--Display__color--error': '#A62B1F'
};

export const newTheme = (node: HTMLElement) => {
	return theme(node, newCSSVars);
};
