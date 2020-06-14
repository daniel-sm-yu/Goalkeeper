import { palette } from "./palette"

export const color = {
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: palette.black,
  /**
   * Primary text color.
   */
  textPrimary: "rgba(255, 255, 255, 0.87)",
  /**
   * Secondary text color.
   */
  textSecondary: "rgba(255, 255, 255, 0.60)",
  /**
   * Tertiary text color.
   */
  textTertiary: "rgba(255, 255, 255, 0.38)",
  /**
   * A selection option.
   */
  selected: palette.white,
  /**
   * An unselection option.
   */
  unselected: palette.lightGrey,
}
