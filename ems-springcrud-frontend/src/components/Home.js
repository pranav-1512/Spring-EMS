import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div>
      <h1>Welcome To EMS</h1>
    </div>
    <div>
        <Link to="/empform"><button style={{margin:"10px"}}>Employee</button></Link>
        <Link to="/deptform"><button style={{margin:"10px"}}>Department</button></Link>
    </div>
    </>
  )
}

export default Home
