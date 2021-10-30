import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Profile, ChannelList } from '../screens'

const Tab = createBottomTabNavigator()

const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="List" component={ChannelList} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}
export default Home