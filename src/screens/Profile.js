import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { Button } from '../components'
import { UserContext } from '../contexts'

const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.background};
`
const Profile = ({ navigation, route }) => {
    const { setUser } = useContext(UserContext)
    return (
        <Container>
            <Button title="Sign Out" onPress={() => setUser({})} />
        </Container>
    )
}
export default Profile