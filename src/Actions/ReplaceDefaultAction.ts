import { BaseAction } from "./BaseAction.ts";

import type { ReplaceType } from "../enums.ts";

export class ReplaceDefaultAction extends BaseAction {
  readonly type = "replace_default" as const;

  constructor(
    public readonly replaceType?: ReplaceType,
    public readonly fallbacks?: ReplaceType[],
  ) {
    super();
  }

  toJSON(): object {
    const json: Record<string, unknown> = { type: this.type };

    if (this.fallbacks !== undefined) {
      json["fallbacks"] = this.fallbacks;
    }

    if (this.replaceType !== undefined) {
      json["replace_type"] = this.replaceType;
    }

    return json;
  }
}
