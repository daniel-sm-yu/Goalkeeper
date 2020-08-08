import { ViewStyle, TextStyle } from "react-native"
import { dimensions, color, spacing } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    justifyContent: "center",
    marginVertical: spacing[5],
    marginHorizontal: spacing[4],
    backgroundColor: color.palette.grey,
  } as ViewStyle,

  BAR: {
    minWidth: 64,
    height: "100%",
    position: "absolute",
    borderRadius: dimensions.bar.borderRadius,
  } as ViewStyle,

  TEXT: {
    width: "100%",
    textAlign: "right",
    paddingHorizontal: spacing[5],
  } as TextStyle,
}
