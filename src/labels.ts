import type { Serializable } from "./actions.ts";

// =============================================================================
// Labels - matching Python version
// =============================================================================

class TextLabel implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { text: this.text };
  }
}

class SystemImageLabel implements Serializable {
  constructor(public readonly systemImage: string) {}

  toJSON(): object {
    return { system_image: this.systemImage };
  }
}

class MainAndSubLabel implements Serializable {
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

class MainAndDirectionsLabel implements Serializable {
  constructor(
    public readonly main: string,
    public readonly directions: DirectionalLabels,
  ) {}

  toJSON(): object {
    return { directions: this.directions, main: this.main, type: "main_and_directions" };
  }
}

export type Label = MainAndDirectionsLabel | MainAndSubLabel | SystemImageLabel | TextLabel;

export const Label = {
  mainAndDirections: (main: string, directions: DirectionalLabels) =>
    new MainAndDirectionsLabel(main, directions),
  mainAndSub: (main: string, sub: string) => new MainAndSubLabel(main, sub),
  systemImage: (systemImage: string) => new SystemImageLabel(systemImage),
  text: (text: string) => new TextLabel(text),
} as const;
