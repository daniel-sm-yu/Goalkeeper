import React, { FunctionComponent as Component } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: spacing[4],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "right" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: spacing[2] }
const RIGHT: ViewStyle = { width: spacing[2] }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: Component<HeaderProps> = props => {
  const { onLeftPress, onRightPress, rightIcon, leftIcon, headerText, style, titleStyle } = props

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text preset="header" style={{ ...TITLE, ...titleStyle }} text={headerText} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
