import { BaseAction } from "./BaseAction.ts";

export class InputAction extends BaseAction {
  readonly type = "input" as const;

  constructor(public readonly text: string) {
    super();
  }

  toJSON(): object {
    return { text: this.text, type: this.type };
  }
}
