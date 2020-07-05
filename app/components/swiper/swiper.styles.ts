import { ViewStyle } from "react-native"

export const swiperStyles = {
  WRAPPER: {
    justifyContent: "center",
  } as ViewStyle,
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  } as ViewStyle,
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  } as ViewStyle,
}
