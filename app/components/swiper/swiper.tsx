import * as React from "react"
import { View } from "react-native"
import { swiperStyles as styles } from "./swiper.styles"
import { color } from "../../theme"

import Swipeable from "react-native-gesture-handler/Swipeable"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

export interface SwiperProps {
  children
  onSwipeableRightOpen
}

export function Swiper(props: SwiperProps) {
  // grab the props
  const { children, onSwipeableRightOpen } = props

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.RIGHT_ACTION}>
        <MaterialCommunityIcons
          name="delete"
          size={30}
          color={color.textPrimary}
          style={styles.ICON}
        />
        <MaterialIcons name="edit" size={30} color={color.textPrimary} style={styles.ICON} />
        <MaterialCommunityIcons
          name="close"
          size={30}
          color={color.textPrimary}
          style={styles.ICON}
        />
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions} onSwipeableRightOpen={onSwipeableRightOpen}>
      {children}
    </Swipeable>
  )
}
