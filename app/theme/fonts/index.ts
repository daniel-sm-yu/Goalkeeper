import * as Font from "expo-font"

export const initFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Bold": require("./Gilroy-Bold.ttf"),
    "Gilroy-Medium": require("./Gilroy-Medium.ttf"),
    "Gilroy-Regular": require("./Gilroy-Regular.ttf"),
    "Gilroy-Light": require("./Gilroy-Light.ttf"),
  })
}
