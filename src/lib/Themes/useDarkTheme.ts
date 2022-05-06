/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSVarSet } from '../types';
import { theme } from './useTheme';

const darkCSSVars: CSSVarSet = {
	// bases are used to theme surfaces
	'--Theme__base__background-color': '#222',
	'--Theme__base__border-color': '#eee',
	'--Theme__base__color': '#eee',

	'--Theme__base1__background-color': '#222',
	'--Theme__base1__border-color': '#eee',
	'--Theme__base1__color': '#eee',

	'--Theme__base2__background-color': '#222',
	'--Theme__base2__border-color': '#eee',
	'--Theme__base2__color': '#eee',

	'--Theme__base3__background-color': '#222',
	'--Theme__base3__border-color': '#eee',
	'--Theme__base3__color': '#eee',

	// control values provide consistency across common controls
	'--Theme__control__background-color': '#333',
	'--Theme__control__border-color': '#ddd',
	'--Theme__control__color': '#ddd',

	'--Theme__control__background-color--hover': '#444',
	'--Theme__control__border-color--hover': '#eee',
	'--Theme__control__color--hover': '#eee',

	'--Theme__control__background-color--active': '#555',
	'--Theme__control__border-color--active': '#fff',
	'--Theme__control__color--active': '#fff',

	'--Theme__control__background-color--focus': '#fff',
	'--Theme__control__border-color--focus': '#fff',
	'--Theme__control__color--focus': '#ddd',
	'--Theme__control__outline-color--focus': '#fff',

	'--Theme__control__background-color--disabled': '#ccc',
	'--Theme__control__border-color--disabled': '#ddd',
	'--Theme__control__color--disabled': '#ddd',

	// common to primary controls
	'--Theme__control__border-radius': '0.5em',
	'--Theme__control__border-style': 'solid',
	'--Theme__control__border-width': '0.07em',

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

export const darkTheme = (node: HTMLElement) => {
	return theme(node, darkCSSVars);
};
