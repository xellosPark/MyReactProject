import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext';


function Footer() {

    const {isDark, setIsDark } = useContext(ThemeContext);
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <footer 
            className='footer'
            style={{
                background: isDark ? 'black' : 'lightgray',
            }}
        >
            <button className='button' onClick={toggleTheme}>
                Dark Mode
            </button>   
             AAAA
        </footer>
    )
}

export default Footer

