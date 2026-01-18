// =============================================================================
// Enums
// =============================================================================

export enum Language {
  EnUS = "en_US",
  JaJP = "ja_JP",
  ElGR = "el_GR",
  None = "none",
  Undefined = "undefined",
}

export enum InputStyle {
  Direct = "direct",
  Roman2Kana = "roman2kana",
}

export enum KeyStyle {
  TenkeyStyle = "tenkey_style",
  PcStyle = "pc_style",
}

export enum KeyColor {
  Normal = "normal",
  Special = "special",
  Selected = "selected",
  Unimportant = "unimportant",
}

export enum FlickDirection {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export enum SystemKeyType {
  ChangeKeyboard = "change_keyboard",
  Enter = "enter",
  UpperLower = "upper_lower",
  NextCandidate = "next_candidate",
  FlickKogaki = "flick_kogaki",
  FlickKutoten = "flick_kutoten",
  FlickHiraTab = "flick_hira_tab",
  FlickAbcTab = "flick_abc_tab",
  FlickStar123Tab = "flick_star123_tab",
}

export enum SystemTabType {
  UserJapanese = "user_japanese",
  UserEnglish = "user_english",
  FlickJapanese = "flick_japanese",
  FlickEnglish = "flick_english",
  FlickNumberSymbols = "flick_numbersymbols",
  QwertyJapanese = "qwerty_japanese",
  QwertyEnglish = "qwerty_english",
  QwertyNumbers = "qwerty_numbers",
  QwertySymbols = "qwerty_symbols",
  LastTab = "last_tab",
  ClipboardHistoryTab = "clipboard_history_tab",
  EmojiTab = "emoji_tab",
}

export enum ScanDirection {
  Forward = "forward",
  Backward = "backward",
}

export enum ReplaceType {
  Default = "default",
  Dakuten = "dakuten",
  Handakuten = "handakuten",
  Kogaki = "kogaki",
}

export enum CharacterForm {
  Hiragana = "hiragana",
  Katakana = "katakana",
  HalfwidthKatakana = "halfwidth_katakana",
  Uppercase = "uppercase",
  Lowercase = "lowercase",
}

export enum LongpressDuration {
  Normal = "normal",
  Light = "light",
}

export enum ScrollDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}
