import * as React from "react"
import { View } from "react-native"
import { swiperStyles as styles } from "./swiper.styles"
import { color } from "../../theme"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

export interface SwiperProps {
  children
  onEdit
  onDelete
}

export function Swiper(props: SwiperProps) {
  // grab the props
  const { children, onEdit, onDelete } = props

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.RIGHT_ACTION}>
        <MaterialIcons
          name="edit"
          size={30}
          color={color.textPrimary}
          style={styles.ICON}
          onPress={onEdit}
        />
        <MaterialCommunityIcons
          name="delete"
          size={30}
          color={color.textPrimary}
          style={styles.ICON}
          onPress={onDelete}
        />
      </View>
    )
  }

  return <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
}
