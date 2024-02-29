import React from 'react'
import GetAllScreen from '../pages/GetAllScreen'
import { Route, Routes } from 'react-router-dom'
import CreateScreen from '../pages/CreateScreen'
import DetailScreen from '../pages/DetailScreen'
import CreateCategoryScreen from '../pages/CreateCategoryScreen'

const MyRouter = () => {
  return (
    <Routes>
      <Route path='/getall' element={<GetAllScreen />} />
      <Route path='/create' element={<CreateScreen />} />
      <Route path='/detail/:id' element={<DetailScreen />} />
      <Route path='/category/create' element={<CreateCategoryScreen />} />
    </Routes>
  )
}

export default MyRouter