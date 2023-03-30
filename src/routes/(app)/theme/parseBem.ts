export const parseBem = (bem: string) => {
  let block = undefined;
  let element = undefined;
  let modifier = undefined;

  const parts1 = bem.split('__');

  // block or block--modifier
  if (parts1.length === 1) {
    const parts2 = parts1[0].split('--');

    // block
    if (parts2.length === 1) {
      block = parts2[0];
    }
    // block--modifier
    else if (parts2.length === 2) {
      block = parts2[0];
      modifier = parts2[1];
    }
  }
  // block__element or block__element--modifier
  else if (parts1.length === 2) {
    const parts2 = parts1[1].split('--');

    // block__element
    if (parts2.length === 1) {
      block = parts1[0];
      element = parts2[0];
    }
    // block__element--modifier
    else if (parts2.length === 2) {
      block = parts1[0];
      element = parts2[0];
      modifier = parts2[1];
    }
  }

  return {
    bem,
    block,
    element,
    modifier
  };
};
