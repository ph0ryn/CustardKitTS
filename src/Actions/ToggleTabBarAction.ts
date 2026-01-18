import { BaseAction } from "./BaseAction.ts";

export class ToggleTabBarAction extends BaseAction {
  readonly type = "toggle_tab_bar" as const;

  toJSON(): object {
    return { type: this.type };
  }
}
