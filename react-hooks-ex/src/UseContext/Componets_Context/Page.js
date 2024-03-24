// import React, { useContext } from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
// import { ThemeContext } from './ThemeContext';

function Page() {
    // const data = useContext(ThemeContext);
    // console.log('data', data);
    return (
        <div className='page'>
            <Header />
            <Content />
            <Footer  />
        </div>
    )
}

export default Page