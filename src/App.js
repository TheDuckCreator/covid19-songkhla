import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import './App.css'
import { Helmet } from 'react-helmet'

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
    </div>
  )
}

export default App
