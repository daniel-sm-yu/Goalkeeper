import { ViewStyle } from "react-native"
import { dimensions, color, spacing } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    flexDirection: "row",
    marginVertical: spacing[3],
  } as ViewStyle,

  EMPTY_BAR: {
    borderRadius: dimensions.bar.borderRadius,
    backgroundColor: color.palette.grey,
  } as ViewStyle,

  BAR: {
    height: "100%",
    position: "absolute",
    borderRadius: dimensions.bar.borderRadius - 1,
  } as ViewStyle,
}
