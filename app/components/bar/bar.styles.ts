import { ViewStyle } from "react-native"
import { dimensions, color } from "../../theme"

export const barStyles = {
  CONTAINER: {
    ...dimensions.bar,
    justifyContent: "center",
    backgroundColor: color.palette.offWhite,
  } as ViewStyle,
}
