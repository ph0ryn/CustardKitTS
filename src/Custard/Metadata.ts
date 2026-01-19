import { EmptyDisplayNameError } from "../errors.ts";

import type { Serializable } from "../types.ts";

/**
 * Options for creating a Metadata instance.
 */
export interface MetadataOptions {
  /**
   * The Custard format version.
   * Use "1.0" for the standard format documented at azooKey/CustardKit.
   */
  custardVersion: string;
  /**
   * Display name shown in the tab bar.
   */
  displayName: string;
}

/**
 * Metadata for a Custard, containing version and display name.
 *
 * @remarks
 * - **custardVersion**: The format version (e.g., "1.0", "1.2").
 * - **displayName**: The name shown in the tab bar and other UI elements.
 *
 * @example
 * ```typescript
 * const metadata = Metadata.create("My Keyboard");
 * // or with custom version
 * const metadata = new Metadata({ custardVersion: "1.0", displayName: "My Keyboard" });
 * ```
 */
export class Metadata implements Serializable {
  public readonly custardVersion: string;
  public readonly displayName: string;

  constructor(options: MetadataOptions) {
    if (options.displayName === "") {
      throw new EmptyDisplayNameError();
    }

    this.custardVersion = options.custardVersion;
    this.displayName = options.displayName;
  }

  toJSON(): object {
    return {
      custard_version: this.custardVersion,
      display_name: this.displayName,
    };
  }

  static create(displayName: string, custardVersion: string = "1.2"): Metadata {
    return new Metadata({ custardVersion, displayName });
  }
}
