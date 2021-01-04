import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import './App.css'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Containers/Home'
import About from './Containers/About'
import EditPage from './Containers/Edit'
import Login from './Containers/Login'
import axios from 'axios'
function App() {
  useEffect(() => {
    return () => {}
  }, [])

  let accessKey = localStorage.getItem('accessKey')
  if (accessKey === null) {
    console.log("Don't have access token")
    axios
      .post(process.env.REACT_APP_API_URL + '/case/access/', {
        site: 'TDC-Covid-Songkhla',
      })
      .then((res) => {
        let accessKey = res.data
        localStorage.setItem('accessKey', accessKey)
        window.location.reload()
      })
  }

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>กราฟสถานการณ์การแพร่ระบาดของโรคโควิด 19 ในจังหวัดสงขลา </title>
      </Helmet>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/edit'>
            <EditPage />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  )
}

export default App
