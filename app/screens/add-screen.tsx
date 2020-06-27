import React, { FunctionComponent as Component, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput, Switch, Dimensions } from "react-native"
import { Screen, Header, Text, ColorButton, Button } from "../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { color, spacing, typography, getColor } from "../theme"

// TODO add input requirements and notifications

const CONTAINER = {
  height: Dimensions.get("window").height - 160,
  justifyContent: "space-between",
  paddingBottom: spacing[3],
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
  marginVertical: spacing[2],
  paddingHorizontal: spacing[3],
} as ViewStyle

const START_TODAY_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing[2],
} as ViewStyle

const BUTTON_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-evenly",
} as ViewStyle

const opacity = "C0"

export const AddScreen: Component = observer(function AddScreen() {
  const { goalStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [name, setName] = React.useState("")
  const [hour, setHour] = React.useState("")
  const [minute, setMinute] = React.useState("")
  const [selectedColor, setSelectedColor] = React.useState("")
  const [startToday, setStartToday] = React.useState(false)

  const resetForm = () => {
    setName("")
    setHour("")
    setMinute("")
    setSelectedColor("")
    setStartToday(false)
  }

  const hourInput = useRef()
  const minuteInput = useRef()

  return (
    <Screen preset="scroll">
      <Header headerText="New Goal" />
      <View style={CONTAINER}>
        <Text preset="formQuestion">What will you do?</Text>
        <View>
          <View style={GOAL_CONTAINER}>
            <Text preset="formAnswer">I will</Text>
            <TextInput
              style={TEXT_INPUT}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              textAlignVertical="center"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => hourInput.current.focus()}
            />
          </View>
          <View style={GOAL_CONTAINER}>
            <Text preset="formAnswer">for</Text>
            <TextInput
              ref={hourInput}
              style={NUMBER_INPUT}
              value={hour}
              onChangeText={setHour}
              textAlign="center"
              textAlignVertical="center"
              keyboardType="number-pad"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => minuteInput.current.focus()}
            />
            <Text preset="formAnswer">hours</Text>
            <TextInput
              ref={minuteInput}
              style={NUMBER_INPUT}
              value={minute}
              onChangeText={setMinute}
              textAlign="center"
              textAlignVertical="center"
              keyboardType="number-pad"
            />
            <Text preset="formAnswer">minutes.</Text>
          </View>
        </View>

        <Text preset="formQuestion">Choose a color</Text>
        <View>
          <View style={COLOR_CONTAINER}>
            <ColorButton
              color="blue"
              selected={selectedColor === "blue"}
              onPress={() => setSelectedColor("blue")}
            />
            <ColorButton
              color="green"
              selected={selectedColor === "green"}
              onPress={() => setSelectedColor("green")}
            />
            <ColorButton
              color="yellow"
              selected={selectedColor === "yellow"}
              onPress={() => setSelectedColor("yellow")}
            />
          </View>
          <View style={COLOR_CONTAINER}>
            <ColorButton
              color="orange"
              selected={selectedColor === "orange"}
              onPress={() => setSelectedColor("orange")}
            />
            <ColorButton
              color="pink"
              selected={selectedColor === "pink"}
              onPress={() => setSelectedColor("pink")}
            />
            <ColorButton
              color="purple"
              selected={selectedColor === "purple"}
              onPress={() => setSelectedColor("purple")}
            />
          </View>
        </View>

        <View style={START_TODAY_CONTAINER}>
          <Text preset="formQuestion">Start today?</Text>
          <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            trackColor={{
              true: selectedColor
                ? getColor(selectedColor) + opacity
                : color.palette.blue + opacity,
              false: color.palette.lightGrey + opacity,
            }}
            thumbColor={color.palette.white}
            ios_backgroundColor={color.palette.white}
            onValueChange={() => setStartToday(previousState => !previousState)}
            value={startToday}
          />
        </View>

        <View style={BUTTON_CONTAINER}>
          <Button text="Cancel" onPress={resetForm} />
          <Button
            text="Add Goal"
            style={{ backgroundColor: color.palette.lightGrey + opacity }}
            onPress={() => {
              goalStore.addGoal(name, Number(hour), Number(minute), selectedColor, startToday)
              resetForm()
            }}
          />
        </View>
      </View>
    </Screen>
  )
})
