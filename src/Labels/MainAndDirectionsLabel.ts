import type { Serializable } from "../types.ts";

export interface DirectionalLabels {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
}

export class MainAndDirectionsLabel implements Serializable {
  constructor(
    public readonly main: string,
    public readonly directions: DirectionalLabels,
  ) {}

  toJSON(): object {
    return { type: "main_and_directions", main: this.main, directions: this.directions };
  }
}
