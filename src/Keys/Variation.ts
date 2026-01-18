import { LongpressAction } from "./LongpressAction.ts";
import { VariationDesign } from "./VariationDesign.ts";
import { Action, type Action as ActionType } from "../Actions/index.ts";

import type { Serializable } from "../types.ts";

export interface VariationOptions {
  design: VariationDesign;
  pressActions?: ActionType[];
  longpressActions?: LongpressAction;
}

export class Variation implements Serializable {
  public readonly design: VariationDesign;
  public readonly pressActions: ActionType[];
  public readonly longpressActions: LongpressAction;

  constructor(options: VariationOptions) {
    this.design = options.design;
    this.longpressActions = options.longpressActions ?? new LongpressAction();
    this.pressActions = options.pressActions ?? [];
  }

  toJSON(): object {
    return {
      design: this.design.toJSON(),
      press_actions: this.pressActions.map((a) => a.toJSON()),
      longpress_actions: this.longpressActions.toJSON(),
    };
  }

  static simpleInput(text: string, label?: string): Variation {
    return new Variation({
      design: VariationDesign.text(label ?? text),
      pressActions: [Action.input(text)],
    });
  }
}
