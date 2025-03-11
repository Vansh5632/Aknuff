import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Cards from '../components/Cards'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className='z-20'>

        <Banner />
        </div>
        
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Welcome to Gaming Marketplace
          </h1>
          
          <Cards/>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home