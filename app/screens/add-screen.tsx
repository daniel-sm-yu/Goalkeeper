import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Header, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"

export const AddScreen: Component = observer(function AddScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />

      <Text>what is your goal?</Text>
      <Text>how long?</Text>
      <Text>what color?</Text>
      <Text>add to daily?</Text>
    </Screen>
  )
})
