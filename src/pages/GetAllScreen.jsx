import React from 'react'
import GetAll from '../components/GetAll'
import { Link } from 'react-router-dom'
import GetAllHospitalBranch from '../components/GetAllHospital'

const GetAllScreen = () => {
  


  return (
    <div>
        <GetAll/>
        {/* <GetAllHospitalBranch/> */}
        <Link to="/hospital/create">create</Link>
        {/* <Link to="/create">create</Link> */}
    </div>
  )
}

export default GetAllScreen