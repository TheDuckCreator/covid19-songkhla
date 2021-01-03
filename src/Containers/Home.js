import React from 'react'
import TDCLogo from '../Assets/TDC Logo black.png'
export default function Home({ props }) {
  return (
    <div className='container'>
      <div className='App-header'>
        <div className='content acenter'>
          <img
            className='image piccenter'
            src={TDCLogo}
            alt='The Duck Creator Logo'
            style={{ height: '100px' }}
          />
          <h1>Home Page </h1>
          <p>
            Continues rest of Working by using{' '}
            <a href='https://reactjs.org' alt='react website '>
              React{' '}
            </a>
            ,{' '}
            <a href='https://expressjs.com' alt='Express JS Webiste '>
              Express
            </a>{' '}
            and the other documents
          </p>
        </div>
      </div>
    </div>
  )
}
