import * as Font from "expo-font"

export const initFonts = async () => {
  await Font.loadAsync({
    "Montserrat-Bold": require("./Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("./Montserrat-SemiBold.ttf"),
    "Montserrat-Medium": require("./Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./Montserrat-Regular.ttf"),
    "Montserrat-Light": require("./Montserrat-Light.ttf"),
  })
}
