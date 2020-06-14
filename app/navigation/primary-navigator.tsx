import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { DailyScreen, ProfileScreen } from "../screens"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { color, dimensions } from "../theme"

type PrimaryParamList = {
  daily: undefined
  profile: undefined
}

const Tabs = createMaterialTopTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="daily"
      backBehavior="history"
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: color.selected,
        inactiveTintColor: color.unselected,
        showIcon: true,
        showLabel: false,
        tabStyle: { backgroundColor: color.palette.grey },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const size = dimensions.icon.size
          if (route.name === "daily") {
            return <FontAwesome name="bars" color={color} size={size} />
          } else if (route.name === "profile") {
            return <MaterialIcons name="account-circle" color={color} size={size} />
          } else {
            return null
          }
        },
      })}
    >
      <Tabs.Screen name="daily" component={DailyScreen} />
      <Tabs.Screen name="profile" component={ProfileScreen} />
    </Tabs.Navigator>
  )
}
