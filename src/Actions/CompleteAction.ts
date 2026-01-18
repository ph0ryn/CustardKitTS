import { BaseAction } from "./BaseAction.ts";

export class CompleteAction extends BaseAction {
  readonly type = "complete" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
