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

class InputAction implements Serializable {
  constructor(public readonly text: string) {}

  toJSON(): object {
    return { text: this.text, type: "input" };
  }
}

class PasteAction implements Serializable {
  toJSON(): object {
    return { type: "paste" };
  }
}

class DeleteAction implements Serializable {
  constructor(public readonly count: number = 1) {}

  toJSON(): object {
    return { count: this.count, type: "delete" };
  }
}

class MoveCursorAction implements Serializable {
  constructor(public readonly count: number) {}

  toJSON(): object {
    return { count: this.count, type: "move_cursor" };
  }
}

class ReplaceDefaultAction implements Serializable {
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

class ReplaceLastCharactersAction implements Serializable {
  constructor(public readonly table: Record<string, string>) {}

  toJSON(): object {
    return { table: this.table, type: "replace_last_characters" };
  }
}

class SmartDeleteAction implements Serializable {
  constructor(
    public readonly targets: string[],
    public readonly direction: ScanDirection,
  ) {}

  toJSON(): object {
    return { direction: this.direction, targets: this.targets, type: "smart_delete" };
  }
}

class SmartDeleteDefaultAction implements Serializable {
  toJSON(): object {
    return { type: "smart_delete_default" };
  }
}

class SmartMoveCursorAction implements Serializable {
  constructor(
    public readonly targets: string[],
    public readonly direction: ScanDirection,
  ) {}

  toJSON(): object {
    return { direction: this.direction, targets: this.targets, type: "smart_move_cursor" };
  }
}

class SelectCandidateAction implements Serializable {
  constructor(public readonly selection: { type: string; value?: number }) {}

  toJSON(): object {
    return { selection: this.selection, type: "select_candidate" };
  }
}

class CompleteAction implements Serializable {
  toJSON(): object {
    return { type: "complete" };
  }
}

class CompleteCharacterFormAction implements Serializable {
  constructor(public readonly forms: CharacterForm[]) {}

  toJSON(): object {
    return { forms: this.forms, type: "complete_character_form" };
  }
}

class MoveTabAction implements Serializable {
  constructor(
    public readonly tabType: "system" | "custom",
    public readonly identifier: SystemTabType | string,
  ) {}

  toJSON(): object {
    return { identifier: this.identifier, tab_type: this.tabType, type: "move_tab" };
  }
}

class ToggleTabBarAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_tab_bar" };
  }
}

class ToggleCursorBarAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_cursor_bar" };
  }
}

class ToggleCapsLockStateAction implements Serializable {
  toJSON(): object {
    return { type: "toggle_caps_lock_state" };
  }
}

class EnableResizingModeAction implements Serializable {
  toJSON(): object {
    return { type: "enable_resizing_mode" };
  }
}

class DismissKeyboardAction implements Serializable {
  toJSON(): object {
    return { type: "dismiss_keyboard" };
  }
}

class LaunchApplicationAction implements Serializable {
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

export const Action = {
  complete: () => new CompleteAction(),
  completeCharacterForm: (forms: CharacterForm[]) => new CompleteCharacterFormAction(forms),
  delete: (count: number = 1) => new DeleteAction(count),
  dismissKeyboard: () => new DismissKeyboardAction(),
  enableResizingMode: () => new EnableResizingModeAction(),
  input: (text: string) => new InputAction(text),
  launchApplication: (schemeType: "azooKey" | "shortcuts", target: string) =>
    new LaunchApplicationAction(schemeType, target),
  moveCursor: (count: number) => new MoveCursorAction(count),
  moveTab: (tabType: "system" | "custom", identifier: SystemTabType | string) =>
    new MoveTabAction(tabType, identifier),
  paste: () => new PasteAction(),
  replaceDefault: (replaceType?: ReplaceType, fallbacks?: ReplaceType[]) =>
    new ReplaceDefaultAction(replaceType, fallbacks),
  replaceLastCharacters: (table: Record<string, string>) => new ReplaceLastCharactersAction(table),
  selectCandidate: (selection: { type: string; value?: number }) =>
    new SelectCandidateAction(selection),
  smartDelete: (targets: string[], direction: ScanDirection) =>
    new SmartDeleteAction(targets, direction),
  smartDeleteDefault: () => new SmartDeleteDefaultAction(),
  smartMoveCursor: (targets: string[], direction: ScanDirection) =>
    new SmartMoveCursorAction(targets, direction),
  toggleCapsLockState: () => new ToggleCapsLockStateAction(),
  toggleCursorBar: () => new ToggleCursorBarAction(),
  toggleTabBar: () => new ToggleTabBarAction(),
} as const;
