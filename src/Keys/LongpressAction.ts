import type { Action } from "../Actions/index.ts";
import type { LongpressDuration } from "../enums.ts";
import type { Serializable } from "../types.ts";

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
