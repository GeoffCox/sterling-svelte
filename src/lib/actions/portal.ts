export const portal = (node: HTMLElement, params: { target?: HTMLElement }) => {
  const child = node;
  let portaled = false;

  const createPortal = (node: HTMLElement, params: { target?: HTMLElement }) => {
    if (!portaled && params.target && node) {
      params.target.appendChild(node);
      portaled = true;
    }
  };

  createPortal(child, params);

  return {
    update: (params: { target?: HTMLElement }) => createPortal(child, params),
    destroy() {
      if (portaled) {
        child?.parentNode?.removeChild(child);
      }
    }
  };
};
