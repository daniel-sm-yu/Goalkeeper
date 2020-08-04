import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DailyScreen, AddScreen } from "../screens"

type PrimaryParamList = {
  goals: undefined
  form: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="goals"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="goals" component={DailyScreen} />
      <Stack.Screen name="form" component={AddScreen} />
    </Stack.Navigator>
  )
}
