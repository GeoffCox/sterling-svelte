/*
features
interactions
usage
props

*/

export type GeneralDoc = {
  name?: string;
  description?: string;
  details?: string[];
};

export type CodeDoc = {
  name?: string;
  description?: string;
  code: string;
  details?: string[];
};

export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description?: string;
  details?: string[];
};

export type MethodDoc = {
  name: string;
  params?: string;
  returnType?: string;
  description?: string;
};

export type EventDoc = {
  name: string;
  args?: string;
  description?: string;
};

export type TypeDoc = {
  name: string;
  type?: string;
  members?: TypeDoc[];
  description?: string;
};

export type AnatomyDoc = {
  name: string;
  elementType?: string;
  children?: AnatomyDoc[];
};

export type SlotDoc = {
  name: string;
  description?: string;
  letParams?: string[];
};

export type ComponentDoc = {
  name: string;
  description?: string;
  features?: GeneralDoc[];
  interactions?: GeneralDoc[];
  usage?: CodeDoc[];
  props?: PropDoc[];
  methods?: MethodDoc[];
  events?: EventDoc[];
  anatomy?: AnatomyDoc;
  slots?: SlotDoc[];
  contexts?: TypeDoc[];
};
