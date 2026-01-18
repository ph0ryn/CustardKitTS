import { BaseAction } from "./BaseAction.ts";

export class InputAction extends BaseAction {
  readonly type = "input" as const;

  constructor(public readonly text: string) {
    super();

    if (text === "") {
      console.warn("InputAction: text is empty, which is meaningless");
    }
  }

  toJSON(): object {
    return { type: this.type, text: this.text };
  }
}
