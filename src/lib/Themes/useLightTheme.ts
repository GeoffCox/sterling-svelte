/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from "../types";
import { theme } from "./useTheme";

const lightCSSVars: CSSVarSet = {
	// bases are used to theme surfaces or layers
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

	// control values provide consistency across common controls

	'--Theme__control__border-radius': '0.5em',
	'--Theme__control__border-style': 'solid',
	'--Theme__control__border-width': '0.07em',	

	'--Theme__control__background-color': '#fafafa',
	'--Theme__control__border-color': '#777',
	'--Theme__control__color': '#222',

	'--Theme__control__background-color--hover': '#f5f5f5',
	'--Theme__control__border-color--hover': '#555',
	'--Theme__control__color--hover': '#222',

	'--Theme__control__background-color--active': '#ebebeb',
	'--Theme__control__border-color--active': '#444',
	'--Theme__control__color--active': '#444',

	'--Theme__control__background-color--focus': '#f5f5f5',
	'--Theme__control__border-color--focus': '#000',
	'--Theme__control__color--focus': '#222',
	'--Theme__control__outline-color--focus': '#000',

	'--Theme__control__background-color--disabled': '#f5f5f5',
	'--Theme__control__border-color--disabled': '#aaa',
	'--Theme__control__color--disabled': '#ccc',

	// common to primary controls
	'--Theme__primary-control__background-color': 'hsl(206, 85%, 45%)',
	'--Theme__primary-control__border-color': 'hsl(206, 85%, 35%)',
	'--Theme__primary-control__color': '#fff',

	'--Theme__primary-control__background-color--hover': 'hsl(206, 85%, 42%)',
	'--Theme__primary-control__border-color--hover': 'hsl(206, 85%, 32%)',
	'--Theme__primary-control__color--hover': '#fff',

	'--Theme__primary-control__background-color--active': 'hsl(206, 85%, 35%)',
	'--Theme__primary-control__border-color--active': 'hsl(206, 85%, 25%)',
	'--Theme__primary-control__color--active': '#fff',

	'--Theme__primary-control__background-color--focus': '#fff',
	'--Theme__primary-control__border-color--focus': '#000',
	'--Theme__primary-control__color--focus': '#fff',
	'--Theme__primary-control__outline-color--focus': '#000',

	'--Theme__primary-control__background-color--disabled': 'hsl(206, 55%, 65%)',
	'--Theme__primary-control__border-color--disabled': 'hsl(206, 55%, 55%)',
	'--Theme__primary-control__color--disabled': 'hsl(0, 0%, 85%)'
};

export const lightTheme = (node: HTMLElement) => {
	return theme(node, lightCSSVars);
};
