import { writeFile } from "node:fs/promises";

import { InvalidIdentifierError } from "../errors.ts";

import type { Interface } from "./Interface.ts";
import type { Metadata } from "./Metadata.ts";
import type { InputStyle, Language } from "../enums.ts";
import type { Serializable } from "../types.ts";

const IDENTIFIER_PATTERN = /^[a-z0-9_]+$/;

/**
 * Options for creating a Custard instance.
 */
export interface CustardOptions {
  /**
   * Unique identifier for the custard.
   * Must consist of lowercase letters, numbers, and underscores only (pattern: /^[a-z0-9_]+$/).
   * Should not conflict with other custard identifiers.
   */
  identifier: string;
  /**
   * Target language for conversion.
   * @see {@link Language}
   */
  language: Language;
  /**
   * Input style (direct or roman-to-kana).
   * @see {@link InputStyle}
   */
  inputStyle: InputStyle;
  /**
   * Metadata containing version and display name.
   */
  metadata: Metadata;
  /**
   * Interface definition containing layout and keys.
   */
  interface: Interface;
}

/**
 * Represents a custom keyboard tab (Custard) for azooKey.
 *
 * @remarks
 * A Custard is a complete custom keyboard tab definition that includes:
 * - An identifier for uniquely identifying the tab
 * - Language and input style settings
 * - Metadata (version, display name)
 * - Interface (layout and keys)
 *
 * @example
 * ```typescript
 * const custard = new Custard({
 *   identifier: "my_keyboard",
 *   language: Language.JaJP,
 *   inputStyle: InputStyle.Direct,
 *   metadata: Metadata.create("My Keyboard"),
 *   interface: new Interface({
 *     keyStyle: KeyStyle.TenkeyStyle,
 *     keyLayout: Layout.gridFit({ rowCount: 4, columnCount: 5 }),
 *     keys: [...]
 *   })
 * });
 *
 * await custard.write("my_keyboard.json");
 * ```
 */
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

/**
 * A collection of Custard instances that can be exported as a single JSON file.
 *
 * @remarks
 * Use this class when you want to bundle multiple custom keyboard tabs into a single file.
 * The reader can import all tabs at once.
 *
 * @example
 * ```typescript
 * const list = new CustardList([custard1, custard2, custard3]);
 * await list.write("my_keyboards.json");
 * ```
 */
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
