import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Input } from "react-native-elements"
import { Screen, Header, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing } from "../theme"

const CONTAINER = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[5],
} as ViewStyle

const INPUT = {
  containerStyle: {
    marginTop: spacing[3],
    marginBottom: 0,
    paddingHorizontal: spacing[0],
    // backgroundColor: "yellow",
  } as ViewStyle,

  inputContainerStyle: {
    borderRadius: 12,
    borderWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: color.textTertiary,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  } as ViewStyle,

  inputStyle: {
    fontSize: 32,
    color: color.textPrimary,
  } as TextStyle,

  errorStyle: {
    height: 0,
  } as TextStyle,
}

export const AddScreen: Component = observer(function AddScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [name, setName] = React.useState("")
  const [nameError, setNameEror] = React.useState("")

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />

      <View style={CONTAINER}>
        <Text preset="form">I will </Text>
        <Input
          {...INPUT}
          placeholderTextColor={color.textTertiary}
          value={name}
          onChangeText={setName}
          errorMessage={nameError}
          // multiline
          autoFocus
          autoCapitalize="none"
          caretHidden
          selectionColor={color.palette.grey}
        />
        <Text preset="form">for </Text>

        <Text>what color?</Text>
        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
