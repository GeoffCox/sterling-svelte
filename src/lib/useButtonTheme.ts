/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Applies theme CSS vars used by Button 
 */
export const buttonTheme = (node: HTMLElement) => {
	node.style.setProperty('--Button__background-color','var(--Theme__control__background-color, green)');
	node.style.setProperty('--Button__border-color','var(--Theme__control__border-color)');
	node.style.setProperty('--Button__border-radius','var(--Theme__control__border-radius)');
	node.style.setProperty('--Button__border-style','var(--Theme__control__border-style)');
	node.style.setProperty('--Button__border-width','var(--Theme__control__border-width)');
	node.style.setProperty('--Button__color','var(--Theme__control__color)');
	node.style.setProperty('--Button__background-color--hover','var(--Theme__control__background-color--hover)');
	node.style.setProperty('--Button__border-color--hover','var(--Theme__control__border-color--hover)');
	node.style.setProperty('--Button__color--hover','var(--Theme__control__color--hover)');
	node.style.setProperty('--Button__background-color--active','var(--Theme__control__background-color--active)');
	node.style.setProperty('--Button__border-color--active','var(--Theme__control__border-color--active)');
	node.style.setProperty('--Button__color--active','var(--Theme__control__color--active)');
	node.style.setProperty('--Button__border-color--focus','var(--Theme__control__border-color--focus)');
	node.style.setProperty('--Button__outline-color--focus','var(--Theme__control__outline-color--focus)');
	node.style.setProperty('--Button__outline-style--focus','var(--Theme__control__outline-style--focus)');
	node.style.setProperty('--Button__outline-width--focus','var(--Theme__control__outline-width--focus)');
	node.style.setProperty('--Button__background-color--disabled','var(--Theme__control__background-color--disabled)');
	node.style.setProperty('--Button__border-color--disabled','var(--Theme__control__border-color--disabled)');
	node.style.setProperty('--Button__color--disabled','var(--Theme__control__color--disabled)');
};