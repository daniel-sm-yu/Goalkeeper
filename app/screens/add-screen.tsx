import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { Screen, Header, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing, typography } from "../theme"

const CONTAINER = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[5],
} as ViewStyle

const INPUT = {
  // container:
  height: 64,
  borderRadius: 12,
  borderWidth: 0.25,
  borderColor: color.textTertiary,
  marginVertical: spacing[3],
  paddingHorizontal: spacing[3],
  // text:
  color: color.textPrimary,
  fontFamily: typography.light,
  fontSize: 32,
}

export const AddScreen: Component = observer(function AddScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [name, setName] = React.useState("")

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />

      <View style={CONTAINER}>
        <Text preset="form">I will </Text>
        <TextInput
          style={INPUT}
          value={name}
          onChangeText={setName}
          autoFocus
          autoCapitalize="none"
          caretHidden
          selectionColor={color.palette.grey}
        />
        <Text preset="form">for </Text>

        {/* add another textinput with number keyboard,
        chain inputs: https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar */}

        <Text>what color?</Text>
        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
