import { ViewStyle } from "react-native"
import { spacing } from "../../theme"

export const swiperStyles = {
  WRAPPER: {
    justifyContent: "center",
  } as ViewStyle,

  ICON: {
    marginHorizontal: spacing[3],
  },

  RIGHT_ACTION: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: spacing[3],
  } as ViewStyle,
}
