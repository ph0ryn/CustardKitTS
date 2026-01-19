# CustardKitTS

TypeScript implementation of [CustardKit](https://github.com/azooKey/CustardKit)

## Features

- **Type Safety**: Fully typed with TypeScript, ensuring autocomplete and compile-time error checking.
- **Runtime Validation**: Validates inputs at runtime to prevent invalid keyboard configurations.
- **Direct Serialization**: Classes support direct JSON serialization via `JSON.stringify()`.

## Installation

```bash
npm add custardkit-ts
```

## Usage

```typescript
import { Custard, Interface, Metadata, InputStyle, KeyStyle, Language } from "custardkit-ts";
import { CustomKey, KeyDesign } from "custardkit-ts/Keys";
import { Action } from "custardkit-ts/Actions";
import { Layout, KeyData, GridFitSpecifier } from "custardkit-ts/Layout";

// Create a simple key using factory methods
const key = new CustomKey({
  design: KeyDesign.text("あ"),
  pressActions: [Action.input("あ")],
});

// Create flick-style key
const flickKey = CustomKey.flickSimpleInputs("あ", ["い", "う", "え", "お"]);

// Create the custard
const custard = new Custard({
  identifier: "my_keyboard",
  language: Language.JaJP,
  inputStyle: InputStyle.Direct,
  metadata: new Metadata({
    custardVersion: "1.2",
    displayName: "My Keyboard",
  }),
  interface: new Interface({
    keyStyle: KeyStyle.TenkeyStyle,
    keyLayout: Layout.gridFit({ rowCount: 5, columnCount: 4 }),
    keys: [
      new KeyData({
        specifier: new GridFitSpecifier({ x: 0, y: 0 }),
        key: key,
      }),
    ],
  }),
});

// Write to file
await custard.write("my_keyboard.json");
```

## License

MIT
