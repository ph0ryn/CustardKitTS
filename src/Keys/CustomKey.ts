import { FlickVariationData } from "./FlickVariationData.ts";
import { KeyDesign } from "./KeyDesign.ts";
import { LongpressAction } from "./LongpressAction.ts";
import { Variation } from "./Variation.ts";
import { VariationDesign } from "./VariationDesign.ts";
import { Action } from "../Actions/index.ts";
import { Label } from "../Labels/index.ts";
import { FlickDirection } from "../enums.ts";

import type { LongpressVariationData } from "./LongpressVariationData.ts";
import type { Serializable } from "../types.ts";

export type VariationData = FlickVariationData | LongpressVariationData;

export interface CustomKeyOptions {
  design: KeyDesign;
  pressActions?: Action[];
  longpressActions?: LongpressAction;
  variations?: VariationData[];
}

export type SimpleInputArgument = string | { label: string; input: string };

export class CustomKey implements Serializable {
  public readonly design: KeyDesign;
  public readonly pressActions: Action[];
  public readonly longpressActions: LongpressAction;
  public readonly variations: VariationData[];

  constructor(options: CustomKeyOptions) {
    this.design = options.design;
    this.longpressActions = options.longpressActions ?? new LongpressAction();
    this.pressActions = options.pressActions ?? [];
    this.variations = options.variations ?? [];
  }

  toJSON(): object {
    return {
      design: this.design.toJSON(),
      longpress_actions: this.longpressActions.toJSON(),
      press_actions: this.pressActions.map((a) => a.toJSON()),
      variations: this.variations.map((v) => v.toJSON()),
    };
  }

  static flickSimpleInputs(center: string, subs: string[], centerLabel?: string): CustomKey {
    const directions: FlickDirection[] = [
      FlickDirection.Left,
      FlickDirection.Top,
      FlickDirection.Right,
      FlickDirection.Bottom,
    ];
    const variations: FlickVariationData[] = [];

    const limit = Math.min(subs.length, 4);

    for (let i = 0; i < limit; i++) {
      const sub = subs[i];
      const direction = directions[i];

      if (sub !== undefined && direction !== undefined) {
        variations.push(
          new FlickVariationData({
            direction,
            key: new Variation({
              design: new VariationDesign({ label: Label.text(sub) }),
              pressActions: [Action.input(sub)],
            }),
          }),
        );
      }
    }

    return new CustomKey({
      design: new KeyDesign({ label: Label.text(centerLabel ?? center) }),
      pressActions: [Action.input(center)],
      variations,
    });
  }

  static flickSimpleInputAndLabels(options: {
    center: SimpleInputArgument;
    left?: SimpleInputArgument;
    top?: SimpleInputArgument;
    right?: SimpleInputArgument;
    bottom?: SimpleInputArgument;
  }): CustomKey {
    const parseArg = (arg: SimpleInputArgument): { label: string; input: string } => {
      if (typeof arg === "string") {
        return { input: arg, label: arg };
      }

      return arg;
    };

    const centerParsed = parseArg(options.center);
    const variations: FlickVariationData[] = [];

    const directionArgs: [FlickDirection, SimpleInputArgument | undefined][] = [
      [FlickDirection.Left, options.left],
      [FlickDirection.Top, options.top],
      [FlickDirection.Right, options.right],
      [FlickDirection.Bottom, options.bottom],
    ];

    for (const [direction, arg] of directionArgs) {
      if (arg !== undefined) {
        const parsed = parseArg(arg);

        variations.push(
          new FlickVariationData({
            direction,
            key: new Variation({
              design: new VariationDesign({ label: Label.text(parsed.label) }),
              pressActions: [Action.input(parsed.input)],
            }),
          }),
        );
      }
    }

    return new CustomKey({
      design: new KeyDesign({ label: Label.text(centerParsed.label) }),
      pressActions: [Action.input(centerParsed.input)],
      variations,
    });
  }
}
