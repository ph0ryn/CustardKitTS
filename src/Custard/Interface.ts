import type { KeyData, Layout } from "../Layout/index.ts";
import type { KeyStyle } from "../enums.ts";
import type { Serializable } from "../types.ts";

export interface InterfaceOptions {
  keyStyle: KeyStyle;
  keyLayout: Layout;
  keys: KeyData[];
}

export class Interface implements Serializable {
  public readonly keyStyle: KeyStyle;
  public readonly keyLayout: Layout;
  public readonly keys: KeyData[];

  constructor(options: InterfaceOptions) {
    this.keyLayout = options.keyLayout;
    this.keyStyle = options.keyStyle;
    this.keys = options.keys;
  }

  toJSON(): object {
    return {
      key_layout: this.keyLayout.toJSON(),
      key_style: this.keyStyle,
      keys: this.keys.map((k) => k.toJSON()),
    };
  }
}
