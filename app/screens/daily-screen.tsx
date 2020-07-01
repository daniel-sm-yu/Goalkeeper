import React, { FunctionComponent as Component, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppState } from "react-native"
import { Screen, Bar, Header } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { toJS } from "mobx"
import { save, load } from "../utils/storage"
import DraggableFlatList from "react-native-draggable-flatlist"

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

  const barItem = ({ item, drag, isActive }) => (
    <Bar
      isActive={item.id === goalStore.activeId}
      isDragging={isActive} // isActive comes from DraggableFlatList and is true when this item is being dragged
      name={item.name}
      color={item.color}
      current={item.current}
      target={item.target}
      onPress={() => goalStore.setActiveId(item.id === goalStore.activeId ? "" : item.id)}
      onLongPress={drag}
    />
  )

  return (
    <Screen preset="fixed">
      <Header headerText="Today" />
      <DraggableFlatList
        data={goalStore.goalsToday}
        renderItem={barItem}
        keyExtractor={item => item.id}
        extraData={toJS(goalStore)}
        onDragEnd={({ data }) => goalStore.setGoals(goalStore.goalsNotToday.concat(data))}
      />
    </Screen>
  )
})
