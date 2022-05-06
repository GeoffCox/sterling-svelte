/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Applies theme CSS vars used by Button 
 */
export const primaryButtonTheme = (node: HTMLElement) => {
	node.style.setProperty('--PrimaryButton__background-color','var(--Theme__primary-control__background-color)');
	node.style.setProperty('--PrimaryButton__border-color','var(--Theme__primary-control__border-color)');
	node.style.setProperty('--PrimaryButton__border-radius','var(--Theme__primary-control__border-radius)');
	node.style.setProperty('--PrimaryButton__border-style','var(--Theme__primary-control__border-style)');
	node.style.setProperty('--PrimaryButton__border-width','var(--Theme__primary-control__border-width)');
	node.style.setProperty('--PrimaryButton__color','var(--Theme__primary-control__color)');

	// hover
	node.style.setProperty('--PrimaryButton__background-color--hover','var(--Theme__primary-control__background-color--hover)');
	node.style.setProperty('--PrimaryButton__border-color--hover','var(--Theme__primary-control__border-color--hover)');
	node.style.setProperty('--PrimaryButton__color--hover','var(--Theme__primary-control__color--hover)');
	
	// active
	node.style.setProperty('--PrimaryButton__background-color--active','var(--Theme__primary-control__background-color--active)');
	node.style.setProperty('--PrimaryButton__border-color--active','var(--Theme__primary-control__border-color--active)');
	node.style.setProperty('--PrimaryButton__color--active','var(--Theme__primary-control__color--active)');
	
	// focus
	node.style.setProperty('--PrimaryButton__border-color--focus','var(--Theme__primary-control__border-color--focus)');
	node.style.setProperty('--PrimaryButton__outline-color--focus','var(--Theme__primary-control__outline-color--focus)');
	node.style.setProperty('--PrimaryButton__outline-style--focus','var(--Theme__primary-control__outline-style--focus)');
	node.style.setProperty('--PrimaryButton__outline-width--focus','var(--Theme__primary-control__outline-width--focus)');
	
	// disabled
	node.style.setProperty('--PrimaryButton__background-color--disabled','var(--Theme__primary-control__background-color--disabled)');
	node.style.setProperty('--PrimaryButton__border-color--disabled','var(--Theme__primary-control__border-color--disabled)');
	node.style.setProperty('--PrimaryButton__color--disabled','var(--Theme__primary-control__color--disabled)');
};