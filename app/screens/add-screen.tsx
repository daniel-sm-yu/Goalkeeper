import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { Screen, Header, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color, spacing, typography } from "../theme"

const CONTAINER = {
  justifyContent: "space-between",
  paddingTop: spacing[5],
  paddingHorizontal: spacing[5],
} as ViewStyle

const INPUT = {
  // container:
  minWidth: 62,
  height: 64,
  borderRadius: 12,
  borderWidth: 0.15,
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

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />

      <View style={CONTAINER}>
        <Text preset="form">I will </Text>
        <TextInput
          style={INPUT}
          value={name}
          onChangeText={setName}
          autoFocus
          autoCapitalize="none"
          caretHidden
        />
        <Text preset="form">for</Text>
        <View style={TIME_CONTAINER}>
          <TextInput
            style={INPUT}
            value={hour}
            onChangeText={setHour}
            keyboardType="number-pad"
            caretHidden
          />
          <Text preset="form">hours</Text>
          <TextInput
            style={INPUT}
            value={minute}
            onChangeText={setMinute}
            keyboardType="number-pad"
            caretHidden
          />
          <Text preset="form">minutes.</Text>
        </View>

        {/* add another textinput with number keyboard,
        chain inputs: https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar */}

        <Text>what color?</Text>
        <Text>add to daily?</Text>
      </View>
    </Screen>
  )
})
