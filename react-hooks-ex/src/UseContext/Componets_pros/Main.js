import React, { useState } from 'react'
import Page from './Page';
import './Main.css'


function Main() {
  const [isDark, setIsDark] = useState(false);
  return (
      <Page isDark={isDark} setIsDark={setIsDark}>Main</Page>
  )
}

export default Main