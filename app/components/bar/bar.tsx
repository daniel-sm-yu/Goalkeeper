import * as React from "react"
import { View, Animated, StyleSheet } from "react-native"
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

export class Bar extends React.Component<BarProps> {
  animation: Animated.Value

  constructor(props) {
    super(props)
    this.animation = new Animated.Value(this.props.current / this.props.target)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      Animated.timing(this.animation, {
        toValue: this.props.current / this.props.target,
        duration: 3000,
      }).start()
    }
  }

  render() {
    const { text, color, target, current, onPress } = this.props

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["10%", "100%"],
      extrapolate: "clamp",
    })

    return (
      <Ripple
        rippleColor={getColor(color)}
        rippleOpacity={1}
        rippleDuration={750}
        rippleContainerBorderRadius={dimensions.bar.borderRadius}
        onPress={onPress}
        style={styles.CONTAINER}
      >
        <View style={[StyleSheet.absoluteFill, styles.EMPTY_BAR]} />
        <Animated.View
          style={{
            ...styles.BAR,
            backgroundColor: getColor(color) + "CD",
            width: widthInterpolated,
          }}
        />
        <Text>
          {text} {(100 * current) / target}%
        </Text>
      </Ripple>
    )
  }
}
