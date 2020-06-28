import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { spacing } from "../theme"
import { toJS } from "mobx"

const FLATLIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DailyScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed">
      <Header headerText="Today" />
      <FlatList
        style={FLATLIST}
        // data={require("./data.json").goals}
        data={goalStore.dailyGoals}
        renderItem={({ item }) => (
          <Bar
            active={item.id === goalStore.active}
            name={item.name}
            color={item.color}
            current={item.current}
            target={item.target}
            onPress={() => {
              goalStore.setActive(goalStore.active === item.id ? "" : item.id)
            }}
          />
        )}
        keyExtractor={item => item.id}
        extraData={toJS(goalStore)}
      />
    </Screen>
  )
})
