import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext';
import { UserConstext } from './UserConstext';

function Header() {
    // const {isDark,setIsDark} = useContext(ThemeContext);
    const {isDark} = useContext(ThemeContext);
    //console.log(isDark);

    const user = useContext(UserConstext);

    return (
        <header className='header'
            style={{
                background: isDark ? 'black' : 'lightgray',
                color: isDark ? 'white' : 'black',
            }}
        >
            <h1>Welcome {user}!</h1>
        </header>
    );
}

export default Header