import type { Variation } from "./Variation.ts";
import type { FlickDirection } from "../enums.ts";
import type { Serializable } from "../types.ts";

export interface FlickVariationDataOptions {
  direction: FlickDirection;
  key: Variation;
}

export class FlickVariationData implements Serializable {
  public readonly direction: FlickDirection;
  public readonly key: Variation;

  constructor(options: FlickVariationDataOptions) {
    this.direction = options.direction;
    this.key = options.key;
  }

  toJSON(): object {
    return {
      direction: this.direction,
      key: this.key.toJSON(),
      type: "flick_variation",
    };
  }
}
