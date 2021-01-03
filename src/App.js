import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import './App.css'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Containers/Home'
import About from './Containers/About'
function App() {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>The Duck Creator App </title>
      </Helmet>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/documents'></Route>
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
