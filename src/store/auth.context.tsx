import React, { useEffect, useState } from 'react'
import { AuthContextStore, LoginCredentials } from '../types'

const LOCAL_STORAGE_AUTHENTICATED_KEY = 'auth.authenticated'

const AuthContext = React.createContext<AuthContextStore>({
  isLoggedIn: false,
  doLogin: (credentials: LoginCredentials) => {},
  doLogout: () => {},
})

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem(LOCAL_STORAGE_AUTHENTICATED_KEY) === '1')
  }, [])

  const handleOnLogin = (credentials: LoginCredentials) => {
    console.log(`Logged in as ${credentials.email}`)

    localStorage.setItem(LOCAL_STORAGE_AUTHENTICATED_KEY, '1')

    setIsLoggedIn(true)
  }

  const handleOnLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTHENTICATED_KEY)

    setIsLoggedIn(false)
  }

  const context = {
    isLoggedIn: isLoggedIn,
    doLogin: handleOnLogin,
    doLogout: handleOnLogout,
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
