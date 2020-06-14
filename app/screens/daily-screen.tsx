import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Bar } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const DailyScreen: Component = observer(function DailyScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll" backgroundColor={color.background}>
      <Bar text="test" color="purple" onPress={() => console.log("pressed")} />
      <Bar text="test" color="green" onPress={() => console.log("pressed")} />
      <Bar text="test" color="blue" onPress={() => console.log("pressed")} />
      <Bar text="test" color="pink" onPress={() => console.log("pressed")} />
      <Bar text="test" color="yellow" onPress={() => console.log("pressed")} />
      <Bar text="test" color="orange" onPress={() => console.log("pressed")} />
      <Bar text="test" color="d" onPress={() => console.log("pressed")} />
    </Screen>
  )
})
