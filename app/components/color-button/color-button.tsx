import * as React from "react"
import { colorButtonStyles as styles } from "./color-button.styles"
import { getColor, dimensions } from "../../theme"
import Ripple from "react-native-material-ripple"

export interface ColorButtonProps {
  color: string
  selected: boolean
  onPress
}

export function ColorButton(props: ColorButtonProps) {
  const { color, selected, onPress } = props

  const colorStyle = { backgroundColor: getColor(color) + "CD" }
  const selectedStyle = selected ? { borderWidth: 4, borderColor: getColor(color) } : {}

  return (
    <Ripple
      style={[styles.CONTAINER, colorStyle, selectedStyle]}
      rippleColor={getColor(color)}
      rippleOpacity={1}
      rippleDuration={500}
      rippleContainerBorderRadius={dimensions.colorButton.borderRadius}
      onPress={onPress}
    ></Ripple>
  )
}
