import * as React from "react"
import { View, TouchableHighlight } from "react-native"
import { Text } from "../"
import { barStyles as styles } from "./bar.styles"
import { color, getColor } from "../../theme"

export interface BarProps {
  text: string
  color: string
  onPress?
}

export function Bar(props: BarProps) {
  const { text, color, onPress } = props

  return (
    <TouchableHighlight style={styles.CONTAINER} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableHighlight>
  )
}
