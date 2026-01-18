import { BaseAction } from "./BaseAction.ts";

export class DeleteAction extends BaseAction {
  readonly type = "delete" as const;

  constructor(public readonly count: number = 1) {
    super();
  }

  toJSON(): object {
    return { count: this.count, type: this.type };
  }
}
