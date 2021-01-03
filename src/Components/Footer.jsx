import React from 'react'
import moment from 'moment'
import TDCLogo from '../Assets/TDC-CBT.png'
export default function Footer() {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p>
          &copy; {moment().format('YYYY')} <strong>The Duck Creator</strong>
          The website content is licensed{' '}
          <a href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
            CC BY NC SA 4.0
          </a>
        </p>
        <img
          className='image piccenter'
          src={TDCLogo}
          alt='The Duck Creator- Create-for-Better'
          style={{ height: '60px' }}
        />
      </div>
    </footer>
  )
}
