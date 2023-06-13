export type ThemeNode = {
  name: string;
  bem: string;
  kind: 'root' | 'namespace' | 'block' | 'blockModifier' | 'element' | 'elementModifier';
  values: Record<string, string>;
  children: ThemeNode[];
};
