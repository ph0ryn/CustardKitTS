import type { SystemKeyType } from "../enums.ts";
import type { Serializable } from "../types.ts";

export class SystemKey implements Serializable {
  constructor(public readonly keyType: SystemKeyType) {}

  toJSON(): object {
    return { type: this.keyType };
  }
}
