import { describe, expect, test } from "@jest/globals";

import {
  InvalidIdentifierError,
  InvalidKeyPositionError,
  Interface,
  KeyStyle,
  Language,
  LayoutSpecifierMismatchError,
  Metadata,
  InputStyle,
} from "../src/index.ts";
import { SystemKey } from "../src/Keys/index.ts";
import { GridFitSpecifier, GridScrollSpecifier, KeyData, Layout } from "../src/Layout/index.ts";
import { SystemKeyType } from "../src/enums.ts";
import { Custard } from "../src/Custard/index.ts";

describe("validation", () => {
  test("Custard throws on invalid identifier", () => {
    const createCustard = (identifier: string) =>
      new Custard({
        identifier,
        inputStyle: InputStyle.Direct,
        interface: new Interface({
          keyLayout: Layout.gridFit({ columnCount: 1, rowCount: 1 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [],
        }),
        language: Language.JaJP,
        metadata: new Metadata({ custardVersion: "1.0", displayName: "Test" }),
      });

    // Valid identifiers should work
    expect(() => createCustard("valid_identifier")).not.toThrow();
    expect(() => createCustard("test123")).not.toThrow();

    // Invalid identifiers should throw
    expect(() => createCustard("Invalid")).toThrow(InvalidIdentifierError);
    expect(() => createCustard("has-dash")).toThrow(InvalidIdentifierError);
    expect(() => createCustard("has space")).toThrow(InvalidIdentifierError);
    expect(() => createCustard("日本語")).toThrow(InvalidIdentifierError);
  });

  test("Interface throws on key position out of bounds", () => {
    // Valid position: x=0, y=0 in 2x2 grid
    expect(
      () =>
        new Interface({
          keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [
            new KeyData({
              key: new SystemKey(SystemKeyType.ChangeKeyboard),
              specifier: new GridFitSpecifier({ x: 0, y: 0 }),
            }),
          ],
        }),
    ).not.toThrow();

    // Invalid position: x=2 exceeds columnCount=2
    expect(
      () =>
        new Interface({
          keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [
            new KeyData({
              key: new SystemKey(SystemKeyType.ChangeKeyboard),
              specifier: new GridFitSpecifier({ x: 2, y: 0 }),
            }),
          ],
        }),
    ).toThrow(InvalidKeyPositionError);

    // Invalid position: width causes overflow
    expect(
      () =>
        new Interface({
          keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [
            new KeyData({
              key: new SystemKey(SystemKeyType.ChangeKeyboard),
              specifier: new GridFitSpecifier({ height: 1, width: 3, x: 0, y: 0 }),
            }),
          ],
        }),
    ).toThrow(InvalidKeyPositionError);

    // Invalid position: negative x
    expect(
      () =>
        new Interface({
          keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [
            new KeyData({
              key: new SystemKey(SystemKeyType.ChangeKeyboard),
              specifier: new GridFitSpecifier({ x: -1, y: 0 }),
            }),
          ],
        }),
    ).toThrow(InvalidKeyPositionError);
  });

  test("Interface throws on Layout/Specifier type mismatch", () => {
    expect(
      () =>
        new Interface({
          keyLayout: Layout.gridFit({ columnCount: 2, rowCount: 2 }),
          keyStyle: KeyStyle.TenkeyStyle,
          keys: [
            new KeyData({
              key: new SystemKey(SystemKeyType.ChangeKeyboard),
              specifier: new GridScrollSpecifier({ index: 0 }),
            }),
          ],
        }),
    ).toThrow(LayoutSpecifierMismatchError);
  });

  test("Layout throws on invalid rowCount/columnCount", () => {
    expect(() => Layout.gridFit({ columnCount: 0, rowCount: 2 })).toThrow();
    expect(() => Layout.gridFit({ columnCount: 2, rowCount: 0 })).toThrow();
    expect(() => Layout.gridFit({ columnCount: -1, rowCount: 2 })).toThrow();
  });

  test("GridFitSpecifier throws on invalid width/height", () => {
    expect(() => new GridFitSpecifier({ height: 0, width: 1, x: 0, y: 0 })).toThrow();
    expect(() => new GridFitSpecifier({ height: 1, width: 0, x: 0, y: 0 })).toThrow();
    expect(() => new GridFitSpecifier({ height: -1, width: 1, x: 0, y: 0 })).toThrow();
  });

  test("Metadata throws on empty displayName", () => {
    expect(() => new Metadata({ custardVersion: "1.0", displayName: "" })).toThrow();
    expect(() => new Metadata({ custardVersion: "1.0", displayName: "Valid" })).not.toThrow();
  });
});
