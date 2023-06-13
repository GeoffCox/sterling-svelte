import { lightTheme } from '$lib';
import { parseBem } from '../../parseBem';
import type { ThemeNode } from './types';

const bems = Object.keys(lightTheme).map((key) => parseBem(key));

export const themeMetadata: ThemeNode = {
  name: 'root',
  bem: '',
  kind: 'root',
  values: {},
  children: []
};

bems.forEach((bem) => {
  let node: ThemeNode = themeMetadata;
  if (bem.namespace) {
    let namespaceNode = node.children.find((n) => n.name === bem.namespace);
    if (!namespaceNode) {
      namespaceNode = {
        name: bem.namespace,
        bem: bem.bem,
        kind: 'namespace',
        values: {},
        children: []
      };
      node.children.push(namespaceNode);
    }
    node = namespaceNode;
  }
  if (bem.block) {
    let blockNode = node.children.find((n) => n.name === bem.block);
    if (!blockNode) {
      blockNode = {
        name: bem.block,
        bem: bem.bem,
        kind: 'block',
        values: {},
        children: []
      };
      node.children.push(blockNode);
    }
    node = blockNode;
  }
  if (bem.blockModifier) {
    let blockModifierNode = node.children.find((n) => n.name === bem.blockModifier);
    if (!blockModifierNode) {
      blockModifierNode = {
        name: bem.blockModifier,
        bem: bem.bem,
        kind: 'blockModifier',
        values: {},
        children: []
      };
      node.children.push(blockModifierNode);
    }
    node = blockModifierNode;
  }
  if (bem.elementModifier) {
    let elementModifierNode = node.children.find((n) => n.name === bem.elementModifier);
    if (!elementModifierNode) {
      elementModifierNode = {
        name: bem.elementModifier,
        bem: bem.bem,
        kind: 'elementModifier',
        values: {},
        children: []
      };
      node.children.push(elementModifierNode);
    }
    node = elementModifierNode;
  }

  if (!node.values[bem.element]) {
    node.values[bem.element] = bem.element;
  }
});
