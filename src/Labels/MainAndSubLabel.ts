import type { Serializable } from "../types.ts";

export class MainAndSubLabel implements Serializable {
  constructor(
    public readonly main: string,
    public readonly sub: string,
  ) {}

  toJSON(): object {
    return { main: this.main, sub: this.sub, type: "main_and_sub" };
  }
}
