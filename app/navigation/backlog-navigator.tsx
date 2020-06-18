import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { BacklogScreen, AddScreen } from "../screens"

type BacklogParamList = {
  backlog: undefined
  add: undefined
}

const Stack = createStackNavigator<BacklogParamList>()

export function BacklogNavigator() {
  return (
    <Stack.Navigator initialRouteName="backlog" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="backlog" component={BacklogScreen} />
      <Stack.Screen name="add" component={AddScreen} />
    </Stack.Navigator>
  )
}
