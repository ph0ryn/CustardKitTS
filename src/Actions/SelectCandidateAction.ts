import { BaseAction } from "./BaseAction.ts";

export class SelectCandidateAction extends BaseAction {
  readonly type = "select_candidate" as const;

  constructor(public readonly selection: { type: string; value?: number }) {
    super();
  }

  toJSON(): object {
    return { type: this.type, selection: this.selection };
  }
}
