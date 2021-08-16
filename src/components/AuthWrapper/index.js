import React from 'react'

import './styles.scss'

export default function AuthWrapper({ headLine, children }) {
  return (
    <div className='authWrapper'>
      <div className='wrap'>
        {headLine && <h2>{headLine}</h2>}

        <div className='children'>
        {children && children}
        </div>
      </div>
    </div>
  )
}
