import { BaseAction } from "./BaseAction.ts";

export class SmartDeleteDefaultAction extends BaseAction {
  readonly type = "smart_delete_default" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
