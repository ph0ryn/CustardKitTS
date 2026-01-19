import { Label, type Label as LabelType } from "../Labels/index.ts";
import { KeyColor } from "../enums.ts";

import type { Serializable } from "../types.ts";

/**
 * Options for creating a KeyDesign instance.
 */
export interface KeyDesignOptions {
  /** The label to display on the key */
  label: LabelType;
  /** The key color (defaults to Normal) */
  color?: KeyColor;
}

/**
 * Represents the visual design of a key.
 *
 * @remarks
 * A KeyDesign consists of:
 * - **label**: What is displayed on the key (text, image, etc.).
 * - **color**: The key's color theme (normal, special, selected, unimportant).
 *
 * @example
 * ```typescript
 * const design = new KeyDesign({ label: Label.text("A"), color: KeyColor.Normal });
 * // or using static helpers
 * const design = KeyDesign.text("A");
 * const design = KeyDesign.create(Label.systemImage("delete.left"), KeyColor.Special);
 * ```
 */
export class KeyDesign implements Serializable {
  public readonly label: LabelType;
  public readonly color: KeyColor;

  constructor(options: KeyDesignOptions) {
    this.color = options.color ?? KeyColor.Normal;
    this.label = options.label;
  }

  toJSON(): object {
    return {
      label: this.label.toJSON(),
      color: this.color,
    };
  }

  static create(label: LabelType, color?: KeyColor): KeyDesign {
    return new KeyDesign({ color, label });
  }

  static text(text: string, color?: KeyColor): KeyDesign {
    return new KeyDesign({ color, label: Label.text(text) });
  }
}
