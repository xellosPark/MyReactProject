import React, { useState } from 'react'
import Page from './Page';
import './ContextMain.css'
import { ThemeContext } from './ThemeContext';
import { UserConstext } from './UserConstext';

function ContextMain() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <UserConstext.Provider value={'유비샘'}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page isDark={isDark} setIsDark={setIsDark}>Main</Page>
      </ThemeContext.Provider>
    </UserConstext.Provider>

  )
}

export default ContextMain