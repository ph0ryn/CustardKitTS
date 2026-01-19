import type { Serializable } from "../types.ts";

/**
 * A label that displays an SF Symbol (system image) on a key.
 *
 * @remarks
 * The `type` field is included in the JSON output for consistency,
 * although azookey doesn't recognize it.
 *
 * @param systemImage - The SF Symbol name to display on the key.
 */
export class SystemImageLabel implements Serializable {
  constructor(public readonly systemImage: string) {}

  toJSON(): object {
    return { type: "system_image", system_image: this.systemImage };
  }
}
