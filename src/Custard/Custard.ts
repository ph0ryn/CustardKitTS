import { writeFile } from "node:fs/promises";

import { InvalidIdentifierError } from "../errors.ts";

import type { Interface } from "./Interface.ts";
import type { Metadata } from "./Metadata.ts";
import type { InputStyle, Language } from "../enums.ts";
import type { Serializable } from "../types.ts";

const IDENTIFIER_PATTERN = /^[a-z0-9_]+$/;

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
    if (!IDENTIFIER_PATTERN.test(options.identifier)) {
      throw new InvalidIdentifierError(options.identifier);
    }

    this.identifier = options.identifier;
    this.inputStyle = options.inputStyle;
    this.interface = options.interface;
    this.language = options.language;
    this.metadata = options.metadata;
  }

  toJSON(): object {
    return {
      identifier: this.identifier,
      language: this.language,
      input_style: this.inputStyle,
      metadata: this.metadata.toJSON(),
      interface: this.interface.toJSON(),
    };
  }

  async write(name: string): Promise<void> {
    let filename: string = name;

    if (!name.endsWith(".json")) {
      filename = `${name}.json`;
    }

    const content = `${JSON.stringify(this, null)}\n`;

    await writeFile(filename, content, { encoding: "utf8" });
  }
}

export class CustardList {
  public readonly custards: Custard[];

  constructor(custards: Custard[]) {
    this.custards = custards;
  }

  toJSON(): object[] {
    return this.custards.map((c) => c.toJSON());
  }

  async write(name: string): Promise<void> {
    let filename: string = name;

    if (!name.endsWith(".json")) {
      filename = `${name}.json`;
    }

    const content = `${JSON.stringify(this.toJSON(), null)}\n`;

    await writeFile(filename, content, { encoding: "utf8" });
  }
}
