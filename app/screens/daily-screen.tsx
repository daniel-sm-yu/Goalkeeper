import React, { FunctionComponent as Component, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppState, ViewStyle, FlatList } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { spacing } from "../theme"
import { toJS } from "mobx"
import { save, load, remove } from "../utils/storage"

const FLATLIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DailyScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()
  const SESSION_KEY = "previous-session"

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const _handleAppStateChange = nextAppState => {
    if (nextAppState === "active") {
      if (goalStore.activeGoal) {
        load(SESSION_KEY).then(prevSession => {
          const minutesPassed = (Date.now() - prevSession) / (1000 * 60)
          console.log(`${minutesPassed} minutes has been logged for ${goalStore.activeGoal.name}`)
          goalStore.activeGoal.addToCurrent(minutesPassed)
        })
      }
      remove(SESSION_KEY)
    } else {
      console.log("background")
      save(SESSION_KEY, Date.now())
    }
  }

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange)
    return () => AppState.removeEventListener("change", _handleAppStateChange)
  }, [])

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
