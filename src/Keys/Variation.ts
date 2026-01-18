import { LongpressAction } from "./LongpressAction.ts";

import type { VariationDesign } from "./VariationDesign.ts";
import type { Action } from "../Actions/index.ts";
import type { Serializable } from "../types.ts";

export interface VariationOptions {
  design: VariationDesign;
  pressActions?: Action[];
  longpressActions?: LongpressAction;
}

export class Variation implements Serializable {
  public readonly design: VariationDesign;
  public readonly pressActions: Action[];
  public readonly longpressActions: LongpressAction;

  constructor(options: VariationOptions) {
    this.design = options.design;
    this.longpressActions = options.longpressActions ?? new LongpressAction();
    this.pressActions = options.pressActions ?? [];
  }

  toJSON(): object {
    return {
      design: this.design.toJSON(),
      longpress_actions: this.longpressActions.toJSON(),
      press_actions: this.pressActions.map((a) => a.toJSON()),
    };
  }
}
