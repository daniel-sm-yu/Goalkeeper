import { Platform } from "react-native"

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  bold: Platform.select({ ios: "Montserrat-Bold", android: "Montserrat-Bold" }),
  semibold: Platform.select({ ios: "Montserrat-SemiBold", android: "Montserrat-SemiBold" }),
  medium: Platform.select({ ios: "Montserrat-Medium", android: "Montserrat-Medium" }),
  regular: Platform.select({ ios: "Montserrat-Regular", android: "Montserrat-Regular" }),
  light: Platform.select({ ios: "Montserrat-Light", android: "Montserrat-Light" }),
}
