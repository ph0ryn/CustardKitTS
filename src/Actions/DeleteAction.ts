import { BaseAction } from "./BaseAction.ts";

export class DeleteAction extends BaseAction {
  readonly type = "delete" as const;

  constructor(public readonly count: number = 1) {
    super();

    if (count < 1) {
      console.warn(`DeleteAction: count (${count}) is less than 1, which is meaningless`);
    }
  }

  toJSON(): object {
    return { count: this.count, type: this.type };
  }
}
