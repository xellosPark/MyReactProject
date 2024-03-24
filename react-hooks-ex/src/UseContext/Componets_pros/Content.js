import React from 'react'

function Content({ isDark }) {
    return (
        <div className='content'
            style={{
                background: isDark ? 'black' : 'white',
                color: isDark ? 'white' : 'black',
            }}
        >
            <h1>유비샘님, 좋은 하루 되세요 </h1>
        </div>
    )
}

export default Content


