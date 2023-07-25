import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './unit/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'
import styles from '../assets/styles.modules.css'
export default function App() {
  return (
    <div className={styles.display}>
        <Navbar />
        <Routes>   
            <Route path='/' element={<Home />}></Route>     
            <Route path='/search/:id' element={<Results />}></Route>
        </Routes>
    </div>
  )
}
