import type { ParseBemResult } from './parseBem.types';

const parseNamespaceAndBlock = (value: string, result: ParseBemResult) => {
  const namespaceAndBlock = value.split('-');

  if (namespaceAndBlock.length === 2) {
    result.namespace = namespaceAndBlock[0];
    result.block = namespaceAndBlock[1];
  }
  if (namespaceAndBlock.length === 1) {
    result.block = namespaceAndBlock[0];
  }
};

const parseBlock = (value: string, result: ParseBemResult) => {
  const blockAndModifier = value.split('--');

  if (blockAndModifier.length === 2) {
    parseNamespaceAndBlock(blockAndModifier[0], result);
    result.blockModifier = blockAndModifier[1];
  } else if (blockAndModifier.length === 1) {
    parseNamespaceAndBlock(blockAndModifier[0], result);
  } else {
    result.block = value;
  }
};

const parseElement = (value: string, result: ParseBemResult) => {
  const elementAndModifier = value.split('--');

  if (elementAndModifier.length === 2) {
    result.element = elementAndModifier[0];
    result.elementModifier = elementAndModifier[1];
  }
  if (elementAndModifier.length === 1) {
    result.element = elementAndModifier[0];
  }
};

export const parseBem = (bem: string): ParseBemResult => {
  let result: ParseBemResult = {
    bem: bem,
    element: bem
  };

  const blockAndElement = bem.split('__');

  if (blockAndElement.length === 2) {
    parseBlock(blockAndElement[0], result);
    parseElement(blockAndElement[1], result);
  } else if (blockAndElement.length === 1) {
    parseElement(blockAndElement[0], result);
  }

  return result;
};

export const formatBem = (bem: ParseBemResult): string => {
  const parts = [];
  if (bem.namespace) {
    parts.push(bem.namespace);
    parts.push('-');
  }
  if (bem.block) {
    parts.push(bem.block);
  }
  if (bem.blockModifier) {
    parts.push('--');
    parts.push(bem.blockModifier);
  }
  if (bem.element && bem.block) {
    parts.push('__');
  }

  parts.push(bem.element);

  if (bem.elementModifier) {
    parts.push('--');
    parts.push(bem.elementModifier);
  }

  return parts.join('');
};
