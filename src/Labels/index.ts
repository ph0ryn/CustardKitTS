export { MainAndDirectionsLabel, type DirectionalLabels } from "./MainAndDirectionsLabel.ts";
export { MainAndSubLabel } from "./MainAndSubLabel.ts";
export { SystemImageLabel } from "./SystemImageLabel.ts";
export { TextLabel } from "./TextLabel.ts";

import { MainAndDirectionsLabel, type DirectionalLabels } from "./MainAndDirectionsLabel.ts";
import { MainAndSubLabel } from "./MainAndSubLabel.ts";
import { SystemImageLabel } from "./SystemImageLabel.ts";
import { TextLabel } from "./TextLabel.ts";

export type Label = MainAndDirectionsLabel | MainAndSubLabel | SystemImageLabel | TextLabel;

export const Label = {
  mainAndDirections: (main: string, directions: DirectionalLabels) =>
    new MainAndDirectionsLabel(main, directions),
  mainAndSub: (main: string, sub: string) => new MainAndSubLabel(main, sub),
  systemImage: (systemImage: string) => new SystemImageLabel(systemImage),
  text: (text: string) => new TextLabel(text),
} as const;
