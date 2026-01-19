import type { Action } from "../Actions/index.ts";
import type { LongpressDuration } from "../enums.ts";
import type { Serializable } from "../types.ts";

/**
 * Options for creating a LongpressAction instance.
 */
export interface LongpressActionOptions {
  /** Actions executed once when long press starts */
  start?: Action[];
  /** Actions executed repeatedly while long press continues */
  repeat?: Action[];
  /** Duration before long press is recognized (normal or light) */
  duration?: LongpressDuration;
}

/**
 * Represents long press behavior for a key.
 *
 * @remarks
 * - **start**: Actions executed once when the long press begins.
 * - **repeat**: Actions executed repeatedly while the key is held.
 * - **duration**: How quickly long press is recognized (normal or light).
 *
 * An empty LongpressAction (no start or repeat) means no long press behavior.
 *
 * @example
 * ```typescript
 * // Delete one character repeatedly on long press
 * const longpress = new LongpressAction({ repeat: [Action.delete(1)] });
 *
 * // With faster recognition
 * const longpress = new LongpressAction({
 *   duration: LongpressDuration.Light,
 *   repeat: [Action.delete(1)]
 * });
 * ```
 */
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
