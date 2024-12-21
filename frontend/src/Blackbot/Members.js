import React from "react";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiFillMacCommand } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa6";
import { GiTrade } from "react-icons/gi";
import { FaMoneyBills } from "react-icons/fa6";
const features = [
  {
    id: 1,
    title: "Exclusive Access",
    description:
      "As a member, you'll gain access to exclusive products, services, and opportunities that are not available to the public.",
    icon: <AiFillCodeSandboxCircle size={24} />,
  },
  {
    id: 1,
    title: "Personalized Support",
    description:
      "Our dedicated support team is always available to assist you with any questions or concerns.",
    icon: <MdOutlineSupportAgent size={24} />,
  },
  {
    id: 1,
    title: "Continuous Learning",
    description:
      "Benefit from ongoing training and development programs designed to help you succeed.",
    icon: <AiFillMacCommand size={24} />,
  },
  {
    id: 1,
    title: "Networking Opportunities",
    description:
      "Connect with like-minded individuals and build valuable relationships within our thriving community.",
    icon: <FaNetworkWired size={24} />,
  },
  {
    id: 1,
    title: "Trade a wide range of assets",
    description:
      "From cryptocurrencies to stocks and forex, our platform offers a diverse selection of trading instruments.",
    icon: <GiTrade size={24} />,
  },
  {
    id: 1,
    title: "Financial Freedom",
    description:
      "Achieve your financial goals and enjoy the freedom and flexibility that comes with being your own boss.",
    icon: <FaMoneyBills size={24} />,
  },
  // Add other feature objects here...
];
export const Members = () => {
  return (
    <div className="bg-[#f3f3f3]">
      <div id="benefit" className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center">
          <h2 className="font-semibold  uppercase text-2xl md:text-3xl mb-8">
            Membership with Benefits
          </h2>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols gap-10 mt-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-transparent border-t-4 border-t-transparent shadow-md  p-6 hover:border-t-indigo-500 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 bg-indigo-400 p-3 rounded-full">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-base text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-gray-800 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
