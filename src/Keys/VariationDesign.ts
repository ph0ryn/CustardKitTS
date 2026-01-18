import type { Label } from "../Labels/index.ts";
import type { Serializable } from "../types.ts";

export interface VariationDesignOptions {
  label: Label;
}

export class VariationDesign implements Serializable {
  public readonly label: Label;

  constructor(options: VariationDesignOptions) {
    this.label = options.label;
  }

  toJSON(): object {
    return { label: this.label.toJSON() };
  }
}
