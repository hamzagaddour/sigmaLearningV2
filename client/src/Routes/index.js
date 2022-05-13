import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Profil from '../pages/Profil'
import NavBar from '../components/NavBar'
import SignIn from '../components/Log/SignInForm'
import SignUpForm from '../components/Log/SignUpForm'
import PageCourse from '../components/profilComponents/Learner/PageCourse'
import Qcm from '../components/profilComponents/Learner/Qcm'

const index = (props) => {
  console.log(props.uid);
  return (
    <Router>
    <NavBar/>
        <Routes>
            <Route path='/' element={<Home uid={props.uid}/>}/>
            <Route path='/profil' element={<Profil/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/course' element={<PageCourse/>}/>
            <Route path="/qcm" element={<Qcm/>}/>

        </Routes>
    </Router>
  )
}

export default index
