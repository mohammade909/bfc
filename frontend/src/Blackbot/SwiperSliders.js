// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// export default function SwiperSlides() {
//   return (
//     <>
//       <div className="lg:mt-[84px] sm:mt-[80px] mt-[80px]">
//         <Swiper
//           navigation={false}
//           modules={[Navigation, Autoplay]}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           className="w-full h-auto"
//         >
//           <SwiperSlide className="flex justify-center items-center">
//             <img
//               src="trading.png"
//               alt="Trading"
//               className="w-full h-[500px] object-cover"
//             />{" "}
//             {/* Set height */}
//           </SwiperSlide>
//           <SwiperSlide className="flex justify-center items-center">
//             <img
//               src="blackrobot.png"
//               alt="Black Robot"
//               className="w-full h-[500px] object-cover"
//             />{" "}
//             {/* Set height */}
//           </SwiperSlide>
//           <SwiperSlide className="flex justify-center items-center">
//             <img
//               src="https://static.vecteezy.com/system/resources/thumbnails/040/895/879/small_2x/ai-generated-back-view-of-a-financial-analyst-day-trader-robot-working-on-computer-with-many-screens-that-shows-real-time-stock-data-photo.jpg"
//               alt="ai-generated"
//               className="w-full h-[500px] object-cover"
//             />{" "}
//             {/* Set height */}
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </>
//   );
// }


import { Link } from "react-router-dom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SwiperSlides() {
  return (
    <>
      {/* Responsive Swiper container */}
      <div className="lg:mt-[84px] sm:mt-[80px] mt-[80px] max-w-7xl mx-auto px-4"> 
        {/* Restrict the width and center */}
        <Swiper
          navigation={false}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full h-auto"
        >
          {/* First Slide */}
          <SwiperSlide className="relative">
            <img
              src="bot124.jpg"
              alt="Trading"
              className="w-full object-cover h-[300px] md:h-[400px] lg:h-[500px]" 
              // Ensures height adapts across screen sizes
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Welcome to JFX Portal
              </h1>
              {/* <p className="text-sm sm:text-base md:text-lg mb-4">
                Your gateway to the world of forex trading.
              </p> */}
             <Link
                to="/registration"
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full"
              >
                Join Now
              </Link>
            </div>
          </SwiperSlide>

          {/* Second Slide */}
          <SwiperSlide className="relative">
            <img
              src="bot123.jpg"
              alt="Black Robot"
              className="w-full object-cover h-[300px] md:h-[400px] lg:h-[500px]"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Explore JFX Opportunities
              </h1>
              {/* <p className="text-sm sm:text-base md:text-lg mb-4">
                Maximize your trading potential with advanced tools.
              </p> */}
              <Link
                to="/registration"
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full"
              >
                Join Now
              </Link>
            </div>
          </SwiperSlide>

          {/* Third Slide */}
          <SwiperSlide className="relative">
            <img
              src="bot122.jpg"
              alt="AI-Generated"
              className="w-full object-cover h-[300px] md:h-[400px] lg:h-[500px]"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                AI-Powered JFX 
                </h1>
              {/* <p className="text-sm sm:text-base md:text-lg mb-4">
                Leverage AI for smarter, faster trading decisions.
              </p> */}
              <Link
                to="/registration"
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full"
              >
                Join Now
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

