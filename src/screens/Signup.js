import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Button, Image, Input, ErrorMessage } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signup } from '../firebase'
import { Alert } from 'react-native'
import { validateEmail, removeWhitespace } from '../utils'
import { UserContext, ProgressContext } from '../contexts'

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding:50px 20px;
`
const DEFAULT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/rn-chat-app-7368c.appspot.com/o/face.png?alt=media'
const Signup = ({ navigation }) => {
    const { setUser } = useContext(UserContext)
    const { spinner } = useContext(ProgressContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const refEmail = useRef(null)
    const refPassword = useRef(null)
    const refPasswordConfirm = useRef(null)
    const [photo, setPhoto] = useState(DEFAULT_PHOTO)
    const [errorMessage, setErrorMessage] = useState("")
    const [disabled, setDisabled] = useState(true)
    const refDidMount = useRef(null)
    const _handleSignupBtnPress = async () => {
        try {
            spinner.start()
            const user = await signup({ name, email, password, photo })
            setUser(user)
        } catch (e) {
            Alert.alert('Sign up Error', e.message)
        } finally {
            spinner.stop()
        }
    }
    useEffect(() => {
        setDisabled(!(name && email && password && passwordConfirm && !errorMessage))
    }, [email, name, passwordConfirm, password, errorMessage])
    useEffect(() => {
        if (refDidMount.current) {
            let error = ''
            if (!name) error = '이름을 입력해'
            else if (!email) error = '이메일을 입력해'
            else if (!validateEmail(email)) error = '제대로된 이메일 입력해'
            else if (password.length < 6) error = '비번은 6자 이상이어야 해'
            else if (password !== passwordConfirm) error = '비번은 같아야 해'
            else error = ''
            setErrorMessage(error)
        } else {
            refDidMount.current = true
        }
    }, [email, name, passwordConfirm, password])
    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
                < Input label="Name" placeholder="Name" returnKeyType="next" value={name} onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                    onBlur={() => setName(name.trim())} maxLength={12}
                />
                <Input ref={refEmail} label="Email" placeholder="Email" returnKeyType="next" value={email} onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}
                    onBlur={() => setEmail(removeWhitespace(email))}
                />
                <Input ref={refPassword}
                    label="Password" placeholder="Password" returnKeyType="next" value={password} onChangeText={setPassword}
                    isPassword={true} onSubmitEditing={() => refPasswordConfirm.current.focus()}
                    onBlur={() => setPassword(removeWhitespace(password))}
                />
                <Input ref={refPasswordConfirm}
                    label="PasswordConfirm" placeholder="PasswordConfirm" returnKeyType="done" value={passwordConfirm} onChangeText={setPasswordConfirm}
                    isPassword={true} onSubmitEditing={_handleSignupBtnPress}
                    onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
                />
                <ErrorMessage message={errorMessage} />
                <Button title="Sign up" onPress={_handleSignupBtnPress} disabled={disabled} />
            </Container >
        </KeyboardAwareScrollView>
    )
}
export default Signup