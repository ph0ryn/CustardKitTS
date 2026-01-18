import type { Serializable } from "../types.ts";

export class MainAndSubLabel implements Serializable {
  constructor(
    public readonly main: string,
    public readonly sub: string,
  ) {}

  toJSON(): object {
    return { type: "main_and_sub", main: this.main, sub: this.sub };
  }
}
