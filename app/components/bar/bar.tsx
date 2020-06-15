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

const getOpacity = completion => {
  if (completion === 0) {
    return "00"
  } else if (completion < 3) {
    return "30"
  } else if (completion < 7) {
    return "60"
  } else if (completion < 11) {
    return "90"
  } else if (completion < 15) {
    return "B0"
  } else {
    return "CD"
  }
}

export class Bar extends React.Component<BarProps> {
  animation: Animated.Value

  constructor(props) {
    super(props)
    this.animation = new Animated.Value(Math.max(this.props.current / this.props.target, 0.17))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      Animated.timing(this.animation, {
        toValue: Math.max(this.props.current / this.props.target, 0.17),
        duration: 3000,
      }).start()
    }
  }

  render() {
    const { text, color, current, target, onPress } = this.props

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
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
        <Animated.View
          style={{
            ...styles.BAR,
            backgroundColor: getColor(color) + getOpacity((100 * current) / target),
            width: widthInterpolated,
          }}
        />
        <Text preset="bar" style={styles.TEXT}>
          {text} {(100 * current) / target}%
        </Text>
      </Ripple>
    )
  }
}
