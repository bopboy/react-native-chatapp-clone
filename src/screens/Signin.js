import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-native'
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
    return (
        <Container insets={insets}>
            <StyledText>Signin</StyledText>
            <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        </Container >
    )
}
export default Signin