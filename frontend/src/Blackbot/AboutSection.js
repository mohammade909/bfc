import React from "react";

export const AboutSection = () => {
  return (
    <>
   


<div className="container mx-auto flex px-5   md:flex-row flex-col items-center">
  <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">About Us
    </h1>
    <p className="mb-8 leading-relaxed text-justify"> Our mission is to provide a secure and transparent
                              trading platform that offers cutting-edge
                              technology, expert insights, and profitable
                              opportunities. We are dedicated to fostering
                              financial growth for our investors by delivering
                              exceptional value, education, and support at every
                              step of their Forex journey financial growth for our investors by delivering
                              exceptional value, education, and support at every
                              step of their Forex journey technology, expert insights, and profitable
                              opportunities. We are dedicated to fostering
                              financial growth for our investors by delivering.</p>
    <div className="flex justify-center">
      <a href className="inline-flex text-white bg-blue-500 border-0 py-2 text-sm px-6 focus:outline-none hover:bg-blue-600 rounded ">Read</a>
    </div>
  </div>
  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <img className="object-cover object-center rounded" alt="hero" src="./bot125.png" />
  </div>
</div>

    </>
  );
};
