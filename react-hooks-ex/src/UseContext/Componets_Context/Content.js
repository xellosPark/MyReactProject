import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext';
import { UserConstext } from './UserConstext';

function Content() {
    const {isDark} = useContext(ThemeContext);
    const user = useContext(UserConstext);
    return (
        <div className='content'
            style={{
                background: isDark ? 'black' : 'white',
                color: isDark ? 'white' : 'black',
            }}
        >
            <h1>{user}, 좋은 하루 되세요 </h1>
        </div>
    )
}

export default Content


