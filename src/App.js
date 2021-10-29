import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import Navigation from './navigations'
import AppLoading from 'expo-app-loading'
import { UserProvider, ProgressProvider } from './contexts'

const App = () => {
  const [isReady, setIsReady] = useState(true)
  return isReady ? (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <UserProvider>
          <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
          <Navigation />
        </UserProvider>
      </ProgressProvider>
    </ThemeProvider>
  ) : <AppLoading onFinish={() => setIsReady(true)} />
}
export default App