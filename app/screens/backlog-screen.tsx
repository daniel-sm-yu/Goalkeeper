import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import FAB from "react-native-fab"
import { AntDesign } from "@expo/vector-icons"
import { Screen, Header, Text } from "../components"
import { color } from "../theme"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const BacklogScreen: Component = observer(function BacklogScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText="All Goals" />

      <FAB
        buttonColor={color.palette.red}
        iconTextColor={color.palette.white}
        onClickAction={() => navigation.navigate("add")}
        iconTextComponent={<AntDesign name="plus" />}
      />
    </Screen>
  )
})
