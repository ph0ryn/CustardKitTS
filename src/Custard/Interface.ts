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

/**
 * Options for creating an Interface instance.
 */
export interface InterfaceOptions {
  /**
   * The key style (tenkey or PC style).
   * @see {@link KeyStyle}
   */
  keyStyle: KeyStyle;
  /**
   * The layout configuration for keys.
   * @see {@link Layout}
   */
  keyLayout: Layout;
  /**
   * Array of key data defining each key's position and behavior.
   */
  keys: KeyData[];
}

/**
 * Represents the keyboard interface containing layout and keys.
 *
 * @remarks
 * An Interface defines:
 * - **keyStyle**: How keys behave (tenkey for flick, PC for QWERTY-like).
 * - **keyLayout**: Grid configuration (grid_fit or grid_scroll).
 * - **keys**: Array of key definitions with positions.
 *
 * The interface validates that:
 * - All key specifiers match the layout type.
 * - All key positions are within bounds.
 *
 * @example
 * ```typescript
 * const iface = new Interface({
 *   keyStyle: KeyStyle.TenkeyStyle,
 *   keyLayout: Layout.gridFit({ rowCount: 4, columnCount: 5 }),
 *   keys: [
 *     new KeyData({
 *       specifier: new GridFitSpecifier({ x: 0, y: 0 }),
 *       key: new CustomKey({ design: KeyDesign.text("A"), pressActions: [Action.input("a")] })
 *     })
 *   ]
 * });
 * ```
 */
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
