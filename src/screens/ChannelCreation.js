import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components/native'
import { Button, Input, ErrorMessage } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createChannel } from '../firebase'
import { ProgressContext } from '../contexts'
import { Alert } from 'react-native'

const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`
const ChannelCreation = ({ navigation }) => {
    const { spinner } = useContext(ProgressContext)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [disabled, setDisabled] = useState(true)
    const refDesc = useRef(null)
    const _handleTitleChange = title => {
        setTitle(title)
        setErrorMessage(title.trim() ? '' : '타이틀 입력해')
    }
    const _handleDescChange = desc => {
        setDesc(desc)
        setErrorMessage(desc.trim() ? '' : '설명 입력해')
    }
    const _handleCreateBtnPress = async () => {
        try {
            spinner.start()
            const id = await createChannel({ title: title.trim(), desc: desc.trim() })
            navigation.replace('Channel', { id, title })
        } catch (e) {
            Alert.alert('Creation Error', e.message)
        } finally {
            spinner.stop()
        }
    }
    useEffect(() => {
        setDisabled(!(title && !errorMessage))
    }, [title, errorMessage])
    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} extraScrollHeight={20}>
            <Container>
                <Input label="title" value={title} onChangeText={_handleTitleChange}
                    onSubmitEditing={() => refDesc.current.focus()}
                    onBlur={() => setTitle(title.trim())} placeholder="타이틀 입력" returnKeyType="next" maxLength={20}
                />
                <Input label="description" value={desc} onChangeText={_handleDescChange}
                    onSubmitEditing={_handleCreateBtnPress}
                    onBlur={() => setDesc(desc.trim())} placeholder="설명 입력" returnKeyType="done" maxLength={40}
                />
                <ErrorMessage message={errorMessage} />
                <Button title="Create" onPress={_handleCreateBtnPress} disabled={disabled} />
            </Container>
        </KeyboardAwareScrollView>
    )
}
export default ChannelCreation