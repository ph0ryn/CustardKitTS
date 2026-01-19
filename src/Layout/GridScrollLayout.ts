import { InvalidLayoutSizeError } from "../errors.ts";

import type { ScrollDirection } from "../enums.ts";
import type { Serializable } from "../types.ts";
import type { GridScrollSpecifier } from "./GridScrollSpecifier.ts";

/**
 * Options for creating a GridScrollLayout instance.
 */
export interface GridScrollLayoutOptions {
  /** Scroll direction (horizontal or vertical) */
  direction: ScrollDirection;
  /** Number of rows in the grid */
  rowCount: number;
  /** Number of columns in the grid */
  columnCount: number;
}

/**
 * A scrollable grid layout for displaying many keys.
 *
 * @remarks
 * Keys are arranged in a scrollable grid where:
 * - `direction` specifies whether scrolling is horizontal or vertical.
 * - `rowCount` and `columnCount` specify the visible grid size.
 * - For scrolling direction, decimal values can be used.
 * - For perpendicular direction, values are truncated to integers.
 *
 * **Important**: When using grid_scroll layout, key `variations` are disabled.
 *
 * Each key position is specified using a {@link GridScrollSpecifier} with an index.
 * Indices must start from 0 and be consecutive.
 *
 * @example
 * ```typescript
 * const layout = new GridScrollLayout({
 *   direction: ScrollDirection.Vertical,
 *   rowCount: 8,
 *   columnCount: 4.2
 * });
 * ```
 */
export class GridScrollLayout implements Serializable {
  public readonly direction: ScrollDirection;
  public readonly rowCount: number;
  public readonly columnCount: number;

  constructor(options: GridScrollLayoutOptions) {
    if (options.rowCount < 1) {
      throw new InvalidLayoutSizeError(`rowCount (${options.rowCount}) must be at least 1`);
    }

    if (options.columnCount < 1) {
      throw new InvalidLayoutSizeError(`columnCount (${options.columnCount}) must be at least 1`);
    }

    this.columnCount = options.columnCount;
    this.direction = options.direction;
    this.rowCount = options.rowCount;
  }

  get layoutType(): "grid_scroll" {
    return "grid_scroll";
  }

  get maxIndex(): number {
    return this.rowCount * this.columnCount;
  }

  validateSpecifier(specifier: GridScrollSpecifier): { valid: boolean; message?: string } {
    if (specifier.index < 0) {
      return { message: `index (${specifier.index}) must be non-negative`, valid: false };
    }

    if (specifier.index >= this.maxIndex) {
      return {
        message: `index (${specifier.index}) must be less than rowCount * columnCount (${this.maxIndex})`,
        valid: false,
      };
    }

    return { valid: true };
  }

  toJSON(): object {
    return {
      type: "grid_scroll",
      direction: this.direction,
      row_count: this.rowCount,
      column_count: this.columnCount,
    };
  }
}
