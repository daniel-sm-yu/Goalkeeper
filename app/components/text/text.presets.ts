import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.regular,
  color: color.textPrimary,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * The text inside Bar components.
   */
  header: {
    ...BASE,
    fontFamily: typography.bold,
    fontSize: 36,
  } as TextStyle,

  /**
   * The text inside Bar components.
   */
  bar: { ...BASE, fontFamily: typography.semibold, color: color.textSecondary } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
