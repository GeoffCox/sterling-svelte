/*
features
interactions
usage
props

*/

import type { SvelteComponent } from 'svelte';

export type ProseDocData = {
  paragraphs: string[];
};

export type TypeDocData = {
  name: string;
  type?: string;
  members?: TypeDocData[];
  description?: string;
};

export type PropDocData = {
  name: string;
  type?: TypeDocData;
  default?: string;
  description?: string;
};

export type ParamDocData = {
  name: string;
  type: TypeDocData;
  default?: string;
  description?: string;
};

export type MethodDocData = {
  name: string;
  params?: ParamDocData[];
  returnType?: TypeDocData;
  description?: string;
};

export type EventDocData = {
  name: string;
  args?: ParamDocData[];
  description?: string;
};

export type CodeDocData = {
  name?: string;
  code: string;
  description?: string;
};

export type AnatomyDocData = {
  name: string;
  element?: string;
  description?: string;
  children?: AnatomyDocData[];
};

export type SlotDocData = {
  name: string;
  description?: string;
  letParams?: ParamDocData[];
};

export type PlaygroundDocData = {
  component: typeof SvelteComponent;
};

export type ComponentDocData = {
  name: string;
  description?: string;
  features?: ProseDocData[];
  interactions?: ProseDocData[];
  usages?: CodeDocData[];
  props?: PropDocData[];
  methods?: MethodDocData[];
  events?: EventDocData[];
  anatomy?: AnatomyDocData;
  slots?: SlotDocData[];
  contexts?: TypeDocData[];
  playground?: PlaygroundDocData;
};
