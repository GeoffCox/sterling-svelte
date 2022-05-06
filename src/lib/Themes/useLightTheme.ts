/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { theme } from './useTheme';

const lightCSSVars: CSSVarSet = {
	// ----- BaseLayer ---- //
	'--Theme__base__background-color': '#fff',
	'--Theme__base__border-color': '#222',
	'--Theme__base__color': '#222',

	'--Theme__base1__background-color': '#fff',
	'--Theme__base1__border-color': '#222',
	'--Theme__base1__color': '#222',

	'--Theme__base2__background-color': '#fff',
	'--Theme__base2__border-color': '#222',
	'--Theme__base2__color': '#222',

	'--Theme__base3__background-color': '#fff',
	'--Theme__base3__border-color': '#222',
	'--Theme__base3__color': '#222',

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
	'--Input__outline-color--focus': '#222',
	'--Input__outline-style--focus': 'solid',
	'--Input__outline-width--focus': '0.1em',

	// disabled
	'--Input__background-color--disabled': 'whitesmoke',
	'--Input__border-color--disabled': 'darkgray',
	'--Input__color--disabled': 'darkgray',
	'--Input__placeholder__color--disabled': 'lightgrey'
};

export const lightTheme = (node: HTMLElement) => {
	return theme(node, lightCSSVars);
};
