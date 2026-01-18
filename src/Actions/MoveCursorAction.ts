import { BaseAction } from "./BaseAction.ts";

export class MoveCursorAction extends BaseAction {
  readonly type = "move_cursor" as const;

  constructor(public readonly count: number) {
    super();
  }

  toJSON(): object {
    return { count: this.count, type: this.type };
  }
}
