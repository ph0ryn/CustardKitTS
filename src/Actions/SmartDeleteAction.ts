import { BaseAction } from "./BaseAction.ts";

import type { ScanDirection } from "../enums.ts";

export class SmartDeleteAction extends BaseAction {
  readonly type = "smart_delete" as const;

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
