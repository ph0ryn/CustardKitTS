import { BaseAction } from "./BaseAction.ts";

export class ToggleCapsLockStateAction extends BaseAction {
  readonly type = "toggle_caps_lock_state" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
