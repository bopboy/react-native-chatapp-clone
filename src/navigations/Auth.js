import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Signup, Signin, Profile } from '../screens'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeContext } from 'styled-components/native'

const Stack = createStackNavigator()

const Auth = () => {
    const theme = useContext(ThemeContext)
    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: theme.background } }}>
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTintColor: theme.text,
                headerLeft: ({ onPress, tintColor }) => (
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={30}
                        color={tintColor}
                        onPress={onPress}
                    />
                )
            }} />
        </Stack.Navigator>
    )
}
export default Auth