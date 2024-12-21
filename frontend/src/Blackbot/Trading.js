// import React, { useEffect } from "react";

// const TradingViewWidget = () => {
 
//   useEffect(() => {
//     const container = document.getElementById("tradingview-widget-container");

//     // Remove any existing scripts to prevent duplication
//     while (container.firstChild) {
//       container.removeChild(container.firstChild);
//     }

//     // Create and append the new script
//     const script = document.createElement("script");
//     script.src =
//       "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
//     script.async = true;
//     script.innerHTML = JSON.stringify({
//       width: "100%", 
//       height: "500px",
//       currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
//       isTransparent: false,
//       colorTheme: "#000000",
//       locale: "en",
//       backgroundColor: "#ffff", 
//       shadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
//       borderRadius: "10px"
//     });
//     container.appendChild(script);
//   }, []);
//   return (
//     <div className="bg-[#f3f3f3]">
//     <div className="max-w-7xl mx-auto px-5 pb-16 ">
//       <div className=" mb-8">
//         <h2 className="font-semibold text-green-600 uppercase text-center text-2xl md:text-3xl">
//           Foreign Exchange Markets
//         </h2>
//         <p className="mt-1 text-red-500 text-base font-semibold text-center ">
//           The Foreign Exchange Market, also referred to as the "FOREX" or "FX"
//         </p>
//       </div>
//       <div className="w-full">
//         <div
//           className="tradingview-widget-container"
//           // id="tradingview-widget-container"
//           id="tradingview-widget-container"
//         >
//           <div className="tradingview-widget-container__widget"></div>
//           <div className="tradingview-widget-copyright">
//             <a
//               href="https://www.tradingview.com/"
//               rel="noopener nofollow"
//               target="_blank"
//             >
//               <span className="blue-text">
//                 Track all markets on TradingView
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default TradingViewWidget;



import React, { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const container = document.getElementById("tradingview-widget-container");

    // Remove any existing scripts to prevent duplication
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create and append the new script
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "500px",
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
      backgroundColor: "#ffffff",
      shadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    });
    container.appendChild(script);
  }, []);

  return (
    <div className="bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-5 pb-16 pt-5">
        <div className="mb-8">
          <h2 className="font-semibold  uppercase text-center text-2xl md:text-3xl">
            Foreign Exchange Markets
          </h2>
          <p className="mt-1 text-gray-700 text-base font-medium text-center">
            The Foreign Exchange Market, also referred to as the "FOREX" or "FX"
          </p>
        </div>
        <div className="w-full">
          <div
            className="tradingview-widget-container rounded-lg shadow-lg "
            id="tradingview-widget-container"
          >
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright text-center mt-2">
              <a
                href="https://www.tradingview.com/"
                rel="noopener nofollow"
                target="_blank"
                className="text-blue-500 underline"
              >
                Track all markets on TradingView
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget;
