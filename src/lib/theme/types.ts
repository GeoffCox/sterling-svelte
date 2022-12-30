type CSSVarProperty = string;
type CSSVarValue = undefined | string | number | boolean;

/**
 * A theme consisting of CSS variable property/value pairs.
 */
export type Theme = Record<CSSVarProperty, CSSVarValue>;

/**
 * Parameters passed to the theme action.
 */
export type ThemeActionParams = {
	/**
	 * The theme to use.
	 */
	theme: Theme;

	/**
	 * When true, applies the theme to the document.DocumentElement.
	 * Otherwise applies the theme to the element where this action was used.
	 */
	atDocumentRoot?: boolean;
};
