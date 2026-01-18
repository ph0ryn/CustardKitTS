import { BaseAction } from "./BaseAction.ts";

export class MoveCursorAction extends BaseAction {
  readonly type = "move_cursor" as const;

  constructor(public readonly count: number) {
    super();

    if (count === 0) {
      console.warn("MoveCursorAction: count is 0, which is meaningless");
    }
  }

  toJSON(): object {
    return { type: this.type, count: this.count };
  }
}
