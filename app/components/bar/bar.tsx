import * as React from "react"
import { View, Animated } from "react-native"
import { Text } from "../"
import { barStyles as styles } from "./bar.styles"
import { getColor, dimensions } from "../../theme"
import Ripple from "react-native-material-ripple" // https://www.npmjs.com/package/react-native-material-ripple

export interface BarProps {
  text: string
  color: string
  target: number
  current: number
  onPress
}

export function Bar(props: BarProps) {
  const { text, color, target, current, onPress } = props

  return (
    <Ripple
      rippleColor={getColor(color)}
      rippleOpacity={0.5}
      rippleDuration={750}
      rippleContainerBorderRadius={dimensions.bar.borderRadius}
      onPress={onPress}
      style={styles.CONTAINER}
    >
      <Text>
        {text} {(100 * current) / target}%
      </Text>
    </Ripple>
  )
}
