import type { Serializable } from "../types.ts";

export class SystemImageLabel implements Serializable {
  constructor(public readonly systemImage: string) {}

  toJSON(): object {
    return { system_image: this.systemImage };
  }
}
