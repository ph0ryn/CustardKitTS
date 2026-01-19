/**
 * Conversion target language for the keyboard.
 * @remarks
 * - `JaJP`: Japanese (日本語共通語)
 * - `EnUS`: English (アメリカ)
 * - `ElGR`: Greek (ギリシャ語)
 * - `Undefined`: No specific language. Conversion candidates are shown, useful for symbol input.
 * - `None`: No conversion.
 */
export enum Language {
  /** English (United States) */
  EnUS = "en_US",
  /** Japanese (Japan) */
  JaJP = "ja_JP",
  /** Greek */
  ElGR = "el_GR",
  /** No conversion */
  None = "none",
  /** Undefined - conversion candidates shown but no specific language */
  Undefined = "undefined",
}

/**
 * Input style for the keyboard.
 * @remarks
 * - `Direct`: Input is used as-is.
 * - `Roman2Kana`: Roman-to-kana conversion is performed.
 */
export enum InputStyle {
  /** Input is used directly without conversion */
  Direct = "direct",
  /** Roman-to-kana input conversion is applied */
  Roman2Kana = "roman2kana",
}

/**
 * Key style that tells the system how to handle keys.
 * @remarks
 * - `TenkeyStyle`: For 10-key style keyboards like flick input or mobile-style kana input.
 *   - Only `flickVariation` is effective.
 *   - Vertical spacing is narrower.
 *   - Suggestions appear on long press, showing the key and flick variations.
 * - `PcStyle`: For PC-style keyboards like QWERTY layout.
 *   - Only `longpressVariation` is effective.
 *   - Vertical spacing is wider.
 *   - Suggestions appear on press, and longpress variations appear on continued press.
 */
export enum KeyStyle {
  /** Tenkey (10-key) style for flick input keyboards */
  TenkeyStyle = "tenkey_style",
  /** PC style for QWERTY-like keyboards */
  PcStyle = "pc_style",
}

/**
 * Color of a key.
 * @remarks
 * azooKey supports theming, so actual colors depend on the user's theme.
 */
export enum KeyColor {
  /** Normal input key color */
  Normal = "normal",
  /** Special key color (tab change, delete, etc.) */
  Special = "special",
  /** Selected state color (active tab, pressed key) */
  Selected = "selected",
  /** Less important key color */
  Unimportant = "unimportant",
}

/**
 * Direction for flick variations.
 */
export enum FlickDirection {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

/**
 * System key types provided by azooKey.
 * @remarks
 * - `ChangeKeyboard`: Globe key (keyboard switch). Changes to cursor bar on devices without home button.
 * - `Enter`: Enter/confirm key.
 * - `UpperLower`: Upper/lower case toggle key.
 * - `NextCandidate`: Toggles between "space" and "next candidate" based on input state.
 * - `FlickKogaki`: User-customizable flick "小ﾞﾟ" key (recommended only for grid_fit + tenkey_style).
 * - `FlickKutoten`: User-customizable flick "､｡?!" key (recommended only for grid_fit + tenkey_style).
 * - `FlickHiraTab`: User-customizable flick "あいう" key (recommended only for grid_fit + tenkey_style).
 * - `FlickAbcTab`: User-customizable flick "abc" key (recommended only for grid_fit + tenkey_style).
 * - `FlickStar123Tab`: User-customizable flick "☆123" key (recommended only for grid_fit + tenkey_style).
 */
export enum SystemKeyType {
  /** Globe key for keyboard switching */
  ChangeKeyboard = "change_keyboard",
  /** Enter/confirm key */
  Enter = "enter",
  /** Upper/lower case toggle */
  UpperLower = "upper_lower",
  /** Space or next candidate toggle */
  NextCandidate = "next_candidate",
  /** Flick kogaki (小ﾞﾟ) key */
  FlickKogaki = "flick_kogaki",
  /** Flick kutoten (､｡?!) key */
  FlickKutoten = "flick_kutoten",
  /** Flick hiragana tab key */
  FlickHiraTab = "flick_hira_tab",
  /** Flick ABC tab key */
  FlickAbcTab = "flick_abc_tab",
  /** Flick star/123 tab key */
  FlickStar123Tab = "flick_star123_tab",
}

/**
 * System tab types for tab navigation.
 * @remarks
 * - `UserJapanese`: Japanese tab based on user settings.
 * - `UserEnglish`: English tab based on user settings.
 * - `FlickJapanese`: Flick input Japanese tab.
 * - `FlickEnglish`: Flick input English tab.
 * - `FlickNumberSymbols`: Flick input numbers/symbols tab.
 * - `QwertyJapanese`: QWERTY Japanese tab.
 * - `QwertyEnglish`: QWERTY English tab.
 * - `QwertyNumbers`: QWERTY numbers tab.
 * - `QwertySymbols`: QWERTY symbols tab.
 * - `EmojiTab`: Emoji tab.
 * - `ClipboardHistoryTab`: Clipboard history tab (requires full access).
 * - `LastTab`: Previous tab (current tab if no history).
 */
export enum SystemTabType {
  /** User-configured Japanese tab */
  UserJapanese = "user_japanese",
  /** User-configured English tab */
  UserEnglish = "user_english",
  /** Flick input Japanese tab */
  FlickJapanese = "flick_japanese",
  /** Flick input English tab */
  FlickEnglish = "flick_english",
  /** Flick input numbers/symbols tab */
  FlickNumberSymbols = "flick_numbersymbols",
  /** QWERTY Japanese tab */
  QwertyJapanese = "qwerty_japanese",
  /** QWERTY English tab */
  QwertyEnglish = "qwerty_english",
  /** QWERTY numbers tab */
  QwertyNumbers = "qwerty_numbers",
  /** QWERTY symbols tab */
  QwertySymbols = "qwerty_symbols",
  /** Previous tab */
  LastTab = "last_tab",
  /** Clipboard history tab (requires full access) */
  ClipboardHistoryTab = "clipboard_history_tab",
  /** Emoji tab */
  EmojiTab = "emoji_tab",
}

/**
 * Direction for smart delete/move cursor operations.
 */
export enum ScanDirection {
  /** Forward (towards end of text) */
  Forward = "forward",
  /** Backward (towards beginning of text) */
  Backward = "backward",
}

/**
 * Replace behavior types for replaceDefault action.
 */
export enum ReplaceType {
  /** Default replacement */
  Default = "default",
  /** Dakuten (濁点) replacement */
  Dakuten = "dakuten",
  /** Handakuten (半濁点) replacement */
  Handakuten = "handakuten",
  /** Kogaki (小書き) replacement */
  Kogaki = "kogaki",
}

/**
 * Character forms for completeCharacterForm action.
 */
export enum CharacterForm {
  /** Hiragana */
  Hiragana = "hiragana",
  /** Katakana */
  Katakana = "katakana",
  /** Half-width katakana */
  HalfwidthKatakana = "halfwidth_katakana",
  /** Uppercase */
  Uppercase = "uppercase",
  /** Lowercase */
  Lowercase = "lowercase",
}

/**
 * Duration before long press is recognized.
 */
export enum LongpressDuration {
  /** Normal (default) duration */
  Normal = "normal",
  /** Shorter duration for faster action */
  Light = "light",
}

/**
 * Scroll direction for grid_scroll layout.
 */
export enum ScrollDirection {
  /** Horizontal scrolling */
  Horizontal = "horizontal",
  /** Vertical scrolling */
  Vertical = "vertical",
}
