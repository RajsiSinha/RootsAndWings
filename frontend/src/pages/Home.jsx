import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import Stories from '../components/Home/Stories'
import Footer from '../components/Home/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        <Stories/>
        <Footer/>
    </div>
  )
}

export default Home
