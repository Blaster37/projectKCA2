import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from "./Login"
import SignUp from "./SignUp"
import { Routes, Route } from "react-router-dom";
import StudentAttendance from './dashboard'

function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard"element={<StudentAttendance/>}/>
      </Routes>


    </>
  )
}

export default App
