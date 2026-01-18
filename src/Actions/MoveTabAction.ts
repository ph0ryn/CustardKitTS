import { BaseAction } from "./BaseAction.ts";

import type { SystemTabType } from "../enums.ts";

export class MoveTabAction extends BaseAction {
  readonly type = "move_tab" as const;

  constructor(
    public readonly tabType: "system" | "custom",
    public readonly identifier: SystemTabType | string,
  ) {
    super();
  }

  toJSON(): object {
    return { type: this.type, tab_type: this.tabType, identifier: this.identifier };
  }
}
