import React, { useContext } from 'react'
import AuthContext from '../store/auth.context'
import Header from './Layout/Header'
import Home from './Pages/Home'
import Login from './Pages/Login'

function App () {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <Header/>

      <div className="w-1/2 mx-auto mt-16 px-4">
        {authContext.isLoggedIn && <Home/>}
        {!authContext.isLoggedIn && <Login/>}
      </div>
    </div>
  )
}

export default App
