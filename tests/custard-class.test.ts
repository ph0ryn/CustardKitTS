import { describe, expect, test } from "@jest/globals";

import { Action } from "../src/Actions/index.ts";
import {
  Custard,
  CustardList,
  FlickDirection,
  InputStyle,
  Interface,
  KeyColor,
  KeyStyle,
  Language,
  Metadata,
  SystemKeyType,
} from "../src/index.ts";
import {
  CustomKey,
  FlickVariationData,
  KeyDesign,
  LongpressAction,
  SystemKey,
  Variation,
  VariationDesign,
} from "../src/Keys/index.ts";
import { Label } from "../src/Labels/index.ts";
import { GridFitSpecifier, KeyData, Layout } from "../src/Layout/index.ts";

describe("class-based custard", () => {
  test("creates custard matching Python example", () => {
    const custard = new Custard({
      identifier: "my_custard",
      inputStyle: InputStyle.Direct,
      interface: new Interface({
        keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
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
                label: Label.text("あ"),
              }),
              longpressActions: new LongpressAction({
                start: [Action.delete(1)],
              }),
              variations: [
                new FlickVariationData({
                  direction: FlickDirection.Left,
                  key: new Variation({
                    design: new VariationDesign({
                      label: Label.text("い"),
                    }),
                    pressActions: [Action.input("い")],
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
    const input = Action.input("あ");
    expect(input.toJSON()).toEqual({ text: "あ", type: "input" });

    const del = Action.delete(3);
    expect(del.toJSON()).toEqual({ count: 3, type: "delete" });
  });

  test("labels serialize correctly", () => {
    const text = Label.text("ABC");
    expect(text.toJSON()).toEqual({ type: "text", text: "ABC" });
  });

  test("key designs serialize correctly", () => {
    const design = new KeyDesign({
      color: KeyColor.Special,
      label: Label.text("空白"),
    });
    expect(design.toJSON()).toEqual({
      color: "special",
      label: { type: "text", text: "空白" },
    });
  });

  test("CustomKey.flickSimpleInputs creates flick key", () => {
    const key = CustomKey.flickSimpleInputs("あ", ["い", "う", "え", "お"], "あいう");

    const json = JSON.parse(JSON.stringify(key));
    expect(json.design.label.text).toBe("あいう");
    expect(json.press_actions[0].text).toBe("あ");
    expect(json.variations).toHaveLength(4);
    expect(json.variations[0].direction).toBe("left");
    expect(json.variations[0].key.press_actions[0].text).toBe("い");
    expect(json.variations[1].direction).toBe("top");
    expect(json.variations[2].direction).toBe("right");
    expect(json.variations[3].direction).toBe("bottom");
  });

  test("CustomKey.flickSimpleInputAndLabels creates labeled flick key", () => {
    const key = CustomKey.flickSimpleInputAndLabels({
      center: { input: ":smile:", label: "😀" },
      left: "←",
      top: { input: ":up:", label: "↑" },
    });

    const json = JSON.parse(JSON.stringify(key));
    expect(json.design.label.text).toBe("😀");
    expect(json.press_actions[0].text).toBe(":smile:");
    expect(json.variations).toHaveLength(2);
    expect(json.variations[0].direction).toBe("left");
    expect(json.variations[0].key.design.label.text).toBe("←");
    expect(json.variations[0].key.press_actions[0].text).toBe("←");
    expect(json.variations[1].direction).toBe("top");
    expect(json.variations[1].key.design.label.text).toBe("↑");
    expect(json.variations[1].key.press_actions[0].text).toBe(":up:");
  });

  test("CustardList serializes to array", () => {
    const custard1 = new Custard({
      identifier: "test1",
      inputStyle: InputStyle.Direct,
      interface: new Interface({
        keyLayout: Layout.gridFit({ columnCount: 1, rowCount: 1 }),
        keyStyle: KeyStyle.TenkeyStyle,
        keys: [],
      }),
      language: Language.JaJP,
      metadata: new Metadata({ custardVersion: "1.0", displayName: "Test1" }),
    });

    const custard2 = new Custard({
      identifier: "test2",
      inputStyle: InputStyle.Direct,
      interface: new Interface({
        keyLayout: Layout.gridFit({ columnCount: 1, rowCount: 1 }),
        keyStyle: KeyStyle.TenkeyStyle,
        keys: [],
      }),
      language: Language.EnUS,
      metadata: new Metadata({ custardVersion: "1.0", displayName: "Test2" }),
    });

    const list = new CustardList([custard1, custard2]);
    const json = list.toJSON();

    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(2);
    expect((json[0] as { identifier: string }).identifier).toBe("test1");
    expect((json[1] as { identifier: string }).identifier).toBe("test2");
  });
});
