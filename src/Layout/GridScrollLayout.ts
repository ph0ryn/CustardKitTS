import type { ScrollDirection } from "../enums.ts";
import type { Serializable } from "../types.ts";

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

  toJSON(): object {
    return {
      column_count: this.columnCount,
      direction: this.direction,
      row_count: this.rowCount,
      type: "grid_scroll",
    };
  }
}
