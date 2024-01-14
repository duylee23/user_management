import React from 'react'
import homePage from '../assets/images/homePage.jpg'
 const Home = () => {
  return (
    <div className='d-flex flex-column justify-content-around align-items-center py-5'>
        <span> Coding</span>
        <img src={homePage} className='w-75 text-center py-2'></img>
    </div>
  )
}

export default Home;
