import { Label, type Label as LabelType } from "../Labels/index.ts";

import type { Serializable } from "../types.ts";

export interface VariationDesignOptions {
  label: LabelType;
}

export class VariationDesign implements Serializable {
  public readonly label: LabelType;

  constructor(options: VariationDesignOptions) {
    this.label = options.label;
  }

  toJSON(): object {
    return { label: this.label.toJSON() };
  }

  static text(text: string): VariationDesign {
    return new VariationDesign({ label: Label.text(text) });
  }
}
