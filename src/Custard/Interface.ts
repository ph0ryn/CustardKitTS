import {
  GridFitLayout,
  GridFitSpecifier,
  GridScrollLayout,
  GridScrollSpecifier,
  type KeyData,
  type Layout,
} from "../Layout/index.ts";
import { InvalidKeyPositionError, LayoutSpecifierMismatchError } from "../errors.ts";

import type { KeyStyle } from "../enums.ts";
import type { Serializable } from "../types.ts";

export interface InterfaceOptions {
  keyStyle: KeyStyle;
  keyLayout: Layout;
  keys: KeyData[];
}

export class Interface implements Serializable {
  public readonly keyStyle: KeyStyle;
  public readonly keyLayout: Layout;
  public readonly keys: KeyData[];

  constructor(options: InterfaceOptions) {
    this.keyLayout = options.keyLayout;
    this.keyStyle = options.keyStyle;
    this.keys = options.keys;

    this.validateKeys();
  }

  private validateKeys(): void {
    for (const [i, keyData] of this.keys.entries()) {
      const specifier = keyData.specifier;

      // Check Layout/Specifier type match
      if (this.keyLayout instanceof GridFitLayout) {
        if (!(specifier instanceof GridFitSpecifier)) {
          throw new LayoutSpecifierMismatchError(
            this.keyLayout.layoutType,
            specifier.specifierType,
          );
        }

        // Validate position bounds
        const result = this.keyLayout.validateSpecifier(specifier);

        if (!result.valid) {
          throw new InvalidKeyPositionError(`Key at index ${i}: ${result.message}`);
        }
      } else if (this.keyLayout instanceof GridScrollLayout) {
        if (!(specifier instanceof GridScrollSpecifier)) {
          throw new LayoutSpecifierMismatchError(
            this.keyLayout.layoutType,
            specifier.specifierType,
          );
        }

        // Validate index bounds
        const result = this.keyLayout.validateSpecifier(specifier);

        if (!result.valid) {
          throw new InvalidKeyPositionError(`Key at index ${i}: ${result.message}`);
        }
      }
    }
  }

  toJSON(): object {
    return {
      key_layout: this.keyLayout.toJSON(),
      key_style: this.keyStyle,
      keys: this.keys.map((k) => k.toJSON()),
    };
  }
}
