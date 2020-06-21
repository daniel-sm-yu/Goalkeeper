import React, { FunctionComponent as Component, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput } from "react-native"
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
  marginLeft: spacing[3],
}

const NUMBER_INPUT = {
  ...BASE_INPUT,
  minWidth: 50,
}

const COLOR_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: spacing[3],
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
  const [color, setColor] = React.useState("")

  const hourInput = useRef()
  const minuteInput = useRef()

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />
      <View style={CONTAINER}>
        <Text preset="formQuestion">What will you do?</Text>
        <View style={GOAL_CONTAINER}>
          <Text preset="formAnswer">I will</Text>
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
          <Text preset="formAnswer">for</Text>
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
          <Text preset="formAnswer">hours</Text>
          <TextInput
            style={NUMBER_INPUT}
            value={minute}
            onChangeText={setMinute}
            textAlign="center"
            textAlignVertical="center"
            keyboardType="number-pad"
            ref={minuteInput}
          />
          <Text preset="formAnswer">minutes.</Text>
        </View>

        <Text preset="formQuestion">Choose a color</Text>
        <View style={COLOR_CONTAINER}>
          <ColorButton color="blue" selected={color === "blue"} onPress={() => setColor("blue")} />
          <ColorButton
            color="green"
            selected={color === "green"}
            onPress={() => setColor("green")}
          />
          <ColorButton
            color="yellow"
            selected={color === "yellow"}
            onPress={() => setColor("yellow")}
          />
        </View>
        <View style={COLOR_CONTAINER}>
          <ColorButton
            color="orange"
            selected={color === "orange"}
            onPress={() => setColor("orange")}
          />
          <ColorButton color="pink" selected={color === "pink"} onPress={() => setColor("pink")} />
          <ColorButton
            color="purple"
            selected={color === "purple"}
            onPress={() => setColor("purple")}
          />
        </View>

        <Text preset="formQuestion">Start today?</Text>
      </View>
    </Screen>
  )
})
