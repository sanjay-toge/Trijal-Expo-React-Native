import 'react-native-gesture-handler'
import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../utils/ShowToast'

import { LoginNavigator } from './stacks'
import RootStack from './rootstack/RootStack'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const { scheme } = useContext(ColorSchemeContext)
  const { userData, setUserData } = useContext(UserDataContext)

  useEffect(() => {
    getLocalStorageData()
  }, [])
  const getLocalStorageData = async () => {
    let storageData = await AsyncStorage.getItem('userToken')
    storageData = JSON.parse(storageData);
    console.log(storageData)
    if(storageData){
      setUserData(storageData)
    }
  }

  return (
    <>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        {userData ? <RootStack /> : <LoginNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}
