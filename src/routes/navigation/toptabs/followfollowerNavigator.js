import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { screenOptions } from './navigationProps/navigationProps'

import { FollowNavigator } from '../stacks/topTabStacks/FollowNavigator'
import { FollowerNavigator } from '../stacks/topTabStacks/FollowerNavigator'

const Tab = createMaterialTopTabNavigator()

export const FollowFollowerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyCourses"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="MyCourses"
        component={FollowNavigator}
        options={{ tabBarLabel: 'My Courses' }}
      />
      <Tab.Screen
        name="AllCourses"
        component={FollowerNavigator}
        options={{ tabBarLabel: 'New Courses' }}
      />
    </Tab.Navigator>
  )
}