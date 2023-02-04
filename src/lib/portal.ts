export const portal = (node: HTMLElement, params: { target: HTMLElement; condition?: boolean }) => {
  const child = node;
  let portaled = false;

  const createPortal = (
    node: HTMLElement,
    params: { target: HTMLElement; condition?: boolean }
  ) => {
    if (params.target && node && params.condition) {
      params.target.appendChild(node);
      portaled = true;
    }
  };

  createPortal(child, params);

  return {
    update: (params: { target: HTMLElement }) => createPortal(child, params),
    destroy() {
      child?.parentNode?.removeChild(child);
    }
  };
};
