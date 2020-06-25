import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { spacing } from "../theme"

const FLATLIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DailyScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed">
      <Header headerText="Daily Goals" />
      <FlatList
        style={FLATLIST}
        // data={require("./data.json").goals}
        data={goalStore.dailyGoals}
        renderItem={({ item }) => (
          <Bar
            active={item.id === goalStore.active}
            text={item.name}
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
