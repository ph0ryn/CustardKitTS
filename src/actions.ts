import type { CharacterForm, ReplaceType, ScanDirection, SystemTabType } from "./enums.ts";

// =============================================================================
// Action Base
// =============================================================================

export interface Serializable {
  toJSON(): object;
}

// =============================================================================
// Actions - matching Python version
// =============================================================================

export class InputAction implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { text: this.text, type: "input" };
  }
}

export class PasteAction implements Serializable {
  toJSON(): object {
    return { type: "paste" };
  }
}

export class DeleteAction implements Serializable {
  constructor(public readonly count: number = 1) {}

  toJSON(): object {
    return { count: this.count, type: "delete" };
  }
}

export class MoveCursorAction implements Serializable {
  constructor(public readonly count: number) {}

  toJSON(): object {
    return { count: this.count, type: "move_cursor" };
  }
}

export class ReplaceDefaultAction implements Serializable {
  constructor(
    public readonly replaceType?: ReplaceType,
    public readonly fallbacks?: ReplaceType[],
  ) {}

  toJSON(): object {
    const json: Record<string, unknown> = { type: "replace_default" };

    if (this.fallbacks !== undefined) {
      json["fallbacks"] = this.fallbacks;
    }

    if (this.replaceType !== undefined) {
      json["replace_type"] = this.replaceType;
    }

    return json;
  }
}

export class ReplaceLastCharactersAction implements Serializable {
  constructor(public readonly table: Record<string, string>) {}

  toJSON(): object {
    return { table: this.table, type: "replace_last_characters" };
  }
}

export class SmartDeleteAction implements Serializable {
  constructor(
    public readonly targets: string[],
    public readonly direction: ScanDirection,
  ) {}

  toJSON(): object {
    return { direction: this.direction, targets: this.targets, type: "smart_delete" };
  }
}

export class SmartDeleteDefaultAction implements Serializable {
  toJSON(): object {
    return { type: "smart_delete_default" };
  }
}

export class SmartMoveCursorAction implements Serializable {
  constructor(
    public readonly targets: string[],
    public readonly direction: ScanDirection,
  ) {}

  toJSON(): object {
    return { direction: this.direction, targets: this.targets, type: "smart_move_cursor" };
  }
}

export class SelectCandidateAction implements Serializable {
  constructor(public readonly selection: { type: string; value?: number }) {}

  toJSON(): object {
    return { selection: this.selection, type: "select_candidate" };
  }
}

export class CompleteAction implements Serializable {
  toJSON(): object {
    return { type: "complete" };
  }
}

export class CompleteCharacterFormAction implements Serializable {
  constructor(public readonly forms: CharacterForm[]) {}

  toJSON(): object {
    return { forms: this.forms, type: "complete_character_form" };
  }
}

export class MoveTabAction implements Serializable {
  constructor(
    public readonly tabType: "system" | "custom",
    public readonly identifier: SystemTabType | string,
  ) {}

  toJSON(): object {
    return { identifier: this.identifier, tab_type: this.tabType, type: "move_tab" };
  }
}

export class ToggleTabBarAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_tab_bar" };
  }
}

export class ToggleCursorBarAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_cursor_bar" };
  }
}

export class ToggleCapsLockStateAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_caps_lock_state" };
  }
}

export class EnableResizingModeAction implements Serializable {
  toJSON(): object {
    return { type: "enable_resizing_mode" };
  }
}

export class DismissKeyboardAction implements Serializable {
  toJSON(): object {
    return { type: "dismiss_keyboard" };
  }
}

export class LaunchApplicationAction implements Serializable {
  constructor(
    public readonly schemeType: "azooKey" | "shortcuts",
    public readonly target: string,
  ) {}

  toJSON(): object {
    return { scheme_type: this.schemeType, target: this.target, type: "launch_application" };
  }
}

// Action type union
export type Action =
  | CompleteAction
  | CompleteCharacterFormAction
  | DeleteAction
  | DismissKeyboardAction
  | EnableResizingModeAction
  | InputAction
  | LaunchApplicationAction
  | MoveCursorAction
  | MoveTabAction
  | PasteAction
  | ReplaceDefaultAction
  | ReplaceLastCharactersAction
  | SelectCandidateAction
  | SmartDeleteAction
  | SmartDeleteDefaultAction
  | SmartMoveCursorAction
  | ToggleCapsLockStateAction
  | ToggleCursorBarAction
  | ToggleTabBarAction;
