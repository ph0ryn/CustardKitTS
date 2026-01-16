import { writeFile } from "node:fs/promises";

import type { Serializable } from "./actions.ts";
import type { InputStyle, KeyStyle, Language } from "./enums.ts";
import type { KeyData, Layout } from "./layout.ts";

// =============================================================================
// Metadata
// =============================================================================

export interface MetadataOptions {
  custardVersion: string;
  displayName: string;
}

export class Metadata implements Serializable {
  public readonly custardVersion: string;
  public readonly displayName: string;

  constructor(options: MetadataOptions) {
    this.custardVersion = options.custardVersion;
    this.displayName = options.displayName;
  }

  toJSON(): object {
    return {
      custard_version: this.custardVersion,
      display_name: this.displayName,
    };
  }
}

// =============================================================================
// Interface
// =============================================================================

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

// =============================================================================
// Custard
// =============================================================================

export interface CustardOptions {
  identifier: string;
  language: Language;
  inputStyle: InputStyle;
  metadata: Metadata;
  interface: Interface;
}

export class Custard implements Serializable {
  public readonly identifier: string;
  public readonly language: Language;
  public readonly inputStyle: InputStyle;
  public readonly metadata: Metadata;
  public readonly interface: Interface;

  constructor(options: CustardOptions) {
    this.identifier = options.identifier;
    this.inputStyle = options.inputStyle;
    this.interface = options.interface;
    this.language = options.language;
    this.metadata = options.metadata;
  }

  toJSON(): object {
    return {
      identifier: this.identifier,
      input_style: this.inputStyle,
      interface: this.interface.toJSON(),
      language: this.language,
      metadata: this.metadata.toJSON(),
    };
  }

  async write(name: string): Promise<void> {
    let filename: string = name;

    if (!name.endsWith(".json")) {
      filename = `${name}.json`;
    }

    const content = `${JSON.stringify(this, null, 2)}\n`;

    await writeFile(filename, content, { encoding: "utf8" });
  }
}
