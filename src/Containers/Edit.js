import React from 'react'
import firebase from '../Api/Firebase'
export default function EditPage({ props }) {
  if (firebase.auth().currentUser) {
    return (
      <div className='container'>
        <div className='App'>
          <div className='content '>
            <h3 className='title is-3 kanit'>จัดการข้อมูล</h3>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container'>
        <div className='App-header'>
          <h1 className='title is-1 kanit'>ขออภัย</h1>
          ขออภัย คุณยังไม่ได้ลงชื่อเข้าใช้ กรุณาลงชือเข้าใช้ก่อน
        </div>
      </div>
    )
  }
}
