import type { Serializable } from "../types.ts";

export interface GridScrollSpecifierOptions {
  index: number;
}

export class GridScrollSpecifier implements Serializable {
  public readonly index: number;

  constructor(options: GridScrollSpecifierOptions) {
    this.index = options.index;
  }

  toJSON(): object {
    return { index: this.index };
  }

  get specifierType(): "grid_scroll" {
    return "grid_scroll";
  }
}
