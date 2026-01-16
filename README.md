# CustardKitTS

TypeScript implementation of [CustardKit](https://github.com/azooKey/CustardKit)

## Installation

```bash
npm add custardkit-ts
```

## Usage

```typescript
import {
  Custard,
  Interface,
  Metadata,
  GridFitLayout,
  GridFitSpecifier,
  KeyData,
  CustomKey,
  KeyDesign,
  TextLabel,
  InputAction,
  Language,
  InputStyle,
  KeyStyle,
  KeyColor,
} from "custardkit-ts";

// Create a simple key
const key = new CustomKey({
  design: new KeyDesign({
    label: new TextLabel("あ"),
    color: KeyColor.Normal,
  }),
  pressActions: [new InputAction("あ")],
  variations: [],
});

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
    keyLayout: new GridFitLayout({ rowCount: 5, columnCount: 4 }),
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
