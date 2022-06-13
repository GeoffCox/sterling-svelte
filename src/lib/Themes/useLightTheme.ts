/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { theme } from './useTheme';

// background, color, border
// rest, hover, focus, active, selected, disabled
// button, input, container, item
// default, accent

const lightCSSVars: CSSVarSet = {
	// ----- BaseLayer ---- //
	'--BaseLayer__background-color': 'hsl(0, 0%, 100%)',
	'--BaseLayer__color': '#222',

	'--BaseLayer__background-color--1': 'hsl(0, 0%, 98%)',
	'--BaseLayer__color--1': '#222',

	'--BaseLayer__background-color--2': 'hsl(0, 0%, 95%)',
	'--BaseLayer__color--2': '#222',

	'--BaseLayer__background-color--3': 'hsl(0, 0%, 90%)',
	'--BaseLayer__color--3': '#222',

	// ----- Button ----- //

	'--Button__background-color': '#fafafa',
	'--Button__border-color': '#777',
	'--Button__border-radius': '0.5em',
	'--Button__border-style': 'solid',
	'--Button__border-width': '0.07em',
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
	'--Button__outline-color--focus': '#000',

	// disabled
	'--Button__background-color--disabled': '#f5f5f5',
	'--Button__border-color--disabled': '#aaa',
	'--Button__color--disabled': '#ccc',

	// ----- Primary Button ----- //

	'--PrimaryButton__background-color': 'hsl(206, 85%, 45%)',
	'--PrimaryButton__border-color': 'hsl(206, 85%, 35%)',
	'--PrimaryButton__color': '#fff',

	// hover
	'--PrimaryButton__background-color--hover': 'hsl(206, 85%, 42%)',
	'--PrimaryButton__border-color--hover': 'hsl(206, 85%, 32%)',
	'--PrimaryButton__color--hover': '#fff',

	// active
	'--PrimaryButton__background-color--active': 'hsl(206, 85%, 35%)',
	'--PrimaryButton__border-color--active': 'hsl(206, 85%, 25%)',
	'--PrimaryButton__color--active': '#fff',

	// focus
	'--PrimaryButton__background-color--focus': '#fff',
	'--PrimaryButton__border-color--focus': '#000',
	'--PrimaryButton__color--focus': '#fff',
	'--PrimaryButton__outline-color--focus': '#000',

	// disabled
	'--PrimaryButton__background-color--disabled': 'hsl(206, 55%, 65%)',
	'--PrimaryButton__border-color--disabled': 'hsl(206, 55%, 55%)',
	'--PrimaryButton__color--disabled': 'hsl(0, 0%, 85%)',

	// ----- Input ----- //
	'--Input__background-color': '#fefefe',
	'--Input__border-color': '#777',
	'--Input__border-radius': '0.15em',
	'--Input__border-style': 'solid',
	'--Input__border-width': '0.07em',
	'--Input__color': '#222',
	'--Input__placeholder__color': 'lightgrey',

	// hover
	'--Input__background-color--hover': '#fff',
	'--Input__border-color--hover': '#555',
	'--Input__color--hover': '#222',

	// focus
	'--Input__background-color--focus': '#fff',
	'--Input__border-color--focus': '#222',
	'--Input__color--focus': '#222',

	// outline
	'--Input__outline-color--focus': '#222',
	'--Input__outline-offset--focus': '0',
	'--Input__outline-style--focus': 'solid',
	'--Input__outline-width--focus': '0.1em',

	// selected
	'--Input__background-color--selected': '#ebebeb',
	'--Input__border-color--selected': '#444',
	'--Input__color--selected': '#222',

	// disabled
	'--Input__background-color--disabled': 'whitesmoke',
	'--Input__border-color--disabled': 'darkgray',
	'--Input__color--disabled': 'darkgray',
	'--Input__placeholder__color--disabled': 'lightgrey',

	// ----- List ----- //
	'--List__background-color': '#fff',
	'--List__border-color': '#777',
	'--List__border-radius': '0',
	'--List__border-style': 'solid',
	'--List__border-width': '0.07em',
	'--List__color': '#222',

	// hover
	'--List__background-color--hover': '#fff',
	'--List__border-color--hover': '#555',
	'--List__color--hover': '#222',

	// focus
	'--List__background-color--focus': '#fff',
	'--List__border-color--focus': '#222',
	'--List__color--focus': '#222',
	'--List__outline-color--focus': '#222',
	'--List__outline-style--focus': 'solid',
	'--List__outline-width--focus': '0.1em',

	// disabled
	'--List__background-color--disabled': 'whitesmoke',
	'--List__border-color--disabled': 'darkgray',
	'--List__color--disabled': 'darkgray',

	// ----- ListItem ----- //
	'--ListItem__background-color': '#fff',
	'--ListItem__border-color': '#777',
	'--ListItem__border-radius': '0',
	'--ListItem__border-style': 'solid',
	'--ListItem__border-width': '0.07em',
	'--ListItem__color': '#222',

	// hover
	'--ListItem__background-color--hover': '#ebebeb',
	'--ListItem__border-color--hover': '#555',
	'--ListItem__color--hover': '#222',

	// focus
	'--ListItem__background-color--focus': '#fff',
	'--ListItem__border-color--focus': '#222',
	'--ListItem__color--focus': '#222',
	'--ListItem__outline-color--focus': '#222',
	'--ListItem__outline-style--focus': 'solid',
	'--ListItem__outline-width--focus': '0.1em',

	// selected
	'--ListItem__background-color--selected': 'lightgrey',
	'--ListItem__border-color--selected': '#444',
	'--ListItem__color--selected': '#222',

	// disabled
	'--ListItem__background-color--disabled': 'whitesmoke',
	'--ListItem__border-color--disabled': 'darkgray',
	'--ListItem__color--disabled': 'darkgray',
	'--ListItem__placeholder__color--disabled': 'lightgrey'
};

export const lightTheme = (node: HTMLElement) => {
	return theme(node, lightCSSVars);
};
