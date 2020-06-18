import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ProfileScreen, DailyScreen, BacklogScreen, AddScreen } from "../screens"
import { MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { color, dimensions } from "../theme"

type PrimaryParamList = {
  profile: undefined
  daily: undefined
  backlog: undefined
  add: undefined
}

const Tabs = createMaterialTopTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="daily"
      backBehavior="history"
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: color.active,
        inactiveTintColor: color.inactive,
        showIcon: true,
        showLabel: false,
        tabStyle: {
          borderTopWidth: 1,
          borderColor: color.background,
          backgroundColor: color.palette.grey,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const size = dimensions.icon.size
          if (route.name === "profile") {
            return <MaterialCommunityIcons name="account" color={color} size={size} />
          } else if (route.name === "daily") {
            return <FontAwesome name="bars" color={color} size={size} />
          } else if (route.name === "backlog") {
            return <FontAwesome5 name="grip-vertical" color={color} size={size} />
          } else if (route.name === "add") {
            return <FontAwesome name="plus-square" color={color} size={size} />
          } else {
            return null
          }
        },
      })}
    >
      <Tabs.Screen name="profile" component={ProfileScreen} />
      <Tabs.Screen name="daily" component={DailyScreen} />
      <Tabs.Screen name="backlog" component={BacklogScreen} />
      <Tabs.Screen name="add" component={AddScreen} />
    </Tabs.Navigator>
  )
}
