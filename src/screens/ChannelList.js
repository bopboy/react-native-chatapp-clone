import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Button } from '../components'
import { MaterialIcons } from '@expo/vector-icons'

const channels = []
for (let i = 0; i < 1000; i++) {
    channels.push({ id: i, title: `title ${i}`, description: `desc: ${i}`, createdAt: i })
}
const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.itemBorder};
    padding:15px 20px;
`
const ItemTextContainer = styled.View`
    flex:1;
    flex-direction: column;
`
const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color:${({ theme }) => theme.text};
`
const ItemDesc = styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color:${({ theme }) => theme.itemDesc};
`
const ItemTime = styled.Text`
    font-size: 12px;
    color:${({ theme }) => theme.itemTime};
`
const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
    name: 'keyboard-arrow-right',
    size: 24,
    color: theme.itemIcon
}))``
const Item = React.memo(
    ({ item: { id, title, description, createdAt }, onPress }) => {
        console.log(id)
        return (
            <ItemContainer>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDesc>{description}</ItemDesc>
                </ItemTextContainer>
                <ItemTime>{createdAt}</ItemTime>
                <ItemIcon />
            </ItemContainer>
        )
    }
)
const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.background};
`
const ChannelList = ({ navigation }) => {
    return (
        <Container>
            <FlatList
                data={channels} renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item['id'].toString()}
                windowSize={5}
            />
        </Container >
    )
}
export default ChannelList