export type ParseBemResult = {
  bem: string;
  namespace?: string;
  block?: string;
  blockModifier?: string;
  element: string;
  elementModifier?: string;
};
