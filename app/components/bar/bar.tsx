import * as React from "react"
import { View } from "react-native"
import { Text } from "../"
import { barStyles as styles } from "./bar.styles"
import { getColor, dimensions } from "../../theme"
import Ripple from "react-native-material-ripple" // https://www.npmjs.com/package/react-native-material-ripple

export interface BarProps {
  text: string
  color: string
  onPress
}

export function Bar(props: BarProps) {
  const { text, color, onPress } = props

  return (
    <Ripple
      rippleColor={getColor(color)}
      rippleOpacity={0.5}
      rippleDuration={750}
      rippleContainerBorderRadius={dimensions.bar.borderRadius}
      onPress={onPress}
    >
      <View style={styles.CONTAINER}>
        <Text>{text}</Text>
      </View>
    </Ripple>
  )
}
