import type { ScrollDirection } from "../enums.ts";
import type { Serializable } from "../types.ts";
import type { GridScrollSpecifier } from "./GridScrollSpecifier.ts";

export interface GridScrollLayoutOptions {
  direction: ScrollDirection;
  rowCount: number;
  columnCount: number;
}

export class GridScrollLayout implements Serializable {
  public readonly direction: ScrollDirection;
  public readonly rowCount: number;
  public readonly columnCount: number;

  constructor(options: GridScrollLayoutOptions) {
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
      column_count: this.columnCount,
      direction: this.direction,
      row_count: this.rowCount,
      type: "grid_scroll",
    };
  }
}
