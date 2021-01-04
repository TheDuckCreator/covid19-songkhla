import React from 'react'
import moment from 'moment'
import TDCLogo from '../Assets/TDC-CBT.png'
export default function Footer() {
  return (
    <footer className='footer'>
      <div className='content has-text-centered'>
        <p>
          &copy; {moment().format('YYYY')}{' '}
          <a href='https://www.theduckcreator.in.th'> The Duck Creator</a> The
          website content is licensed{' '}
          <a href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
            CC BY NC SA 4.0
          </a>
        </p>
        <p>
          {' '}
          เว็บไซต์นี้ไม่ได้ผลิตโดยหน่วยงานราชการใด ๆ ทั้งสิ้น
          โปรดอย่าใช้ข้อมูลนี้ในการอ้างอิง
          <br />
          ถ้าหากการนำเสนอต่างๆ ทำให้เกิดการเข้าใจผิด หรือ มีข้อผิดพลาด
          กรุณาติดต่อผู้พัฒนาที่ theduckcreator@gmail.com
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
