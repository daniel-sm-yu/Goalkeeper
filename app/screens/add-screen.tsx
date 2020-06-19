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
  paddingHorizontal: spacing[6],
} as ViewStyle

const INPUT = {
  containerStyle: {
    paddingHorizontal: spacing[0],
  } as ViewStyle,

  inputContainerStyle: {
    borderColor: color.palette.grey,
  } as ViewStyle,

  errorStyle: {
    fontSize: 16,
    color: color.error,
    marginTop: spacing[0],
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
        <Input {...INPUT} value={name} onChangeText={setName} errorMessage={nameError} />
        <Text>how long?</Text>
        <Text>what color?</Text>
        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
