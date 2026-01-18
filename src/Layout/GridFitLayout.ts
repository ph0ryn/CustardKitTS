import type { Serializable } from "../types.ts";

export interface GridFitLayoutOptions {
  rowCount: number;
  columnCount: number;
}

export class GridFitLayout implements Serializable {
  public readonly rowCount: number;
  public readonly columnCount: number;

  constructor(options: GridFitLayoutOptions) {
    this.columnCount = options.columnCount;
    this.rowCount = options.rowCount;
  }

  toJSON(): object {
    return {
      column_count: this.columnCount,
      row_count: this.rowCount,
      type: "grid_fit",
    };
  }
}
