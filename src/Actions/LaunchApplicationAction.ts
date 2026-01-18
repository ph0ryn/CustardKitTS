import { BaseAction } from "./BaseAction.ts";

export class LaunchApplicationAction extends BaseAction {
  readonly type = "launch_application" as const;

  constructor(
    public readonly schemeType: "azooKey" | "shortcuts",
    public readonly target: string,
  ) {
    super();
  }

  toJSON(): object {
    return { type: this.type, scheme_type: this.schemeType, target: this.target };
  }
}
