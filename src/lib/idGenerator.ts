let id = 0;

const next = () => {
  return ++id;
};

export const idGenerator = {
  next,
  nextId: (prefix?: string) => {
    return prefix ? `${prefix}-${next()}` : `${next()}`;
  }
};
