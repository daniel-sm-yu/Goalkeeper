import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing } from "../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const FLATLIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DailyScreen: Component = observer(function DailyScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed" backgroundColor={color.background}>
      <Header headerText="Daily Goals" />
      <FlatList
        style={FLATLIST}
        data={require("./data.json").goals}
        renderItem={({ item }) => (
          <Bar
            text={item.text}
            color={item.color}
            current={item.current}
            target={item.target}
            onPress={() => console.log("pressed")}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Screen>
  )
})
