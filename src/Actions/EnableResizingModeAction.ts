import { BaseAction } from "./BaseAction.ts";

export class EnableResizingModeAction extends BaseAction {
  readonly type = "enable_resizing_mode" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
