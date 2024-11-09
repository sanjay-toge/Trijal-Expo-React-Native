import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/TextInputBox'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { firestore } from '../../firebase/config'
import { setDoc, doc } from 'firebase/firestore'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { defaultAvatar, eulaLink } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { register } from '../../api/Registerapi'
import { showToast } from '../../utils/ShowToast'

export default function Registration() {
  const [fullName, setFullName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  }

  // useEffect(() => {
  //   console.log('Registration screen')
  // }, [])

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    // try {
    setSpinner(true)
    const signUpData = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      username: email,
      phoneNumber: phoneNumber,
    }
    const response = await register(signUpData)
    if (response.message === 'Registration successful') {
      showToast({
        title: 'Hello',
        body: 'Registration Success, please Login.',
        isDark
      })
      navigation.navigate('Login')
    }else{
      showToast({
        title: 'Hello',
        body: 'Registration Failed, please try again.',
        isDark
      })
    }
    //   const response = await createUserWithEmailAndPassword(auth, email, password, phoneNumber)
    //   const uid = response.user.uid
    //   const data = {
    //     id: uid,
    //     email,
    //     fullName,
    //     phoneNumber,
    //     avatar: defaultAvatar,
    //   };
    //   const usersRef = doc(firestore, 'users', uid);
    //   await setDoc(usersRef, data)
    // } catch(e) {
    //   setSpinner(false)
    //   alert(e)
    // }
    setSpinner(false)
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Logo />
        <TextInputBox
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          autoCapitalize="none"
        />
        <TextInputBox
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          autoCapitalize="none"
        />
        <TextInputBox
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInputBox
          placeholder="Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          autoCapitalize="none"
          keyboardType="phone-number"
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <Button
          label="Agree and Create account"
          color={colors.primary}
          onPress={() => onRegisterPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
        <Text
          style={[styles.link, { color: colorScheme.text }]}
          onPress={() => {
            Linking.openURL(eulaLink)
          }}
        >
          Require agree <Text style={styles.eulaLink}>EULA</Text>
        </Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
  link: {
    textAlign: 'center',
  },
  eulaLink: {
    color: colors.blueLight,
    fontSize: fontSize.middle,
  },
})
