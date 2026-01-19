import { InvalidLayoutSizeError } from "../errors.ts";

import type { Serializable } from "../types.ts";
import type { GridFitSpecifier } from "./GridFitSpecifier.ts";

/**
 * Options for creating a GridFitLayout instance.
 */
export interface GridFitLayoutOptions {
  /** Number of rows in the grid (must be >= 1) */
  rowCount: number;
  /** Number of columns in the grid (must be >= 1) */
  columnCount: number;
}

/**
 * A grid layout that fits all keys within the visible screen area.
 *
 * @remarks
 * Keys are arranged in a grid where:
 * - `rowCount` specifies the number of rows (vertical).
 * - `columnCount` specifies the number of columns (horizontal).
 *
 * Each key position is specified using a {@link GridFitSpecifier} with x, y coordinates
 * and optional width/height for spanning multiple cells.
 *
 * @example
 * ```typescript
 * const layout = new GridFitLayout({ rowCount: 4, columnCount: 5 });
 * // or using the factory
 * const layout = Layout.gridFit({ rowCount: 4, columnCount: 5 });
 * ```
 */
export class GridFitLayout implements Serializable {
  public readonly rowCount: number;
  public readonly columnCount: number;

  constructor(options: GridFitLayoutOptions) {
    if (options.rowCount < 1) {
      throw new InvalidLayoutSizeError(`rowCount (${options.rowCount}) must be at least 1`);
    }

    if (options.columnCount < 1) {
      throw new InvalidLayoutSizeError(`columnCount (${options.columnCount}) must be at least 1`);
    }

    this.columnCount = options.columnCount;
    this.rowCount = options.rowCount;
  }

  get layoutType(): "grid_fit" {
    return "grid_fit";
  }

  validateSpecifier(specifier: GridFitSpecifier): { valid: boolean; message?: string } {
    // Check for negative values
    if (specifier.x < 0) {
      return { message: `x (${specifier.x}) must be non-negative`, valid: false };
    }

    if (specifier.y < 0) {
      return { message: `y (${specifier.y}) must be non-negative`, valid: false };
    }

    // Check bounds
    if (specifier.x + specifier.width > this.columnCount) {
      return {
        message: `x + width (${specifier.x} + ${specifier.width} = ${specifier.x + specifier.width}) exceeds columnCount (${this.columnCount})`,
        valid: false,
      };
    }

    if (specifier.y + specifier.height > this.rowCount) {
      return {
        message: `y + height (${specifier.y} + ${specifier.height} = ${specifier.y + specifier.height}) exceeds rowCount (${this.rowCount})`,
        valid: false,
      };
    }

    return { valid: true };
  }

  toJSON(): object {
    return {
      type: "grid_fit",
      row_count: this.rowCount,
      column_count: this.columnCount,
    };
  }
}
