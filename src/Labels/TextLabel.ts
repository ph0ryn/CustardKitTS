import type { Serializable } from "../types.ts";

export class TextLabel implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { text: this.text };
  }
}
