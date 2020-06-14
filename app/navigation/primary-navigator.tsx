import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DailyScreen, ProfileScreen } from "../screens"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { color, dimensions } from "../theme"

type PrimaryParamList = {
  daily: undefined
  profile: undefined
}

const BottomTabs = createBottomTabNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <BottomTabs.Navigator
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
      tabBarOptions={{
        // activeTintColor: color.selected,
        // inactiveTintColor: color.unselected,
        style: {
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
        },
      }}
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
