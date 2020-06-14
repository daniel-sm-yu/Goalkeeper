import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DailyScreen, ProfileScreen } from "../screens"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { color } from "../theme"

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
          if (route.name === "daily") {
            return <FontAwesome name="bars" color={color} />
          } else if (route.name === "profile") {
            return <MaterialIcons name="account-circle" color={color} />
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

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"] // from bowser, might be useful in the future
