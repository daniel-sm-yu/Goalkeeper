import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { DailyScreen, ProfileScreen } from "../screens"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
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
          if (route.name === "daily") {
            return <FontAwesome name="bars" color={color} size={size} />
          } else if (route.name === "profile") {
            return <MaterialCommunityIcons name="account" color={color} size={size} />
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
