let id = 0;

const next = () => {
  return ++id;
};

/** @deprecated Use $props.id() instead */
export const idGenerator = {
  next,
  nextId: (prefix?: string) => {
    return prefix ? `${prefix}-${next()}` : `${next()}`;
  }
};
