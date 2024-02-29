import React from 'react'
import GetAll from '../components/GetAll'
import { Link } from 'react-router-dom'

const GetAllScreen = () => {
  


  return (
    <div>
        <GetAll/>
        <Link to="/create">create</Link>
    </div>
  )
}

export default GetAllScreen