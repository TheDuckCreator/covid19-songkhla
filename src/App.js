import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import { Layout, Avatar, Card, Row, Col } from 'antd'
import axios from 'axios'
import './App.css'
import Text from 'antd/lib/typography/Text'
const { Header, Content, Footer } = Layout

function App() {
  const [dailyCase, setdailyCase] = useState(null)
  const [latestActiveCase, setlatestActiveCase] = useState(null)

  useEffect(() => {
    axios.get('https://covid19.th-stat.com/api/open/today').then((res) => {
      console.log(res.data)
      setdailyCase(res.data)
    })
    return () => {}
  }, [])

  useEffect(() => {
    var config = {
      method: 'get',
      url:
        'https://opend.data.go.th/get-ckan/datastore_search_sql?sql=SELECT * from "24ac8406-0cf9-4f8e-a55e-b53cf6766d1a" ORDER BY no DESC LIMIT 20',
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        withCredentials: true,
      },
    }

    axios(config)
      .then(function (res) {
        console.log(res.data)
        setlatestActiveCase(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })

    return () => {}
  }, [])
  return (
    <div>
      <Header>
        <div className='d-flex pt-3 kanit'>
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            TC
          </Avatar>
          <h3 className='text-white ml-2 '>TDC COVID-19 </h3>
        </div>
      </Header>

      <Content style={{ padding: '50px 50px' }}>
        <div className='site-layout-content'>
          <Card title='ข้อมูลสถานะ COVID-19 รายวัน' className='kanit'>
            {dailyCase && (
              <>
                <h3>
                  {' '}
                  {dailyCase.Confirmed} รายการ{' '}
                  <Text type='warning'> (+ {dailyCase.NewConfirmed} ราย) </Text>{' '}
                </h3>
                <Row>
                  <Col span={8}>
                    <h5>เสียชีวิต</h5>
                    <h5>
                      {' '}
                      {dailyCase.Deaths} ราย{' '}
                      <span className='text-danger'>
                        {' '}
                        + {dailyCase.NewDeaths} ราย
                      </span>
                    </h5>
                  </Col>
                  <Col span={8}>
                    <h5>รักษาอยู่</h5>
                    <h5>
                      {' '}
                      {dailyCase.Hospitalized} ราย{' '}
                      <span className='text-success'>
                        {' '}
                        + {dailyCase.NewHospitalized} ราย
                      </span>
                    </h5>
                  </Col>
                  <Col span={8}>
                    <h5>รักษาหาย</h5>
                    <h5>
                      {' '}
                      {dailyCase.Recovered} ราย{' '}
                      <span className='text-info'>
                        {' '}
                        + {dailyCase.NewRecovered} ราย
                      </span>
                    </h5>
                  </Col>
                </Row>
                <br />
                <h6 className='text-muted'>
                  {' '}
                  ข้อมูล ณ วันที่ {dailyCase.UpdateDate}{' '}
                </h6>
              </>
            )}
          </Card>

          <br />
          <Card title='ข้อมูลสถานะ 50 Case ล่าสุด' className='kanit'></Card>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </div>
  )
}

export default App
