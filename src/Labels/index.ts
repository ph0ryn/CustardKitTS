export { MainAndDirectionsLabel, type DirectionalLabels } from "./MainAndDirectionsLabel.ts";
export { MainAndSubLabel } from "./MainAndSubLabel.ts";
export { SystemImageLabel } from "./SystemImageLabel.ts";
export { TextLabel } from "./TextLabel.ts";

import { MainAndDirectionsLabel, type DirectionalLabels } from "./MainAndDirectionsLabel.ts";
import { MainAndSubLabel } from "./MainAndSubLabel.ts";
import { SystemImageLabel } from "./SystemImageLabel.ts";
import { TextLabel } from "./TextLabel.ts";

/**
 * Union type of all label types.
 */
export type Label = MainAndDirectionsLabel | MainAndSubLabel | SystemImageLabel | TextLabel;

/**
 * Factory object for creating label instances.
 *
 * @example
 * ```typescript
 * const textLabel = Label.text("A");
 * const imageLabel = Label.systemImage("delete.left");
 * const mainSubLabel = Label.mainAndSub("あ", "あいう");
 * const directionalLabel = Label.mainAndDirections("あ", { left: "い", top: "う" });
 * ```
 */
export const Label = {
  /**
   * Creates a label displaying a main character with directional labels.
   * @param main - Main character in the center.
   * @param directions - Labels for each direction.
   */
  mainAndDirections: (main: string, directions: DirectionalLabels) =>
    new MainAndDirectionsLabel(main, directions),
  /**
   * Creates a label with a main character and sub text.
   * @param main - Main character (displayed larger).
   * @param sub - Sub text (displayed smaller below).
   */
  mainAndSub: (main: string, sub: string) => new MainAndSubLabel(main, sub),
  /**
   * Creates a label displaying an SF Symbol image.
   * @param systemImage - SF Symbol name (e.g., "delete.left").
   * @see https://developer.apple.com/sf-symbols/
   */
  systemImage: (systemImage: string) => new SystemImageLabel(systemImage),
  /**
   * Creates a simple text label.
   * @param text - Text to display on the key.
   */
  text: (text: string) => new TextLabel(text),
} as const;
