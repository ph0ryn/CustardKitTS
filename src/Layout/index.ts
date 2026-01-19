export { GridFitLayout, type GridFitLayoutOptions } from "./GridFitLayout.ts";
export { GridFitSpecifier, type GridFitSpecifierOptions } from "./GridFitSpecifier.ts";
export { GridScrollLayout, type GridScrollLayoutOptions } from "./GridScrollLayout.ts";
export { GridScrollSpecifier, type GridScrollSpecifierOptions } from "./GridScrollSpecifier.ts";
export { KeyData, type KeyDataOptions, type Specifier } from "./KeyData.ts";

import { GridFitLayout, type GridFitLayoutOptions } from "./GridFitLayout.ts";
import { GridScrollLayout, type GridScrollLayoutOptions } from "./GridScrollLayout.ts";

/**
 * Union type of all layout types.
 */
export type Layout = GridFitLayout | GridScrollLayout;

/**
 * Factory object for creating layout instances.
 *
 * @example
 * ```typescript
 * // Fixed grid that fits the screen
 * const fitLayout = Layout.gridFit({ rowCount: 4, columnCount: 5 });
 *
 * // Scrollable grid
 * const scrollLayout = Layout.gridScroll({
 *   direction: ScrollDirection.Vertical,
 *   rowCount: 8,
 *   columnCount: 4
 * });
 * ```
 */
export const Layout = {
  /**
   * Creates a grid layout that fits all keys within the visible screen.
   * @param options - Row and column count configuration.
   */
  gridFit: (options: GridFitLayoutOptions) => new GridFitLayout(options),
  /**
   * Creates a scrollable grid layout.
   * @param options - Direction, row, and column count configuration.
   */
  gridScroll: (options: GridScrollLayoutOptions) => new GridScrollLayout(options),
} as const;
