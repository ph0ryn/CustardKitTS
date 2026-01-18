import { BaseAction } from "./BaseAction.ts";

export class PasteAction extends BaseAction {
  readonly type = "paste" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
