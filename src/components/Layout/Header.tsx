import React from 'react'
import HeaderMenu from './HeaderMenu'

function Header () {
  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="w-1/2 mx-auto py-3 px-4 flex items-center justify-between">
        <div className="text-2xl font-light text-white">
          AuthApp
        </div>

        <HeaderMenu/>
      </div>
    </header>
  )
}

export default Header
