import React, { FunctionComponent as Component, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { Screen, Header, Text, ColorButton } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing, typography } from "../theme"

const CONTAINER = {
  justifyContent: "space-between",
  paddingTop: spacing[3],
  paddingHorizontal: spacing[5],
} as ViewStyle

const GOAL_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
} as ViewStyle

const BASE_INPUT = {
  // container:
  height: 50,
  borderRadius: 12,
  borderWidth: 0.2,
  borderColor: color.textTertiary,
  marginVertical: spacing[2],
  paddingHorizontal: spacing[2],
  // text:
  fontFamily: typography.light,
  fontSize: 24,
  color: color.textPrimary,
}

const TEXT_INPUT = {
  ...BASE_INPUT,
  flex: 1,
  marginLeft: spacing[1],
}

const NUMBER_INPUT = {
  ...BASE_INPUT,
  minWidth: 50,
}

const COLOR_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
} as ViewStyle

export const AddScreen: Component = observer(function AddScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [name, setName] = React.useState("")
  const [hour, setHour] = React.useState("")
  const [minute, setMinute] = React.useState("")

  const hourInput = useRef()
  const minuteInput = useRef()

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />

      <View style={CONTAINER}>
        <View style={GOAL_CONTAINER}>
          <Text preset="form">I will </Text>
          <TextInput
            style={TEXT_INPUT}
            value={name}
            onChangeText={setName}
            textAlignVertical="center"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => hourInput.current.focus()}
          />
        </View>

        <View style={GOAL_CONTAINER}>
          <Text preset="form">for</Text>
          <TextInput
            style={NUMBER_INPUT}
            value={hour}
            onChangeText={setHour}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="number-pad"
            returnKeyType="next"
            ref={hourInput}
            onSubmitEditing={() => minuteInput.current.focus()}
          />
          <Text preset="form">hours</Text>
          <TextInput
            style={NUMBER_INPUT}
            value={minute}
            onChangeText={setMinute}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="number-pad"
            ref={minuteInput}
          />
          <Text preset="form">minutes.</Text>
        </View>

        <Text>what color?</Text>

        <View style={COLOR_CONTAINER}>
          <ColorButton color="blue" selected={true} />
          <ColorButton color="green" />
          <ColorButton color="yellow" />
        </View>

        <View style={COLOR_CONTAINER}>
          <ColorButton color="orange" />
          <ColorButton color="pink" />
          <ColorButton color="purple" />
        </View>

        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
