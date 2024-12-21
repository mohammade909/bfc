import React from "react";
const stats = [
  { id: 1, name: "Estabished", value: "2024" },
  { id: 2, name: "Registered User", value: "50,000 +" },
  { id: 3, name: "Product", value: "46,000" },
];
const TrustedBroker = () => {
  return (
    <>
      <section className="bg-[#f3f3f3] pb-16  ">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="mt-12 md:mt-0   relative p-[2px] rounded-md">
              <img
                src="https://img.freepik.com/free-photo/person-office-analyzing-checking-finance-graphs_23-2150377129.jpg?uid=R176823449&ga=GA1.1.1433286368.1718702777&semt=ais_hybrid"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="font-semibold  uppercase text-2xl md:text-3xl">
                The Future of Forex{" "}
              </h2>
              <p className="mt-4 text-gray-800 text-sm text-justify">
                Increased Global Participation: The Forex market is set to
                grow with more emerging markets participating. As economies like
                India, Brazil, and Southeast Asia expand, their currency markets
                will play a larger role in global Forex trading.
              </p>
              <p className="mt-4 text-sm text-justify">
                Technological Advancements: The rise of AI, machine learning,
                and blockchain is revolutionizing Forex trading. These
                technologies will enable more precise trading strategies, faster
                execution, and increased transparency through decentralized
                systems.
                Technological Advancements: The rise of AI, machine learning,
                and blockchain is revolutionizing Forex trading. These
                technologies will enable more precise trading strategies, faster
                execution, and increased transparency through decentralized
                systems.
              </p>
              
             
              <div className="mt-12">
                <a
                  href="#"
                  className=" uppercase hover:text-white font-medium bg-indigo-500 hover:bg-indigo-600 text-xs px-4 rounded-md text-white py-3"
                >
                  Find out more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedBroker;
