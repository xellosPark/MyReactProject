import React from 'react'

function Header({ isDark }) {
    return (
        <header className='header'
            style={{
                background: isDark ? 'black' : 'lightgray',
                color: isDark ? 'white' : 'black',
            }}
        >
            <h1>Welcome 유비샘!</h1>
        </header>
    );
}

export default Header