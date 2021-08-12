import React from 'react'

import Footer from '../components/footer';
import Header from '../components/Header';

const HomepageLayout = props =>  {
  return (
    <div className='fullHeight'>
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  )
}


export default HomepageLayout;
