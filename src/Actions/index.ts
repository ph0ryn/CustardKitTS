export { BaseAction } from "./BaseAction.ts";
export { CompleteAction } from "./CompleteAction.ts";
export { CompleteCharacterFormAction } from "./CompleteCharacterFormAction.ts";
export { DeleteAction } from "./DeleteAction.ts";
export { DismissKeyboardAction } from "./DismissKeyboardAction.ts";
export { EnableResizingModeAction } from "./EnableResizingModeAction.ts";
export { InputAction } from "./InputAction.ts";
export { LaunchApplicationAction } from "./LaunchApplicationAction.ts";
export { MoveCursorAction } from "./MoveCursorAction.ts";
export { MoveTabAction } from "./MoveTabAction.ts";
export { PasteAction } from "./PasteAction.ts";
export { ReplaceDefaultAction } from "./ReplaceDefaultAction.ts";
export { ReplaceLastCharactersAction } from "./ReplaceLastCharactersAction.ts";
export { SelectCandidateAction } from "./SelectCandidateAction.ts";
export { SmartDeleteAction } from "./SmartDeleteAction.ts";
export { SmartDeleteDefaultAction } from "./SmartDeleteDefaultAction.ts";
export { SmartMoveCursorAction } from "./SmartMoveCursorAction.ts";
export { ToggleCapsLockStateAction } from "./ToggleCapsLockStateAction.ts";
export { ToggleCursorBarAction } from "./ToggleCursorBarAction.ts";
export { ToggleTabBarAction } from "./ToggleTabBarAction.ts";

import { CompleteAction } from "./CompleteAction.ts";
import { CompleteCharacterFormAction } from "./CompleteCharacterFormAction.ts";
import { DeleteAction } from "./DeleteAction.ts";
import { DismissKeyboardAction } from "./DismissKeyboardAction.ts";
import { EnableResizingModeAction } from "./EnableResizingModeAction.ts";
import { InputAction } from "./InputAction.ts";
import { LaunchApplicationAction } from "./LaunchApplicationAction.ts";
import { MoveCursorAction } from "./MoveCursorAction.ts";
import { MoveTabAction } from "./MoveTabAction.ts";
import { PasteAction } from "./PasteAction.ts";
import { ReplaceDefaultAction } from "./ReplaceDefaultAction.ts";
import { ReplaceLastCharactersAction } from "./ReplaceLastCharactersAction.ts";
import { SelectCandidateAction } from "./SelectCandidateAction.ts";
import { SmartDeleteAction } from "./SmartDeleteAction.ts";
import { SmartDeleteDefaultAction } from "./SmartDeleteDefaultAction.ts";
import { SmartMoveCursorAction } from "./SmartMoveCursorAction.ts";
import { ToggleCapsLockStateAction } from "./ToggleCapsLockStateAction.ts";
import { ToggleCursorBarAction } from "./ToggleCursorBarAction.ts";
import { ToggleTabBarAction } from "./ToggleTabBarAction.ts";

import type { CharacterForm, ReplaceType, ScanDirection, SystemTabType } from "../enums.ts";

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
