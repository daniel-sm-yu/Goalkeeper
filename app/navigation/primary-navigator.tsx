import React from "react"
import { View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { GoalsScreen, FormScreen } from "../screens"
import { color } from "../theme"

const PREVENT_FLASHES = { flex: 1, backgroundColor: color.background }

export type PrimaryParamList = {
  goals: undefined
  form: { id: string } | undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <View style={PREVENT_FLASHES}>
      <Stack.Navigator
        initialRouteName="goals"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        <Stack.Screen name="goals" component={GoalsScreen} />
        <Stack.Screen name="form" component={FormScreen} />
      </Stack.Navigator>
    </View>
  )
}
