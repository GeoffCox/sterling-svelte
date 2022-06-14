/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { theme } from './useTheme';

const darkCSSVars: CSSVarSet = {
	// ----- BaseLayer ---- //
	'--BaseLayer__background-color': 'hsl(0, 0%, 0%)',
	'--BaseLayer__color': '#eee',

	'--BaseLayer__background-color--1': 'hsl(0, 0%, 10%)',
	'--BaseLayer__color--1': '#eee',

	'--BaseLayer__background-color--2': 'hsl(0, 0%, 20%)',
	'--BaseLayer__color--2': '#eee',

	'--BaseLayer__background-color--3': 'hsl(0, 0%, 30%)',
	'--BaseLayer__color--3': '#eee',

	// ----- Button ----- //

	'--Button__background-color': '#333',
	'--Button__border-radius': '0.5em',
	'--Button__border-style': 'solid',
	'--Button__border-width': '0.125em',
	'--Button__border-color': '#ddd',
	'--Button__color': '#ddd',

	// hover
	'--Button__background-color--hover': '#444',
	'--Button__border-color--hover': '#eee',
	'--Button__color--hover': '#eee',

	// active
	'--Button__background-color--active': '#555',
	'--Button__border-color--active': '#fff',
	'--Button__color--active': '#fff',

	// focus
	'--Button__background-color--focus': '#fff',
	'--Button__border-color--focus': '#fff',
	'--Button__color--focus': '#ddd',
	'--Button__outline-color--focus': '#fff',

	// disabled
	'--Button__background-color--disabled': '#555',
	'--Button__border-color--disabled': '#777',
	'--Button__color--disabled': '#777',

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

	'--Input__background-color': '#333',
	'--Input__border-color': '#ddd',
	'--Input__border-radius': '0.15em',
	'--Input__border-style': 'solid',
	'--Input__border-width': '0.125em',
	'--Input__color': '#ddd',
	'--Input__placeholder__color': 'lightgrey',

	// hover
	'--Input__background-color--hover': '#333',
	'--Input__border-color--hover': '#eee',
	'--Input__color--hover': '#eee',

	// focus
	'--Input__background-color--focus': '#333',
	'--Input__border-color--focus': '#fff',
	'--Input__color--focus': '#fff',

	// outline
	'--Input__outline-color--focus': '#fff',
	'--Input__outline-offset--focus': '0',
	'--Input__outline-style--focus': 'solid',
	'--Input__outline-width--focus': '0.1em',

	// disabled
	'--Input__background-color--disabled': '#555',
	'--Input__border-color--disabled': '#777',
	'--Input__color--disabled': '#777',
	'--Input__placeholder__color--disabled': '#666',

	// ----- List ----- //

	'--List__background-color': '#333',
	'--List__border-color': '#ddd',
	'--List__border-radius': '0',
	'--List__border-style': 'solid',
	'--List__border-width': '0.125em',
	'--List__color': '#ddd',

	// hover
	'--List__background-color--hover': '#333',
	'--List__border-color--hover': '#eee',
	'--List__color--hover': '#eee',

	// focus
	'--List__background-color--focus': '#333',
	'--List__border-color--focus': '#fff',
	'--List__color--focus': '#fff',
	'--List__outline-color--focus': '#fff',
	'--List__outline-style--focus': 'solid',
	'--List__outline-width--focus': '0.1em',

	// disabled
	'--List__background-color--disabled': '#555',
	'--List__border-color--disabled': '#777',
	'--List__color--disabled': '#777',

	// ----- ListItem ----- //

	'----ListItem__background-color': '#333',
	'----ListItem__border-color': '#ddd',
	'----ListItem__border-radius': '0',
	'----ListItem__border-style': 'solid',
	'----ListItem__border-width': '0.125em',
	'----ListItem__color': '#ddd',

	// hover
	'----ListItem__background-color--hover': '#333',
	'----ListItem__border-color--hover': '#eee',
	'----ListItem__color--hover': '#eee',

	// focus
	'----ListItem__background-color--focus': '#333',
	'----ListItem__border-color--focus': '#fff',
	'----ListItem__color--focus': '#fff',
	'----ListItem__outline-color--focus': '#fff',
	'----ListItem__outline-style--focus': 'solid',
	'----ListItem__outline-width--focus': '0.1em',

	// disabled
	'----ListItem__background-color--disabled': '#555',
	'----ListItem__border-color--disabled': '#777',
	'----ListItem__color--disabled': '#777'
};

export const darkTheme = (node: HTMLElement) => {
	return theme(node, darkCSSVars);
};
