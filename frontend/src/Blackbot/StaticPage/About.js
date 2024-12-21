import React from 'react'
import { Header } from '../Header'
import Footer from '../Footer'

export const About = () => {
  return (
    <>
    <Header/>
   
    <section className=" bg-gray-50 ">
  {/* Title */}
  
  <div className="max-w-7xl mx-auto h-full flex flex-col items-center md:py-4 py-10">
    {/* Col - 2 */}
    <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-4">
      {/*  */}
      <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" src="https://img.freepik.com/free-photo/market-share-competitor-excellent-growing-with-stocks_1150-18257.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="billboard image" />
      <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
          veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
          sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
          nobis tempora possimus ullam!</p>
      </div>
    </div>
    {/* Col - 3 */}
    <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col flex-col-reverse lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-6">
      {/*  */}
      <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
          veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
          sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
          nobis tempora possimus ullam!</p>
      </div>
      {/*  */}
      <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" src="https://img.freepik.com/free-photo/woman-interacting-with-money_23-2151664811.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="billboard image" />
    </div>
  </div>
</section>
    
     <Footer/>
    </>
   
  )
}
