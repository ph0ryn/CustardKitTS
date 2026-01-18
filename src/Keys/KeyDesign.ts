import { Label, type Label as LabelType } from "../Labels/index.ts";
import { KeyColor } from "../enums.ts";

import type { Serializable } from "../types.ts";

export interface KeyDesignOptions {
  label: LabelType;
  color?: KeyColor;
}

export class KeyDesign implements Serializable {
  public readonly label: LabelType;
  public readonly color: KeyColor;

  constructor(options: KeyDesignOptions) {
    this.color = options.color ?? KeyColor.Normal;
    this.label = options.label;
  }

  toJSON(): object {
    return {
      color: this.color,
      label: this.label.toJSON(),
    };
  }

  static create(label: LabelType, color?: KeyColor): KeyDesign {
    return new KeyDesign({ color, label });
  }

  static text(text: string, color?: KeyColor): KeyDesign {
    return new KeyDesign({ color, label: Label.text(text) });
  }
}
