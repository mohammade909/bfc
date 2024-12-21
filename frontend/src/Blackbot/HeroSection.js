import { useState, useEffect } from "react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="bg-white">
      <div
        class="h-full w-full mx-auto relative top-12 pb-20 xl:px-16 px-8 flex md:flex-row flex-col gap-4 justify-center items-center py-10  pt-4">
        <div class="w-full relative">
            <img class="shadow-2xl shadow-rose-600 animate-[spin_12s_linear_infinite] absolute left-0 right-0 rounded-full  max-w-[60%] mx-auto" src="https://techakim.com/sam/tg/7268/li/imgs/profile.jpg" alt="My Image" />
            <img class="relative z-10 rounded-full  max-w-[60%] mx-auto outline outline-[.7rem] outline-offset-[.1rem] outline-rose-400/30" src="https://img.freepik.com/free-photo/robot-gesturing_1048-3571.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid" alt="My Image" />
        </div>
        <div class="w-full flex flex-col justify-center gap-4 md:text-left text-center text-gray-800 md:mt-0 sm:mt-8 mt-4">
            <h1 class="md:text-4xl sm:text-3xl text-2xl font-semibold ">Hello, My name is Samuel Abera</h1>
            <h3 class="capitalize text-rose-400">i'm <span class="typing text-green-500 dark:text-green-700">Treading Bot</span></h3>
            <p>  Welcome to Profit Quest , your trusted platform for smart and simple trading. Whether you're a beginner or an expert, we make trading easy and secure for everyone.</p>
            <div class="sm:mt-4 mt-2">
                <button class="px-6 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full">Get In Touch</button>
            </div>
        </div>
    </div>
    </div>
    </>
  );
}
