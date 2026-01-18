export { GridFitLayout, type GridFitLayoutOptions } from "./GridFitLayout.ts";
export { GridFitSpecifier, type GridFitSpecifierOptions } from "./GridFitSpecifier.ts";
export { GridScrollLayout, type GridScrollLayoutOptions } from "./GridScrollLayout.ts";
export { GridScrollSpecifier, type GridScrollSpecifierOptions } from "./GridScrollSpecifier.ts";
export { KeyData, type KeyDataOptions, type Specifier } from "./KeyData.ts";

import { GridFitLayout, type GridFitLayoutOptions } from "./GridFitLayout.ts";
import { GridScrollLayout, type GridScrollLayoutOptions } from "./GridScrollLayout.ts";

export type Layout = GridFitLayout | GridScrollLayout;

export const Layout = {
  gridFit: (options: GridFitLayoutOptions) => new GridFitLayout(options),
  gridScroll: (options: GridScrollLayoutOptions) => new GridScrollLayout(options),
} as const;
