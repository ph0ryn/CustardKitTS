import { BaseAction } from "./BaseAction.ts";

import type { ScanDirection } from "../enums.ts";

export class SmartMoveCursorAction extends BaseAction {
  readonly type = "smart_move_cursor" as const;

  constructor(
    public readonly targets: string[],
    public readonly direction: ScanDirection,
  ) {
    super();
  }

  toJSON(): object {
    return { type: this.type, direction: this.direction, targets: this.targets };
  }
}
