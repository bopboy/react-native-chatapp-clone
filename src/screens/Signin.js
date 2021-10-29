import React, { useContext, useState, useRef } from 'react'
import { ThemeContext } from 'styled-components/native'
import styled from 'styled-components'
import { Button, Image, Input } from '../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Container = styled.View`
    flex:1;
    justify-content:flex-start;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`
const StyledText = styled.Text`
    font-size: 30px;
    color:#111111;
`
const Signin = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const theme = useContext(ThemeContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const refPassword = useRef(null)
    const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/rn-chat-app-7368c.appspot.com/o/logo.png?alt=media'
    const _handleSigninBtnPress = () => {
        console.log('singin')
    }
    return (
        <Container insets={insets}>
            <Image url={logoUrl} />
            <Input onSubmitEditing={() => refPassword.current.focus()}
                label="Email" placeholder="Email" returnKeyType="next" value={email} onChangeText={setEmail}
            />
            <Input ref={refPassword}
                label="Password" placeholder="Password" returnKeyType="done" value={password} onChangeText={setPassword}
                isPassword={true} onSubmitEditing={_handleSigninBtnPress}
            />
            <Button title="Sign in" onPress={_handleSigninBtnPress} />
            <Button
                title="or Sign up"
                onPress={() => navigation.navigate('Signup')}
                containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
                textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
            />
        </Container >
    )
}
export default Signin