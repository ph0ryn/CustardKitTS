import type { Serializable } from "../types.ts";

/**
 * A label that displays a simple text string on a key.
 *
 * @remarks
 * The `type` field is included in the JSON output for consistency,
 * although azookey doesn't recognize it.
 *
 * @param text - The text to display on the key.
 */
export class TextLabel implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { type: "text", text: this.text };
  }
}
