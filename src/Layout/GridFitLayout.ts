import { InvalidLayoutSizeError } from "../errors.ts";

import type { Serializable } from "../types.ts";
import type { GridFitSpecifier } from "./GridFitSpecifier.ts";

export interface GridFitLayoutOptions {
  rowCount: number;
  columnCount: number;
}

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
      column_count: this.columnCount,
      row_count: this.rowCount,
      type: "grid_fit",
    };
  }
}
