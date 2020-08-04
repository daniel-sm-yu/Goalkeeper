import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { GoalsScreen, FormScreen } from "../screens"

export type PrimaryParamList = {
  goals: undefined
  form: { id: string } | undefined
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
      <Stack.Screen name="goals" component={GoalsScreen} />
      <Stack.Screen name="form" component={FormScreen} />
    </Stack.Navigator>
  )
}
