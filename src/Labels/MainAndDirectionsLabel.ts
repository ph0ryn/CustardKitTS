import type { Serializable } from "../types.ts";

/**
 * Directional labels for the four cardinal directions.
 */
export interface DirectionalLabels {
  /** Label for left direction */
  left?: string;
  /** Label for top direction */
  top?: string;
  /** Label for right direction */
  right?: string;
  /** Label for bottom direction */
  bottom?: string;
}

/**
 * A label that displays a main character in the center with directional labels around it.
 *
 * @remarks
 * The main character is shown in the center, and optional labels are shown in the four directions.
 *
 * @example
 * ```typescript
 * const label = new MainAndDirectionsLabel("あ", { left: "い", top: "う", right: "え", bottom: "お" });
 * ```
 */
export class MainAndDirectionsLabel implements Serializable {
  constructor(
    /** Main character to display in the center */
    public readonly main: string,
    /** Directional labels for the four directions */
    public readonly directions: DirectionalLabels,
  ) {}

  toJSON(): object {
    return { type: "main_and_directions", main: this.main, directions: this.directions };
  }
}
