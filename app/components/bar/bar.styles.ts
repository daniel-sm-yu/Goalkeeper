import { ViewStyle } from "react-native"
import { dimensions, color, spacing } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    flexDirection: "row",
    marginVertical: spacing[3],
    elevation: 2,
    backgroundColor: color.palette.grey,
  } as ViewStyle,

  BAR: {
    height: "100%",
    position: "absolute",
    borderRadius: dimensions.bar.borderRadius,
  } as ViewStyle,
}
