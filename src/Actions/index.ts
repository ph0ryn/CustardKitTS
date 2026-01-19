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

/**
 * Union type of all action types.
 */
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

/**
 * Factory object for creating action instances.
 *
 * @remarks
 * Actions define what happens when a key is pressed or long-pressed.
 * Multiple actions can be combined and will execute in order.
 *
 * @example
 * ```typescript
 * // Input text
 * const inputAction = Action.input("Hello");
 *
 * // Delete 1 character
 * const deleteAction = Action.delete(1);
 *
 * // Move cursor
 * const moveAction = Action.moveCursor(-1);
 *
 * // Switch tab
 * const tabAction = Action.moveTab("system", SystemTabType.FlickJapanese);
 * ```
 */
export const Action = {
  /** Completes (confirms) the current conversion. */
  complete: () => new CompleteAction(),
  /**
   * Converts to specified character forms and completes.
   * @param forms - Array of character forms to apply.
   */
  completeCharacterForm: (forms: CharacterForm[]) => new CompleteCharacterFormAction(forms),
  /**
   * Deletes characters.
   * @param count - Number of characters to delete (negative for forward delete).
   */
  delete: (count: number = 1) => new DeleteAction(count),
  /** Dismisses the keyboard. */
  dismissKeyboard: () => new DismissKeyboardAction(),
  /** Enables one-hand mode resizing. */
  enableResizingMode: () => new EnableResizingModeAction(),
  /**
   * Inputs text.
   * @param text - Text to input.
   */
  input: (text: string) => new InputAction(text),
  /**
   * Launches an application via URL scheme.
   * @param schemeType - "azooKey" or "shortcuts".
   * @param target - Target identifier for the scheme.
   */
  launchApplication: (schemeType: "azooKey" | "shortcuts", target: string) =>
    new LaunchApplicationAction(schemeType, target),
  /**
   * Moves the cursor.
   * @param count - Number of positions to move (negative for backward).
   */
  moveCursor: (count: number) => new MoveCursorAction(count),
  /**
   * Switches to another tab.
   * @param tabType - "system" or "custom".
   * @param identifier - Tab identifier (SystemTabType or custom tab ID).
   */
  moveTab: (tabType: "system" | "custom", identifier: SystemTabType | string) =>
    new MoveTabAction(tabType, identifier),
  /** Pastes from clipboard (requires full access). */
  paste: () => new PasteAction(),
  /**
   * Replaces with default behavior (dakuten, handakuten, kogaki, etc.).
   * @param replaceType - Type of replacement.
   * @param fallbacks - Fallback replacement types.
   */
  replaceDefault: (replaceType?: ReplaceType, fallbacks?: ReplaceType[]) =>
    new ReplaceDefaultAction(replaceType, fallbacks),
  /**
   * Replaces characters before cursor based on a mapping table.
   * @param table - Mapping from source strings to replacement strings.
   */
  replaceLastCharacters: (table: Record<string, string>) => new ReplaceLastCharactersAction(table),
  /**
   * Selects a conversion candidate.
   * @param selection - Selection specification (first, last, exact, or offset).
   */
  selectCandidate: (selection: { type: string; value?: number }) =>
    new SelectCandidateAction(selection),
  /**
   * Deletes until a target character is found.
   * @param targets - Target characters to stop at.
   * @param direction - Direction to scan (forward or backward).
   */
  smartDelete: (targets: string[], direction: ScanDirection) =>
    new SmartDeleteAction(targets, direction),
  /** Deletes to the beginning of the line (default smart delete). */
  smartDeleteDefault: () => new SmartDeleteDefaultAction(),
  /**
   * Moves cursor until a target character is found.
   * @param targets - Target characters to stop at.
   * @param direction - Direction to scan (forward or backward).
   */
  smartMoveCursor: (targets: string[], direction: ScanDirection) =>
    new SmartMoveCursorAction(targets, direction),
  /** Toggles caps lock state. */
  toggleCapsLockState: () => new ToggleCapsLockStateAction(),
  /** Toggles cursor bar visibility. */
  toggleCursorBar: () => new ToggleCursorBarAction(),
  /** Toggles tab bar visibility. */
  toggleTabBar: () => new ToggleTabBarAction(),
} as const;
