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

/**
 * Options for creating a CustomKey instance.
 */
export interface CustomKeyOptions {
  /**
   * The visual design of the key (label and color).
   */
  design: KeyDesign;
  /**
   * Actions to execute when the key is pressed and released.
   * @default []
   */
  pressActions?: Action[];
  /**
   * Actions to execute on long press.
   * @default LongpressAction with empty arrays
   */
  longpressActions?: LongpressAction;
  /**
   * Flick or longpress variations for the key.
   * @default []
   */
  variations?: VariationData[];
}

/**
 * Argument type for simple input keys.
 * Can be a string (used for both label and input) or an object with separate label and input.
 */
export type SimpleInputArgument = string | { label: string; input: string };

/**
 * Represents a custom key with configurable design, actions, and variations.
 *
 * @remarks
 * A CustomKey defines:
 * - **design**: Visual appearance (label and color).
 * - **pressActions**: Actions executed on tap.
 * - **longpressActions**: Actions executed on long press.
 * - **variations**: Flick or longpress variations.
 *
 * Use the static factory methods for convenient creation of common key types.
 *
 * @example
 * ```typescript
 * // Basic key
 * const key = new CustomKey({
 *   design: KeyDesign.text("A"),
 *   pressActions: [Action.input("a")]
 * });
 *
 * // Flick key with variations
 * const flickKey = CustomKey.flickSimpleInputs("あ", ["い", "う", "え", "お"], "あいう");
 * ```
 */
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
      press_actions: this.pressActions.map((a) => a.toJSON()),
      longpress_actions: this.longpressActions.toJSON(),
      variations: this.variations.map((v) => v.toJSON()),
    };
  }

  /**
   * Creates a flick-style key with center and directional variations.
   *
   * @param center - The character to input when center is tapped.
   * @param subs - Array of up to 4 characters for [left, top, right, bottom] flick directions.
   * @param centerLabel - Optional label to display (defaults to center character).
   * @returns A CustomKey configured for flick input.
   *
   * @example
   * ```typescript
   * const key = CustomKey.flickSimpleInputs("あ", ["い", "う", "え", "お"], "あいう");
   * ```
   */
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

  /**
   * Creates a flick-style key with separate label and input for each direction.
   *
   * @param options - Object with center and optional directional arguments.
   * @param options.center - Center key definition (string or {label, input}).
   * @param options.left - Optional left flick definition.
   * @param options.top - Optional top flick definition.
   * @param options.right - Optional right flick definition.
   * @param options.bottom - Optional bottom flick definition.
   * @returns A CustomKey configured for flick input with custom labels.
   *
   * @example
   * ```typescript
   * const key = CustomKey.flickSimpleInputAndLabels({
   *   center: { label: "😸", input: ":smile_cat:" },
   *   left: { label: "😿", input: ":crying_cat_face:" },
   *   right: "🐱" // same label and input
   * });
   * ```
   */
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
