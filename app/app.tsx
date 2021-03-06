/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef, FunctionComponent as Component } from "react"
import { View } from "react-native"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import FlashMessage from "react-native-flash-message"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { color } from "./theme"
enableScreens()

const PREVENT_FLASHES = { flex: 1, backgroundColor: color.background }

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App: Component<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts()
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, render an empty screen.
  if (!rootStore) return <View style={PREVENT_FLASHES} />

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
        <FlashMessage position="bottom" duration={4500} />
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
