import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DailyScreen, ProfileScreen } from "../screens"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { color, dimensions, spacing, typography } from "../theme"

type PrimaryParamList = {
  daily: undefined
  profile: undefined
}

const BottomTabs = createBottomTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <BottomTabs.Navigator
      initialRouteName="daily"
      backBehavior="history"
      tabBarOptions={{
        activeTintColor: color.selected,
        activeBackgroundColor: color.palette.grey,
        inactiveTintColor: color.unselected,
        inactiveBackgroundColor: color.palette.grey,
        labelPosition: "beside-icon",
        labelStyle: {
          fontFamily: typography.primary,
        },
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
      <BottomTabs.Screen
        name="daily"
        component={DailyScreen}
        options={{
          tabBarLabel: "Today",
        }}
      />
      <BottomTabs.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </BottomTabs.Navigator>
  )
}
