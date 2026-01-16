import {
  KeyColor,
  type FlickDirection,
  type LongpressDuration,
  type SystemKeyType,
} from "./enums.ts";

import type { Action, Serializable } from "./actions.ts";
import type { Label } from "./labels.ts";

// =============================================================================
// LongpressAction
// =============================================================================

export interface LongpressActionOptions {
  start?: Action[];
  repeat?: Action[];
  duration?: LongpressDuration;
}

export class LongpressAction implements Serializable {
  public readonly start: Action[];
  public readonly repeat: Action[];
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
  pressActions?: Action[];
  longpressActions?: LongpressAction;
  variations?: VariationData[];
}

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
}

export class SystemKey implements Serializable {
  constructor(public readonly keyType: SystemKeyType) {}

  toJSON(): object {
    return { type: this.keyType };
  }
}

export type Key = CustomKey | SystemKey;
