import { ViewStyle } from "react-native"
import { dimensions, color, spacing } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    justifyContent: "center",
    marginVertical: spacing[3],
    backgroundColor: color.palette.offWhite,
  } as ViewStyle,
}
