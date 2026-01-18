import type { Serializable } from "../types.ts";

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
