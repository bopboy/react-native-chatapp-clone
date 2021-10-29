import React from 'react'
import styled from 'styled-components/native'

const Conatiner = styled.View`
    position: absolute;
    z-index:2;
    opacity: 0.3;
    width:100%;
    height: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.spinnerBackground};
`
const Indicator = styled.ActivityIndicator.attrs(({ theme }) => ({
    size: 'large', color: theme.spinnerIndicator
}))``
const Spinner = () => {
    return (
        <Conatiner>
            <Indicator />
        </Conatiner>
    )
}

export default Spinner