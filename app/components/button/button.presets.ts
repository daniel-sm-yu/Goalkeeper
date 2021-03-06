import { ViewStyle, TextStyle } from "react-native"
import { color, spacing, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  fontFamily: typography.medium,
  fontSize: 20,
  color: color.textPrimary,
  paddingHorizontal: spacing[3],
}

export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.grey } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.palette.white,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
