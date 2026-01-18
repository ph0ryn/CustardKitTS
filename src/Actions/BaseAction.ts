import type { Serializable } from "../types.ts";

export abstract class BaseAction implements Serializable {
  abstract readonly type: string;
  abstract toJSON(): object;
}
