import React from 'react'

function Footer({ isDark, setIsDark } ) {

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

