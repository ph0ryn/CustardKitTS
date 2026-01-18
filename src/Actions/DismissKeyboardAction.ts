import { BaseAction } from "./BaseAction.ts";

export class DismissKeyboardAction extends BaseAction {
  readonly type = "dismiss_keyboard" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
