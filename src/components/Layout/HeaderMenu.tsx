import React, { useContext } from 'react'
import AuthContext from '../../store/auth.context'

function HeaderMenu () {
  const authContext = useContext(AuthContext)

  return (
    <ul className="flex items-center space-x-8">
      <li>
        <a className="text-blue-200 hover:text-white" href="/">Home</a>
      </li>
      {authContext.isLoggedIn && (
        <li>
          <a className="text-blue-200 hover:text-white" href="/">Admin</a>
        </li>
      )}
      {authContext.isLoggedIn && (
        <li>
          <button type="button" onClick={authContext.doLogout}
                  className="text-blue-100 hover:bg-white hover:text-blue-500 hover:border-white border border-blue-400 inline-block px-3 py-1 rounded-full">
            Logout
          </button>
        </li>
      )}
    </ul>
  )
}

export default HeaderMenu
