import React, { FunctionComponent as Component, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppState, ViewStyle, TouchableOpacity, FlatList } from "react-native"
import { Screen, Bar, Header, Swiper } from "../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { save, load } from "../utils/storage"
import { showMessage } from "react-native-flash-message"
import { MaterialIcons } from "@expo/vector-icons"
import { color, spacing } from "../theme"
import { StackNavigationProp } from "@react-navigation/stack"
import { PrimaryParamList } from "../navigation"
import { toJS } from "mobx"

const ADD_BUTTON_CONTAINER = {
  alignItems: "center",
  marginTop: spacing[5],
  marginBottom: spacing[7],
} as ViewStyle

const ADD_BUTTON = {
  width: 64,
  height: 64,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 32,
  backgroundColor: color.palette.grey,
} as ViewStyle

export const GoalsScreen: Component = observer(function DailyScreen() {
  const { goalStore } = useStores()
  const navigation = useNavigation<StackNavigationProp<PrimaryParamList, "goals">>()
  const PREV_APP_CLOSE = "previous-app-close"
  const PREV_USAGE_DAY = "previous-usage-day"

  const handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      goalStore.stopTimer()
      save(PREV_APP_CLOSE, Date.now())
    } else if (nextAppState === "active" && goalStore.activeGoal) {
      goalStore.startTimer()
      load(PREV_APP_CLOSE).then(prevAppClose => {
        const minutesPassed = (Date.now() - prevAppClose) / (1000 * 60) // convert milliseconds to minutes
        console.log(`${minutesPassed.toFixed(1)} minutes added for ${goalStore.activeGoal.name}`)
        goalStore.activeGoal.addToCurrent(minutesPassed)
      })
    }
  }

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)
    return () => AppState.removeEventListener("change", handleAppStateChange)
  }, [])

  useEffect(() => {
    load(PREV_USAGE_DAY).then(prevUsage => {
      const current = new Date(Date.now())
      const previous = new Date(prevUsage)

      if (
        current.getDate() !== previous.getDate() ||
        current.getMonth() !== previous.getMonth() ||
        current.getFullYear() !== previous.getFullYear()
      ) {
        goalStore.newDay()
        save(PREV_USAGE_DAY, Date.now())
      }
    })
  }, [new Date(Date.now()).getDate()])

  const barItem = ({ item }) => (
    <Swiper
      onEdit={() => navigation.navigate("form", { id: item.id })}
      onDelete={() => {
        goalStore.deleteGoal(item.id)
        showMessage({
          message: item.name,
          description: "has been removed from your list.",
          titleStyle: { textTransform: "capitalize" },
          type: "default",
          icon: { icon: "info", position: "left" },
        })
      }}
    >
      <Bar
        isActive={item.id === goalStore.activeId}
        name={item.name}
        color={item.color}
        current={item.current}
        target={item.target}
        onPress={() => goalStore.setActiveId(item.id === goalStore.activeId ? "" : item.id)}
      />
    </Swiper>
  )

  return (
    <Screen preset="fixed">
      <Header headerText="Today's Goals" />
      <FlatList
        data={goalStore.goals}
        renderItem={barItem}
        keyExtractor={item => item.id}
        extraData={toJS(goalStore)}
        ListFooterComponentStyle={ADD_BUTTON_CONTAINER}
        ListFooterComponent={
          <TouchableOpacity style={ADD_BUTTON} onPress={() => navigation.navigate("form")}>
            <MaterialIcons name="add" size={36} color={color.palette.lightGrey} />
          </TouchableOpacity>
        }
      />
    </Screen>
  )
})
