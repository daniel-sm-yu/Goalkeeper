import * as React from "react"
import { Animated } from "react-native"
import { Text } from "../"
import { barStyles as styles } from "./bar.styles"
import { getColor, dimensions } from "../../theme"
import Ripple from "react-native-material-ripple" // https://www.npmjs.com/package/react-native-material-ripple

export interface BarProps {
  active: boolean
  name: string
  color: string
  target: number
  current: number
  onPress
}

const getOpacity = completion => {
  if (completion === 0) {
    return "00"
  } else if (completion < 3) {
    return "70"
  } else if (completion < 7) {
    return "85"
  } else if (completion < 11) {
    return "A0"
  } else if (completion < 15) {
    return "B5"
  } else {
    return "CD"
  }
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
    const { active, name, color, current, target, onPress } = this.props

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    })

    const activeStyle = active ? { backgroundColor: getColor(color) + "3D" } : {}
    const completedStyle = current >= target ? { borderWidth: 6, borderColor: getColor(color) } : {}

    return (
      <Ripple
        style={[styles.CONTAINER, activeStyle, completedStyle]}
        rippleColor={getColor(color)}
        rippleOpacity={1}
        rippleDuration={750}
        rippleContainerBorderRadius={dimensions.bar.borderRadius}
        onPress={onPress}
      >
        <Animated.View
          style={{
            ...styles.BAR,
            backgroundColor: getColor(color) + getOpacity((100 * current) / target),
            width: widthInterpolated,
          }}
        />
        <Text preset="bar" style={styles.TEXT} numberOfLines={2} ellipsizeMode="middle">
          {name} for{target / 60 < 1 ? "" : ` ${Math.floor(target / 60)} h`}
          {target % 60 === 0 ? "" : ` ${target % 60} m`}
        </Text>
      </Ripple>
    )
  }
}
