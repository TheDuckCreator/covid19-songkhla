import React, { useState, useEffect } from 'react'
import firebase from '../Api/Firebase'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
const accessToken = localStorage.getItem('accessKey')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
const fetcher = (url) => {
  console.log(url)
  return axios.get(url).then((res) => res.data)
}

export default function EditPage() {
  const [renderedPage, setrenderedPage] = useState(false)
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    console.log('Use Effect is Running')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setrenderedPage(true)
      }
    })
    return () => {}
  }, [])

  const { data, error } = useSWR(
    process.env.REACT_APP_API_URL + '/case/',
    fetcher
  )

  const allCaseRender = () => {
    if (error) return <div>Fail to Load </div>
    if (!data) return <div> Loading ... </div>

    return _.map(data, (_data, index) => (
      <tr key={index}>
        <td> {_data.date} </td>
        <td> {_data.newCase} </td>
        <td>{_data.secondWaveCase}</td>
        <td>{_data.allCase}</td>
        <td>{_data.newFinding} </td>
        <td>{_data.newNegative} </td>
        <td>{_data.allFinding} </td>
        <td>{_data.allNegative} </td>
        <td>{_data.waiting} </td>
        <td>{_data.riskGroup} </td>
      </tr>
    ))
  }

  const addingNewReport = (data) => {
    axios.post(process.env.REACT_APP_API_URL + '/case/', data).then((res) => {
      if (res.status === 200) {
        mutate(process.env.REACT_APP_API_URL + '/case/')
      }
    })
  }

  const errorComponent = () => (
    <div className='container'>
      <div className='App-header'>
        <h1 className='title is-1 kanit'>ขออภัย</h1>
        ขออภัย คุณยังไม่ได้ลงชื่อเข้าใช้ กรุณาลงชือเข้าใช้ก่อน
      </div>
    </div>
  )

  const appComponent = (
    <div className='container mt-3 '>
      <div className='content'>
        <h3 className='title is-3 kanit mt-2'>จัดการข้อมูล</h3>
        <hr />

        <div className='card m-2'>
          <div className='card-content'>
            {' '}
            <form onSubmit={handleSubmit(addingNewReport)}>
              <div className='columns is-justify-content-space-between'>
                <div className='column is-8'>
                  <div className='columns m-1'>
                    <div className='column is-3'>
                      <label className='label'>วันที่</label>
                      <input
                        className='input'
                        ref={register}
                        type='date'
                        name='date'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>ผู้ป่วยใหม่</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='newCase'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>จำนวนค้นหาเชื้อวันนี้</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='newFinding'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>ตรวจไม่พบเชื้อ</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='newNegative'
                      />
                    </div>
                  </div>
                  <div className='columns m-1'>
                    <div className='column is-3'>
                      <label className='label'>การตรวจหาเชื้อทั้งหมด</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='allFinding'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>ตรวจไม่พบเชื้อ</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='allNegative'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>ผู้ป่วยยืนยันทั้งหมด</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='allCase'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>
                        จำนวนผู้ป่วย(ระบาดครั้งใหม่) ทั้งหมด
                      </label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='secondWaveCase'
                      />
                    </div>
                  </div>
                  <div className='columns m-1'>
                    <div className='column is-3'>
                      <label className='label'>รอผลตรวจ</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='waiting'
                      />
                    </div>
                    <div className='column is-3'>
                      <label className='label'>จำนวนกลุ่มเสี่ยง</label>
                      <input
                        className='input'
                        ref={register}
                        type='number'
                        name='riskGroup'
                      />
                    </div>
                  </div>
                </div>
                <div className='column is-2'>
                  <button type='submit' className='button is-primary kanit'>
                    เพิ่ม
                  </button>
                </div>
              </div>{' '}
            </form>
          </div>
        </div>
        <br />
        <table className='table'>
          <thead>
            <tr>
              <th>วันที่</th>
              <th>ผู้ป่วยใหม่</th>
              <th>รวมระบาดรอบใหม่</th>
              <th>รวมทั้งสองรอบ</th>
              <th>ตรวจเชื้อวันนี้ </th>
              <th>ไม่พบเชื้อวันนี้ </th>
              <th>ตรวจเชื้อทั้งหมด </th>
              <th>ไม่พบเชื้อ </th>
              <th>รอผล </th>
              <th>จำนวนกลุ่มเสี่ยง </th>
            </tr>
          </thead>
          <tbody>{allCaseRender()}</tbody>
        </table>
        <div style={{ height: '10vh' }} />
      </div>
    </div>
  )

  if (renderedPage) {
    return appComponent
  } else {
    return errorComponent()
  }
}
