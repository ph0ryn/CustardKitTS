import type { Serializable } from "../types.ts";

/**
 * A label that displays a main character prominently and a sub text below it.
 *
 * @remarks
 * The main character is shown larger on the first line, and the sub text is shown smaller on the second line.
 *
 * @example
 * ```typescript
 * const label = new MainAndSubLabel("あ", "あいう");
 * ```
 */
export class MainAndSubLabel implements Serializable {
  constructor(
    /** Main character to display prominently (single character recommended) */
    public readonly main: string,
    /** Sub text to display below the main character */
    public readonly sub: string,
  ) {}

  toJSON(): object {
    return { type: "main_and_sub", main: this.main, sub: this.sub };
  }
}
