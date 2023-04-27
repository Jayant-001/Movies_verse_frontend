import React from 'react'
import Hero from '../components/Hero'
import MoviesList from '../components/MoviesList'

const Home = () => {
  return (
    <div className='h-screen mt-12'>
        {/* <NavBar /> */}
        <Hero />
        {/* <hr /> */}
        <MoviesList />
    </div>
  )
}

export default Home