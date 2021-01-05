import React from 'react'
import TDCLogo from '../Assets/TDC Logo black.png'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import _ from 'lodash'
import Chart from 'react-apexcharts'
import moment from 'moment'
import 'moment/locale/th'

const fetcher = (url) => {
  console.log(url)
  return axios.get(url).then((res) => res.data)
}

export default function Home({ props }) {
  const { data, error } = useSWR(
    process.env.REACT_APP_API_URL + '/case/',
    fetcher
  )

  const allCaseRender = () => {
    if (error) return <div>Fail to Load </div>
    if (!data) return <div> Loading ... </div>

    if (data) {
      let tempDailyCaseStack = []
      let tempDateStack = []
      let tempAllCase = []
      let tempSecondWaveCase = []
      let tempNewFinder = []
      let tempNewNegative = []
      let tempAllWaiting = []
      let tempAllRiskGroup = []
      let latestDay = '2020-01-01'
      _.map(data, (_data) => {
        if (moment(_data.date).isAfter(moment(latestDay), 'dates')) {
          latestDay = _data.date
        }
        tempDailyCaseStack.push(_data.newCase)
        tempDateStack.push(_data.date)
        tempAllCase.push(_data.allCase)
        tempSecondWaveCase.push(_data.secondWaveCase)
        tempNewFinder.push(_data.newFinding)
        tempNewNegative.push(_data.newNegative)
        tempAllWaiting.push(_data.waiting)
        tempAllRiskGroup.push(_data.riskGroup)
      })

      let newCaseSeries = [
        {
          name: 'จำนวนผู้ป่วยใหม่ที่พบ',
          data: tempDailyCaseStack,
        },
      ]

      let allCaseSeries = [
        {
          name: 'จำนวนผู้ป่วยสะสมเฉพาะการระบาดรอบใหม่',
          data: tempSecondWaveCase,
        },
        {
          name: 'จำนวนผู้ป่วยสะสมทั้งหมด',
          data: tempAllCase,
        },
      ]

      let newFindingSeries = [
        {
          name: 'จำนวนการตรวจหาเชื้อ',
          data: tempNewFinder,
        },
        {
          name: 'จำนวนการตรวจแล้วไม่พบเชื้อ',
          data: tempNewNegative,
        },
        {
          name: 'จำนวนการตรวจแล้วพบเชื้อ',
          data: tempDailyCaseStack,
        },
      ]

      let riskGroupsSeries = [
        {
          name: 'จำนวนคนที่อยู่ในกลุ่มเสี่ยง',
          data: tempAllRiskGroup,
        },
      ]

      let waitingResultSeries = [
        {
          name: 'จำนวนคนที่อยู่ระหว่างรอผล',
          data: tempAllWaiting,
        },
      ]

      let findingCaseOptions = {
        colors: ['#FEB019', '#00E396', '#FF4560'],
        xaxis: {
          categories: tempDateStack,
        },
      }
      let options = {
        xaxis: {
          categories: tempDateStack,
        },
      }

      return (
        <div className=''>
          <h5 className='subtitle is-5 kanit acenter'>
            ผู้ป่วยใหม่ในแต่ละวันในช่วงการระบาดรอบใหม่
          </h5>
          <div className=' is-flex is-justify-content-center'>
            <Chart
              width='500'
              type='area'
              series={newCaseSeries}
              options={options}
            />
          </div>

          <br />
          <h5 className='subtitle is-5 kanit-light acenter'>
            ผู้ป่วยสะสมทั้งในการระบาดรอบใหม่ และ ทั้งหมด
          </h5>
          <div className=' is-flex is-justify-content-center'>
            <Chart
              width='500'
              type='area'
              series={allCaseSeries}
              options={options}
            />
          </div>

          <h5 className='subtitle is-5 kanit-light acenter'>
            จำนวนการตรวจหาเชื้อในแต่ละวัน
          </h5>
          <div className=' is-flex is-justify-content-center'>
            <Chart
              width='500'
              type='line'
              series={newFindingSeries}
              options={findingCaseOptions}
            />
          </div>

          <br />

          <h5 className='subtitle is-5 kanit-light acenter'>
            จำนวนคนในกลุ่มเสี่ยง
          </h5>
          <div className=' is-flex is-justify-content-center'>
            <Chart
              width='500'
              type='line'
              series={riskGroupsSeries}
              options={options}
            />
          </div>

          <h5 className='subtitle is-5 kanit-light acenter'>
            จำนวนการรอผลการตรวจ
          </h5>
          <div className=' is-flex is-justify-content-center'>
            <Chart
              width='500'
              type='bar'
              series={waitingResultSeries}
              options={options}
            />
          </div>
          <p className=' has-text-centered'>
            {' '}
            ข้อมูลล่าสุดเมื่อ {moment(latestDay).format('DD MMMM YYYY')}
            <br />
            อ้างอิงข้อมูลจากเว็บไซต์ ศูนย์ปฏิบัติการฉุกเฉินทางสาธารณสุข
            สำนักงานสาธารณสุขจังหวัดสงขลา <br />
            <a href='https://www.skho.moph.go.th/'>
              https://www.skho.moph.go.th/
            </a>
          </p>

          <br />
          <br />
        </div>
      )
    }
  }
  return (
    <div className='container'>
      <div className=' '>
        <h3 className='title is-4 kanit acenter'>
          สถานการณ์การระบาดของโรคโควิด 19
          <br />
          ระลอกใหม่ จังหวัดสงขลา
        </h3>
        <br />

        {allCaseRender()}
      </div>
    </div>
  )
}
