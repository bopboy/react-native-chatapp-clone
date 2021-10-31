import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components/native'
import { Input } from '../components'
import { createMessage, getCurrentUser, db } from '../firebase'
import { onSnapshot, orderBy, query, collection, getDocs, doc } from 'firebase/firestore'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.background};
`
const StyledText = styled.Text`
    font-size:30px;
`
const SendIcon = styled(MaterialIcons).attrs(({ theme, text }) => ({
    name: 'send',
    size: 24,
    color: text ? theme.sendBtnActive : theme.sendBtnInactive
}))``
const SendButton = props => {
    return (
        <Send
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4
            }}
            disabled={!props.text}
        >
            <SendIcon text={props.text} />
        </Send>
    )
}
const Channel = ({ navigation, route }) => {
    const [messages, setMessages] = useState([])
    const { uid, name, photo } = getCurrentUser()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.title || 'Channel'
        })
    })
    useEffect(() => {
        const channelRef = doc(db, 'channels', route.params.id)
        const q = query(collection(channelRef, 'messages'), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(q, queySnapshot => {
            const list = []
            queySnapshot.forEach(docu => {
                // const temp = { ...docu.data(), _id: docu.id }
                list.push(docu.data())
            })
            setMessages(list)
        })
        return () => unsubscribe()
    })
    const _handleMessageSend = async messageList => {
        const message = messageList[0]
        try {
            await createMessage({ channelID: route.params.id, message })
        } catch (e) {
            Alert.alert('Message Error', e.message)
        }
    }
    return (
        <Container>
            <StyledText>Channel</StyledText>
            <GiftedChat
                placeholder="Enter a message..."
                messages={messages}
                user={{ _id: uid, name, avatar: photo }}
                onSend={_handleMessageSend}
                scrollToBottom={true}
                renderUsernameOnMessage={true}
                alwaysShowSend={true}
                multiline={false}
                renderSend={props => <SendButton {...props} />}
            />
        </Container>
    )
}
export default Channel