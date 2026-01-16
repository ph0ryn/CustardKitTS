import type { Serializable } from "./actions.ts";

// =============================================================================
// Labels - matching Python version
// =============================================================================

export class TextLabel implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { text: this.text };
  }
}

export class SystemImageLabel implements Serializable {
  constructor(public readonly systemImage: string) {}

  toJSON(): object {
    return { system_image: this.systemImage };
  }
}

export class MainAndSubLabel implements Serializable {
  constructor(
    public readonly main: string,
    public readonly sub: string,
  ) {}

  toJSON(): object {
    return { main: this.main, sub: this.sub, type: "main_and_sub" };
  }
}

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

export type Label = MainAndDirectionsLabel | MainAndSubLabel | SystemImageLabel | TextLabel;
