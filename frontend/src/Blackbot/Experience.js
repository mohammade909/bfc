import React from "react";
const products = [
    {
      id: 1,
      image: 'https://redpixelthemes.com/assets/images/icon-ecommerce-green.svg',
      title: 'Advanced Trading Tools',
      description: 'Use easy-to-understand charts, market analysis, and real-time data to make smart trading decisions.',
     
    },
    {
      id: 2,
      image: 'https://redpixelthemes.com/assets/images/icon-blog-green.svg',
      title: 'Global Market Access',
      description: 'Trade in stocks, forex, commodities, and cryptocurrencies across major global markets.',
    },
    
      {
        id: 4,
        image: 'https://redpixelthemes.com/assets/images/icon-business-green.svg',
        title: 'Secure & Reliable',
        description: 'Your funds and data are protected with top-level security, ensuring your trading experience is safe.',
      },
      {
        id: 3,
        image: 'https://redpixelthemes.com/assets/images/icon-startup-green.svg',
        title: '24/7 Support',
        description: ' Get help anytime with our 24/7 support team, ready to help you whenever you need it.',
      },
    // Add more products as needed
  ];
const ForexRobotCard = () => {
  return (
    <>
    <div className="bg-[#f7f4f4]">
    <section className="max-w-7xl mx-auto pb-12 pt-6  px-0  md:px-0">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold px-4 lg:text-center text-justify  mb-1">Why Choose JastroFX?
            </h1>
            <p className="lg:text-base text-sm px-4 lg:text-center text-justify ">JastroFX offers you everything you need to trade smarter and safer. Our platform is designed for both beginners and experts to succeed.
            </p>
        </div>
      <section className="py-5  px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10  ">
        {products.map(product => (
          <section
            key={product.id}
            className="px-4 py-10  rounded-md text-center transform duration-500 bg-white shadow-sm cursor-pointer"
          >
            <img src={product.image} alt={product.title} className="w-16 h-16 mx-auto" />
            <div className="mt-8">
            <h1 className="text-base mb-1 font-semibold text-center text-indigo-500">{product.title}</h1>
            <p className="mb-5 text-[13px] text-center text-gray-800">{product.description}</p>
            </div>
            
          </section>
        ))}
      </section>
    </section>
    </div>
    </>
  );
};

export default ForexRobotCard;
