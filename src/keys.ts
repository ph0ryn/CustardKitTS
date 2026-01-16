import { Action, type Action as ActionType, type Serializable } from "./actions.ts";
import { FlickDirection, KeyColor, type LongpressDuration, type SystemKeyType } from "./enums.ts";
import { Label } from "./labels.ts";

// =============================================================================
// LongpressAction
// =============================================================================

export interface LongpressActionOptions {
  start?: ActionType[];
  repeat?: ActionType[];
  duration?: LongpressDuration;
}

export class LongpressAction implements Serializable {
  public readonly start: ActionType[];
  public readonly repeat: ActionType[];
  public readonly duration?: LongpressDuration;

  constructor(options: LongpressActionOptions = {}) {
    this.duration = options.duration;
    this.repeat = options.repeat ?? [];
    this.start = options.start ?? [];
  }

  toJSON(): object {
    const json: Record<string, unknown> = {
      repeat: this.repeat.map((a) => a.toJSON()),
      start: this.start.map((a) => a.toJSON()),
    };

    if (this.duration !== undefined) {
      json["duration"] = this.duration;
    }

    return json;
  }
}

// =============================================================================
// Key Designs
// =============================================================================

export interface KeyDesignOptions {
  label: Label;
  color?: KeyColor;
}

export class KeyDesign implements Serializable {
  public readonly label: Label;
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
}

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

// =============================================================================
// Variation
// =============================================================================

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
      longpress_actions: this.longpressActions.toJSON(),
      press_actions: this.pressActions.map((a) => a.toJSON()),
    };
  }
}

// =============================================================================
// Variation Data
// =============================================================================

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

export type VariationData = FlickVariationData | LongpressVariationData;

// =============================================================================
// Keys
// =============================================================================

export interface CustomKeyOptions {
  design: KeyDesign;
  pressActions?: ActionType[];
  longpressActions?: LongpressAction;
  variations?: VariationData[];
}

// Type for flickSimpleInputAndLabels arguments
export type SimpleInputArgument = string | { label: string; input: string };

export class CustomKey implements Serializable {
  public readonly design: KeyDesign;
  public readonly pressActions: ActionType[];
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

  /**
   * Create a flick-style key with center and directional inputs.
   * Directions are assigned in order: left, top, right, bottom.
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
   * Create a flick-style key with label and input for each direction.
   * Each argument can be a string (label=input) or {label, input} object.
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

export class SystemKey implements Serializable {
  constructor(public readonly keyType: SystemKeyType) {}

  toJSON(): object {
    return { type: this.keyType };
  }
}

export type Key = CustomKey | SystemKey;
