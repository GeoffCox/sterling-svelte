type Params = {
  extraClass: string | null | undefined;
};

/** @deprecated Use clsx class merging through class={['name1', 'name2']} */
export const extraClass = (node: HTMLElement, params?: Params) => {
  let _class = params?.extraClass;
  !!_class && node.classList.add(_class);

  return {
    update(params: Params) {
      !!_class && node.classList.remove(_class);
      _class = params.extraClass;
      !!_class && node.classList.add(_class);
    },
    destroy() {
      !!_class && node.classList.remove(_class);
    }
  };
};
