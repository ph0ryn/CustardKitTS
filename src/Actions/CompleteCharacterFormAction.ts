import { BaseAction } from "./BaseAction.ts";

import type { CharacterForm } from "../enums.ts";

export class CompleteCharacterFormAction extends BaseAction {
  readonly type = "complete_character_form" as const;

  constructor(public readonly forms: CharacterForm[]) {
    super();
  }

  toJSON(): object {
    return { type: this.type, forms: this.forms };
  }
}
