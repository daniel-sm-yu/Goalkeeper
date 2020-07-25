import * as React from "react"
import { Animated } from "react-native"
import { Text } from "../"
import { barStyles as styles } from "./bar.styles"
import { getColor, getBackgroundColor, dimensions } from "../../theme"
import Ripple from "react-native-material-ripple" // https://www.npmjs.com/package/react-native-material-ripple

export interface BarProps {
  isActive: boolean
  isDragging: boolean
  name: string
  color: string
  target: number
  current: number
  onPress
  onLongPress
}

const getOpacity = completion => {
  if (completion === 0) {
    return "00"
  } else if (completion < 2) {
    return "52"
  } else if (completion < 4) {
    return "61"
  } else if (completion < 6) {
    return "70"
  } else if (completion < 8) {
    return "80"
  } else if (completion < 10) {
    return "8F"
  } else if (completion < 12) {
    return "9E"
  } else if (completion < 14) {
    return "AD"
  } else if (completion < 16) {
    return "BD"
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
        duration: 6000,
      }).start()
    }
  }

  render() {
    const { isActive, isDragging, name, color, current, target, onPress, onLongPress } = this.props

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    })

    const activeStyle = isActive ? { backgroundColor: getBackgroundColor(color) } : {}
    const draggingStyle = isDragging ? { elevation: 4, borderColor: getColor(color) + "55" } : {}

    return (
      <Ripple
        style={[styles.CONTAINER, activeStyle, draggingStyle]}
        rippleColor={getColor(color)}
        rippleOpacity={1}
        rippleDuration={750}
        rippleContainerBorderRadius={dimensions.bar.borderRadius}
        onPress={onPress}
        onLongPress={onLongPress}
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
