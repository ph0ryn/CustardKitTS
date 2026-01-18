import { InvalidLayoutSizeError } from "../errors.ts";

import type { Serializable } from "../types.ts";

export interface GridFitSpecifierOptions {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export class GridFitSpecifier implements Serializable {
  public readonly x: number;
  public readonly y: number;
  public readonly width: number;
  public readonly height: number;

  constructor(options: GridFitSpecifierOptions) {
    const width = options.width ?? 1;
    const height = options.height ?? 1;

    if (width < 1) {
      throw new InvalidLayoutSizeError(`width (${width}) must be at least 1`);
    }

    if (height < 1) {
      throw new InvalidLayoutSizeError(`height (${height}) must be at least 1`);
    }

    this.height = height;
    this.width = width;
    this.x = options.x;
    this.y = options.y;
  }

  toJSON(): object {
    return {
      height: this.height,
      width: this.width,
      x: this.x,
      y: this.y,
    };
  }

  get specifierType(): "grid_fit" {
    return "grid_fit";
  }
}
