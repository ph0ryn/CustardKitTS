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
    return { identifier: this.identifier, tab_type: this.tabType, type: this.type };
  }
}
