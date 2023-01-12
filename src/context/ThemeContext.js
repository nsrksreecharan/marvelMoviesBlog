import React from 'react'

const ThemeContext = React.createContext({
  dark: 'true',
  changeTheme: () => {},
  nav: "",
  changeNavView: () => {},
})

export default ThemeContext