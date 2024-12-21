import React, { useEffect, useState } from "react";
import axios from "axios";

const Forexapi = () => {
  const [forexData, setForexData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForexData = async () => {
      try {
        const response = await axios.get(
          "http://fcsapi.com/api-v3/forex/latest?symbol=all_forex&access_key=8Opsw0RagcHgmDjlGSneJ"
        );
        console.log(response);
        setForexData(response.data.response); // Assuming the API response structure has data under 'response'
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchForexData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="bg-black  mt-8 ">
        <div className="max-w-7xl mx-auto px-5">
          <div className="lg:flex lg:items-center gap-8">
            {/* <div className="lg:w-2/5 md:w-full w-full">
              <h2 className="font-semibold text-[#42d1f5] uppercase text-2xl md:text-3xl">
                Forex
              </h2>
              <p className="mt-4 text-gray-200 text-base text-justify">
              Stay ahead in the dynamic world of foreign exchange with Black Bot's real-time forex trading capabilities. Our platform provides you with up-to-the-minute market data and powerful tools to maximize your trading potential.
              </p>
              <p className="mt-4 text-gray-200 text-base text-justify">
              Experience the volatility and opportunity in major currency pairs like GBP/USD, which has seen a significant 0.5% increase, or EUR/JPY with its notable 0.22% rise. Whether you're interested in major pairs or exotic currencies, our comprehensive forex offerings cater to all trading strategies.
              </p>
              <p className="mt-4 text-gray-200 text-base text-justify">
              With Black Bot, you'll have access to a wide range of currency pairs, competitive spreads, and advanced charting tools to help you make informed trading decisions in the fast-paced forex market.
              </p>
              <div className="mt-12">
                <a
                  href="#"
                  className=" uppercase hover:text-gray-900 font-medium bg-[#42d1f5] hover:bg-[#1ab3d9] text-sm px-4 rounded-md hover:rounded-full transition duration-700 ease-in-out text-black py-2"
                >
                  Learn More
                </a>
              </div>
            </div> */}
            <div className="mt-8 flow-root  md:w-full w-full">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border">
                    <div className="relative">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-900 sticky top-0 z-10">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white w-1/4"
                            >
                              Symbol
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white w-1/4"
                            >
                              Last Price
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white w-1/4"
                            >
                              Change
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-white w-1/4"
                            >
                              per.%
                            </th>
                          </tr>
                        </thead>
                      </table>
                      <div className="overflow-y-auto h-[400px]">
                        <table className="min-w-full divide-y divide-gray-300">
                          <tbody className="divide-y divide-gray-200 bg-gray-800">
                            {forexData.map((item, index) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 w-1/4">
                                  {item.s}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 w-1/4">
                                  {item.l}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 w-1/4">
                                  {item.ch}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 w-1/4">
                                  {item.cp}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forexapi;
