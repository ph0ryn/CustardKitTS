export {
  CustomKey,
  type CustomKeyOptions,
  type SimpleInputArgument,
  type VariationData,
} from "./CustomKey.ts";
export { FlickVariationData, type FlickVariationDataOptions } from "./FlickVariationData.ts";
export { KeyDesign, type KeyDesignOptions } from "./KeyDesign.ts";
export { LongpressAction, type LongpressActionOptions } from "./LongpressAction.ts";
export {
  LongpressVariationData,
  type LongpressVariationDataOptions,
} from "./LongpressVariationData.ts";
export { SystemKey } from "./SystemKey.ts";
export { Variation, type VariationOptions } from "./Variation.ts";
export { VariationDesign, type VariationDesignOptions } from "./VariationDesign.ts";

import type { CustomKey } from "./CustomKey.ts";
import type { SystemKey } from "./SystemKey.ts";

export type Key = CustomKey | SystemKey;
