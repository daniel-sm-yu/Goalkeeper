import React, { FunctionComponent as Component, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput, Switch } from "react-native"
import { Screen, Header, Text, ColorButton, Button } from "../components"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { useStores } from "../models"
import { color, spacing, typography, getColor } from "../theme"
import { showMessage } from "react-native-flash-message"
import { PrimaryParamList } from "../navigation/primary-navigator"

const CONTAINER = {
  flex: 1,
  justifyContent: "space-evenly",
  paddingHorizontal: spacing[4],
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

export const FormScreen: Component = observer(function AddScreen() {
  const { goalStore } = useStores()
  const navigation = useNavigation()
  const { params } = useRoute<RouteProp<PrimaryParamList, "form">>()

  const [name, setName] = useState("")
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [repeatDaily, setRepeatDaily] = useState(false)

  const resetForm = () => {
    setName("")
    setHour("")
    setMinute("")
    setSelectedColor("")
    setRepeatDaily(false)
  }

  const nameInput = useRef()
  const hourInput = useRef()
  const minuteInput = useRef()

  return (
    <Screen preset="fixed">
      <Header headerText={params ? "Edit Goal" : "New Goal"} />
      <View style={CONTAINER}>
        <Text preset="formQuestion">What will you do?</Text>
        <View>
          <View style={GOAL_CONTAINER}>
            <Text preset="formAnswer">I will</Text>
            <TextInput
              ref={nameInput}
              style={TEXT_INPUT}
              value={name}
              onChangeText={setName}
              maxLength={36}
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
              maxLength={2}
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
              maxLength={2}
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
          <Text preset="formQuestion">Repeat Daily?</Text>
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
            onValueChange={() => setRepeatDaily(previousState => !previousState)}
            value={repeatDaily}
          />
        </View>

        <View style={BUTTON_CONTAINER}>
          <Button
            text="Cancel"
            onPress={() => {
              resetForm()
              navigation.goBack()
            }}
          />
          <Button
            text="Add Goal"
            style={{ backgroundColor: color.palette.lightGrey + opacity }}
            onPress={() => {
              if (!name) {
                nameInput.current.focus()
                showMessage({
                  message: "Missing Goal",
                  description: "Please enter your goal.",
                  type: "danger",
                  icon: { icon: "danger", position: "left" },
                })
              } else if (!hour && !minute) {
                hourInput.current.focus()
                showMessage({
                  message: "Missing Duration",
                  description: `How long do you wish to ${name}?`,
                  type: "danger",
                  icon: { icon: "danger", position: "left" },
                })
              } else if (Number(hour) + Number(minute) / 60 > 24) {
                nameInput.current.focus()
                showMessage({
                  message: "Not enough hours in the day, literally!",
                  description: `Please enter something you can do in one day.`,
                  type: "warning",
                  icon: { icon: "warning", position: "left" },
                  duration: 10000,
                })
              } else {
                goalStore.addGoal(name, Number(hour), Number(minute), selectedColor, repeatDaily)
                resetForm()
                showMessage({
                  message: `New Goal: ${name}`,
                  description: "Tap here to see it.",
                  titleStyle: { textTransform: "capitalize" },
                  type: "success",
                  icon: { icon: "success", position: "left" },
                  onPress: () => navigation.goBack(),
                })
              }
            }}
          />
        </View>
      </View>
    </Screen>
  )
})
