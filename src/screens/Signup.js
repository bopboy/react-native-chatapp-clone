import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button, Image, Input } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding:50px 20px;
`
const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/rn-chat-app-7368c.appspot.com/o/logo.png?alt=media'

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const refEmail = useRef(null)
    const refPassword = useRef(null)
    const refPasswordConfirm = useRef(null)
    const _handleSignupBtnPress = () => {
        console.log('singup')
    }
    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image />
                <Input label="Name" placeholder="Name" returnKeyType="next" value={name} onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                />
                <Input ref={refEmail} label="Email" placeholder="Email" returnKeyType="next" value={email} onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                />
                <Input ref={refPassword}
                    label="Password" placeholder="Password" returnKeyType="next" value={password} onChangeText={setPassword}
                    isPassword={true} onSubmitEditing={() => refPasswordConfirm.current.focus()}
                />
                <Input ref={refPasswordConfirm}
                    label="PasswordConfirm" placeholder="PasswordConfirm" returnKeyType="done" value={passwordConfirm} onChangeText={setPasswordConfirm}
                    isPassword={true} onSubmitEditing={_handleSignupBtnPress}
                />
                <Button title="Sign up" onPress={_handleSignupBtnPress} />
            </Container >
        </KeyboardAwareScrollView>
    )
}
Image.defaultProps = {
    url: 'https://firebasestorage.googleapis.com/v0/b/rn-chat-app-7368c.appspot.com/o/face.png?alt=media'
}
export default Signup