/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Applies theme CSS vars used by Input 
 */
export const inputTheme = (node: HTMLElement) => {
	node.style.setProperty('--Input__background-color','var(--Theme__control__background-color)');
	node.style.setProperty('--Input__border-color','var(--Theme__control__border-color)');
	node.style.setProperty('--Input__border-radius','var(--Theme__control__border-radius)');
	node.style.setProperty('--Input__border-style','var(--Theme__control__border-style)');
	node.style.setProperty('--Input__border-width','var(--Theme__control__border-width)');
	node.style.setProperty('--Input__color','var(--Theme__control__color)');

	// hover
	node.style.setProperty('--Input__background-color--hover','var(--Theme__control__background-color)');
	node.style.setProperty('--Input__border-color--hover','var(--Theme__control__border-color--hover)');
	node.style.setProperty('--Input__color--hover','var(--Theme__control__color--hover)');

	// focus
	node.style.setProperty('--Input__background-color--focus','var(--Theme__control__background-color)');
	node.style.setProperty('--Input__border-color--focus','var(--Theme__control__border-color--focus)');
	node.style.setProperty('--Input__outline-color--focus','var(--Theme__control__outline-color--focus)');
	node.style.setProperty('--Input__outline-style--focus','var(--Theme__control__outline-style--focus)');
	node.style.setProperty('--Input__outline-width--focus','var(--Theme__control__outline-width--focus)');

	// disabled
	node.style.setProperty('--Input__background-color--disabled','var(--Theme__control__background-color--disabled)');
	node.style.setProperty('--Input__border-color--disabled','var(--Theme__control__border-color--disabled)');
	node.style.setProperty('--Input__color--disabled','var(--Theme__control__color--disabled)');
};