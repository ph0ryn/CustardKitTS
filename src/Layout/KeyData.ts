import { CustomKey, type Key } from "../Keys/index.ts";

import type { GridFitSpecifier } from "./GridFitSpecifier.ts";
import type { GridScrollSpecifier } from "./GridScrollSpecifier.ts";
import type { Serializable } from "../types.ts";

export type Specifier = GridFitSpecifier | GridScrollSpecifier;

export interface KeyDataOptions {
  specifier: Specifier;
  key: Key;
}

export class KeyData implements Serializable {
  public readonly specifier: Specifier;
  public readonly key: Key;

  constructor(options: KeyDataOptions) {
    this.key = options.key;
    this.specifier = options.specifier;
  }

  toJSON(): object {
    let keyType: "custom" | "system" = "system";

    if (this.key instanceof CustomKey) {
      keyType = "custom";
    }

    return {
      key: this.key.toJSON(),
      key_type: keyType,
      specifier: this.specifier.toJSON(),
      specifier_type: this.specifier.specifierType,
    };
  }
}
