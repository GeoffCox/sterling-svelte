import type { ComponentType, SvelteComponent } from 'svelte';

export type MemberDoc = {
  name: string;
  comment?: string;
};

export type TypeDoc = MemberDoc & {
  definition?: string;
};

export type PropDoc = MemberDoc & {
  type?: string;
  default?: string;
};

export type EventDoc = MemberDoc & {
  data?: string;
};

export type MethodDoc = MemberDoc & {
  params?: string;
  returnType?: string;
};

export type ComponentDoc = {
  name: string;
  description: string | string[];
  comments?: string[];
  types?: TypeDoc[];
  props?: PropDoc[];
  events?: EventDoc[];
  methods?: MethodDoc[];
  usage?: ComponentType<SvelteComponent>;
  anatomy?: string;
};
