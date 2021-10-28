import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'
import styled from 'styled-components'
import { Button } from '../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Container = styled.View`
    flex:1;
    justify-content: center;
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
    return (
        <Container insets={insets}>
            <StyledText>SIGN-IN</StyledText>
            <Button title="Signup" onPress={() => console.log('signin')} />
            <Button
                title="or Signup"
                onPress={() => navigation.navigate('Signup')}
                containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
                textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
            />
        </Container >
    )
}
export default Signin