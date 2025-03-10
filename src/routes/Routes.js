import React, { useContext } from 'react'
import Main from './navigation'
import Initial from '../scenes/initial/Initial'
import { useAtom } from 'jotai'
import { checkedAtom, loggedInAtom } from '../utils/atom'
import { UserDataContext } from '../context/UserDataContext'

const Routes = () => {
  const [checked] = useAtom(checkedAtom)
  const [loggedIn] = useAtom(loggedInAtom)
  const { userData } = useContext(UserDataContext)


  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // // rendering
  // if (!userData) {
  //   return <Initial />
  // }

  return <Main />
}

export default Routes
