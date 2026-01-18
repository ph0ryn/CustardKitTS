import type { Variation } from "./Variation.ts";
import type { Serializable } from "../types.ts";

export interface LongpressVariationDataOptions {
  key: Variation;
}

export class LongpressVariationData implements Serializable {
  public readonly key: Variation;

  constructor(options: LongpressVariationDataOptions) {
    this.key = options.key;
  }

  toJSON(): object {
    return { key: this.key.toJSON(), type: "longpress_variation" };
  }
}
