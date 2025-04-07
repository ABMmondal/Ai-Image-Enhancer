import { useState } from 'react'
import './App.css'
import Home from './components/Home'

function App() {


  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className='text-center mb-8'>
        <h1 className=' text-5xl font-bold text-gray-800 mb-3'> AI Image Enhancer{""}</h1>
        <p> Upload your images and get them ready for the better version of yourself.</p>

      </div>

      <Home/>

      <div className='text-sm text-gray-600 mt-6'>
        Powerd by ABM

      </div>

    </div>
  )
}

export default App
