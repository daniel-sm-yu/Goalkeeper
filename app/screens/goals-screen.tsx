import React, { FunctionComponent as Component, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppState, ViewStyle, TouchableOpacity } from "react-native"
import { Screen, Bar, Header, Swiper } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { toJS } from "mobx"
import { save, load } from "../utils/storage"
import DraggableFlatList from "react-native-draggable-flatlist"
import { showMessage } from "react-native-flash-message"
import { MaterialIcons } from "@expo/vector-icons"
import { color, spacing } from "../theme"
import { StackNavigationProp } from "@react-navigation/stack"
import { PrimaryParamList } from "../navigation"

const ADD_BUTTON = {
  alignItems: "center",
  paddingBottom: spacing[5],
} as ViewStyle

export const GoalsScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()
  const navigation = useNavigation<StackNavigationProp<PrimaryParamList, "goals">>()
  const SESSION_KEY = "previous-session"

  const handleAppStateChange = nextAppState => {
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
    AppState.addEventListener("change", handleAppStateChange)
    return () => AppState.removeEventListener("change", handleAppStateChange)
  }, [])

  const barItem = ({ item, drag, isActive }) => (
    <Swiper
      onEdit={() => navigation.navigate("form", { id: item.id })}
      onDelete={() => {
        goalStore.deleteGoal(item.id)
        showMessage({
          message: `Deleted Goal: ${item.name}`,
          icon: { icon: "info", position: "left" },
        })
      }}
    >
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
    </Swiper>
  )

  return (
    <Screen preset="fixed">
      <Header headerText="Today's Goals" />
      <DraggableFlatList
        data={goalStore.goals}
        renderItem={barItem}
        keyExtractor={item => item.id}
        extraData={(toJS(goalStore), goalStore.goals)}
        onDragEnd={({ data }) => goalStore.setGoals(data)}
        ListFooterComponent={
          <TouchableOpacity style={ADD_BUTTON} onPress={() => navigation.navigate("form")}>
            <MaterialIcons name="add" size={42} color={color.palette.lightGrey} />
          </TouchableOpacity>
        }
      />
    </Screen>
  )
})
