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
   * The status bar.
   */
  statusBar: palette.black,
  /**
   * Primary text color.
   */
  textPrimary: palette.white,
  /**
   * Secondary text color.
   */
  textSecondary: palette.white + "DE",
  /**
   * Tertiary text color.
   */
  textTertiary: palette.white + "99",
  /**
   * An error.
   */
  error: palette.red,
  /**
   * An active tab.
   */
  active: palette.white,
  /**
   * An inactive tab.
   */
  inactive: palette.lightGrey,
}

export const getColor = color => {
  switch (color) {
    case "blue":
      return palette.blue
    case "green":
      return palette.green
    case "pink":
      return palette.pink
    case "yellow":
      return palette.yellow
    case "purple":
      return palette.purple
    case "orange":
      return palette.orange
    default:
      return palette.lightGrey
  }
}
