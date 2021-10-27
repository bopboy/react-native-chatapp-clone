import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import Navigation from './navigations'
import AppLoading from 'expo-app-loading'

const App = () => {
  const [isReady, setIsReady] = useState(false)
  return isReady ? (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  ) : <AppLoading onFinish={() => setIsReady(true)} />
}
export default App