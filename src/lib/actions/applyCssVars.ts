type CSSVarProperty = string;
type CSSVarValue = undefined | string | number | boolean;
export type CSSVars = Record<CSSVarProperty, CSSVarValue>;

type Params = {
  /**
   * The set of CSS variables to apply
   */
  vars: CSSVars;

  /**
   * When true, applies the theme to the document.DocumentElement.
   * Otherwise applies the theme to the element where this action was used.
   */
  atDocumentRoot?: boolean;
};

const _applyVars = (node: HTMLElement, vars: CSSVars) => {
  Object.keys(vars).map((key) => {
    const varKey = key.startsWith('--') ? key : `--${key}`;
    if (vars[key]) {
      node.style.setProperty(varKey, vars[key] ? `${vars[key]}` : null);
    } else {
      node.style.removeProperty(varKey);
    }
  });
};

/**
 * Applies a set of CSS vars.
 */
export const applyCssVars = (node: HTMLElement, params: Params) => {
  const element = params.atDocumentRoot ? document.documentElement : node;
  _applyVars(element, params.vars);

  return {
    update: (params?: Params) => {
      if (params) {
        const element = params.atDocumentRoot ? document.documentElement : node;
        _applyVars(element, params?.vars);
      }
    }
  };
};
