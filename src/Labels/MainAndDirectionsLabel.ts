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
    return { directions: this.directions, main: this.main, type: "main_and_directions" };
  }
}
