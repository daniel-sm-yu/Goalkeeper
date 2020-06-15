import { ViewStyle, TextStyle } from "react-native"
import { dimensions, color, spacing } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    justifyContent: "center",
    marginVertical: spacing[3],
    elevation: 2,
    backgroundColor: color.palette.grey,
  } as ViewStyle,

  BAR: {
    minWidth: 64,
    height: "100%",
    position: "absolute",
    borderRadius: dimensions.bar.borderRadius,
  } as ViewStyle,

  TEXT: {
    textAlign: "right",
    paddingHorizontal: spacing[5],
  } as TextStyle,
}
