import { describe, expect, test } from "@jest/globals";
import {
  Custard,
  CustomKey,
  DeleteAction,
  FlickDirection,
  FlickVariationData,
  GridFitLayout,
  GridFitSpecifier,
  InputAction,
  InputStyle,
  Interface,
  KeyColor,
  KeyData,
  KeyDesign,
  KeyStyle,
  Language,
  LongpressAction,
  Metadata,
  SystemKey,
  SystemKeyType,
  TextLabel,
  Variation,
  VariationDesign,
} from "../src/index.ts";

describe("class-based custard", () => {
  test("creates custard matching Python example", () => {
    const custard = new Custard({
      identifier: "my_custard",
      inputStyle: InputStyle.Direct,
      interface: new Interface({
        keyLayout: new GridFitLayout({ columnCount: 2, rowCount: 2 }),
        keyStyle: KeyStyle.TenkeyStyle,
        keys: [
          new KeyData({
            key: new SystemKey(SystemKeyType.ChangeKeyboard),
            specifier: new GridFitSpecifier({ x: 0, y: 0 }),
          }),
          new KeyData({
            key: new CustomKey({
              design: new KeyDesign({
                color: KeyColor.Normal,
                label: new TextLabel("あ"),
              }),
              longpressActions: new LongpressAction({
                start: [new DeleteAction(1)],
              }),
              variations: [
                new FlickVariationData({
                  direction: FlickDirection.Left,
                  key: new Variation({
                    design: new VariationDesign({
                      label: new TextLabel("い"),
                    }),
                    pressActions: [new InputAction("い")],
                  }),
                }),
              ],
            }),
            specifier: new GridFitSpecifier({ x: 0, y: 1 }),
          }),
        ],
      }),
      language: Language.JaJP,
      metadata: new Metadata({
        custardVersion: "1.0",
        displayName: "私のカスタード",
      }),
    });

    expect(custard.identifier).toBe("my_custard");
    expect(custard.language).toBe("ja_JP");

    const json = JSON.parse(JSON.stringify(custard));
    expect(json.identifier).toBe("my_custard");
    expect(json.language).toBe("ja_JP");
    expect(json.interface.key_style).toBe("tenkey_style");
    expect(json.interface.keys).toHaveLength(2);
    expect(json.interface.keys[0].key_type).toBe("system");
    expect(json.interface.keys[1].key_type).toBe("custom");
  });

  test("actions serialize correctly", () => {
    const input = new InputAction("あ");
    expect(input.toJSON()).toEqual({ text: "あ", type: "input" });

    const del = new DeleteAction(3);
    expect(del.toJSON()).toEqual({ count: 3, type: "delete" });
  });

  test("labels serialize correctly", () => {
    const text = new TextLabel("ABC");
    expect(text.toJSON()).toEqual({ text: "ABC" });
  });

  test("key designs serialize correctly", () => {
    const design = new KeyDesign({
      color: KeyColor.Special,
      label: new TextLabel("空白"),
    });
    expect(design.toJSON()).toEqual({
      color: "special",
      label: { text: "空白" },
    });
  });
});
