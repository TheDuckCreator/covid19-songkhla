import React, { useState, useEffect } from 'react'
import firebase from '../Api/Firebase'
import { useHistory } from 'react-router-dom'

export default function Login({ props }) {
  const history = useHistory()
  useEffect(() => {
    let user = firebase.auth().currentUser
    if (user) {
      history.push('/edit')
    } else {
      console.log('Not Login Condition')
    }
    return () => {}
  }, [])
  const [inputEmail, setinputEmail] = useState('')
  const [inputPassword, setinputPassword] = useState('')

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then((res) => {
        if (res.user) {
          history.push('/edit')
        }
      })
  }

  return (
    <div className='container'>
      <h3 className='title is-3 kanit acenter'>ลงชื่อเข้าใช้</h3>
      <div className='columns is-justify-content-center'>
        <div className='column is-4'>
          <div className='card'>
            <div className='card-content'>
              <div className='field'>
                <label className='label'>Email</label>
                <input
                  type='email'
                  className='input mb-3'
                  name='email'
                  value={inputEmail}
                  onChange={(event) => {
                    setinputEmail(event.target.value)
                  }}
                  placeholder='Email Address'
                />
                <label className='label'>Password</label>
                <input
                  type='password'
                  className='input mb-3'
                  name='password'
                  value={inputPassword}
                  onChange={(event) => {
                    setinputPassword(event.target.value)
                  }}
                  placeholder='Email Address'
                />{' '}
                <br />
                <button
                  className='button is-primary  has-has-text-centered '
                  onClick={() => onLogin()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}
