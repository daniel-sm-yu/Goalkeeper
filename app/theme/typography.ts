import { Platform } from "react-native"

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  bold: Platform.select({ ios: "Gilroy-Bold", android: "Gilroy-Bold" }),
  medium: Platform.select({ ios: "Gilroy-Medium", android: "Gilroy-Medium" }),
  regular: Platform.select({ ios: "Gilroy-Regular", android: "Gilroy-Regular" }),
  light: Platform.select({ ios: "Gilroy-Light", android: "Gilroy-Light" }),
}
