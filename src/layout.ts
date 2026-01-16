import { CustomKey, type Key } from "./keys.ts";

import type { Serializable } from "./actions.ts";
import type { ScrollDirection } from "./enums.ts";

// =============================================================================
// Layouts
// =============================================================================

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

export type Layout = GridFitLayout | GridScrollLayout;

// =============================================================================
// Position Specifiers
// =============================================================================

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
    this.height = options.height ?? 1;
    this.width = options.width ?? 1;
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

export type Specifier = GridFitSpecifier | GridScrollSpecifier;

// =============================================================================
// KeyData
// =============================================================================

export interface KeyDataOptions {
  specifier: Specifier;
  key: Key;
}

export class KeyData implements Serializable {
  public readonly specifier: Specifier;
  public readonly key: Key;

  constructor(options: KeyDataOptions) {
    this.key = options.key;
    this.specifier = options.specifier;
  }

  toJSON(): object {
    let keyType: "custom" | "system" = "system";

    if (this.key instanceof CustomKey) {
      keyType = "custom";
    }

    return {
      key: this.key.toJSON(),
      key_type: keyType,
      specifier: this.specifier.toJSON(),
      specifier_type: this.specifier.specifierType,
    };
  }
}
