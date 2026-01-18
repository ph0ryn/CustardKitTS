import { BaseAction } from "./BaseAction.ts";

export class ToggleCursorBarAction extends BaseAction {
  readonly type = "toggle_cursor_bar" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
