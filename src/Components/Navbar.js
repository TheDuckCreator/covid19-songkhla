import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../Api/Firebase'
import { useHistory } from 'react-router-dom'
const AppNavBar = () => {
  const history = useHistory()
  return (
    <div className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <h1 className='title is-5 kanit'> COVID-19 in Songkhla</h1>
        </Link>

        <button
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </button>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>
            Home
          </Link>
          {firebase.auth().currentUser ? (
            <>
              <Link className='navbar-item' to='/edit'>
                แก้ไขข้อมูล
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* <div className='navbar-item has-dropdown is-hoverable'>
            <Link className='navbar-link'>Menu</Link>

            <div className='navbar-dropdown'>
              <Link className='navbar-item'>Tin</Link>
              <Link className='navbar-item'>Jobs</Link>
              <Link className='navbar-item'>Contact</Link>
              <hr className='navbar-divider' />
              <Link className='navbar-item'>Report an issue</Link>
            </div>
          </div> */}
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {firebase.auth().currentUser ? (
                <>
                  <Link className='navbar-item'>
                    {' '}
                    {firebase.auth().currentUser.email}{' '}
                  </Link>
                  <button
                    className='button is-light'
                    onClick={() => {
                      firebase.auth().signOut()
                      history.push('/login')
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className='button is-light' to='/login'>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppNavBar
