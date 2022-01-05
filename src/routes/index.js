import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Create from '../pages/Create'
import Clients from '../pages/Clients'

export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='create' element={<Create />} />
        <Route path='clients' element={<Clients />} />
      </Routes>
    </Router>
  )
}
