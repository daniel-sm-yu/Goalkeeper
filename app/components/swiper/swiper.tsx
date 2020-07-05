import * as React from "react"
import { Animated } from "react-native"
import { swiperStyles as styles } from "./swiper.styles"

import { RectButton } from "react-native-gesture-handler"

import Swipeable from "react-native-gesture-handler/Swipeable"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRef } from "react"

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons)

export interface SwiperProps {
  children
}

export function Swiper(props: SwiperProps) {
  // grab the props
  const { children } = props

  const swipeableRow = useRef()

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    })
    return (
      <RectButton style={styles.leftAction} onPress={swipeableRow.close}>
        <AnimatedIcon
          name="archive"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    )
  }
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    })
    return (
      <RectButton style={styles.rightAction} onPress={swipeableRow.close}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    )
  }

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  )
}
