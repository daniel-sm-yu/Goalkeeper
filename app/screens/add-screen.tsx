import React, { FunctionComponent as Component, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { Screen, Header, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing, typography } from "../theme"

const CONTAINER = {
  justifyContent: "space-between",
  paddingTop: spacing[3],
  paddingHorizontal: spacing[5],
} as ViewStyle

const INPUT = {
  // container:
  minWidth: 62,
  height: 64,
  borderRadius: 12,
  borderWidth: 0.2,
  borderColor: color.textTertiary,
  marginVertical: spacing[3],
  paddingHorizontal: spacing[2],
  // text:
  color: color.textPrimary,
  fontFamily: typography.light,
  fontSize: 32,
}

const TIME_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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
        <Text preset="form">I will </Text>
        <TextInput
          style={INPUT}
          value={name}
          onChangeText={setName}
          textAlignVertical="center"
          autoFocus
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => hourInput.current.focus()}
        />
        <Text preset="form">for</Text>
        <View style={TIME_CONTAINER}>
          <TextInput
            style={INPUT}
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
            style={INPUT}
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
        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
