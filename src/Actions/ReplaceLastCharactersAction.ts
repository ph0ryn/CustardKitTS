import { BaseAction } from "./BaseAction.ts";

export class ReplaceLastCharactersAction extends BaseAction {
  readonly type = "replace_last_characters" as const;

  constructor(public readonly table: Record<string, string>) {
    super();
  }

  toJSON(): object {
    return { table: this.table, type: this.type };
  }
}
