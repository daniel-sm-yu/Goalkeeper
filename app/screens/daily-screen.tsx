import React, { FunctionComponent as Component, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { AppState, ViewStyle, FlatList } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { spacing } from "../theme"
import { toJS } from "mobx"
import { save, load } from "../utils/storage"

const FLATLIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DailyScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()
  const SESSION_KEY = "previous-session"

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      goalStore.stopTimer()
      save(SESSION_KEY, Date.now())
    } else if (nextAppState === "active" && goalStore.activeGoal) {
      goalStore.startTimer()
      load(SESSION_KEY).then(prevSession => {
        const minutesPassed = (Date.now() - prevSession) / (1000 * 60) // convert milliseconds to minutes
        console.log(`${minutesPassed.toFixed(1)} minutes added for ${goalStore.activeGoal.name}`)
        goalStore.activeGoal.addToCurrent(minutesPassed)
      })
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
