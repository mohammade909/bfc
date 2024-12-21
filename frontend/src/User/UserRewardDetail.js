import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../BaseFile/comman/Loader";
import { getUser } from "../redux/userSlice";


const thresholds = [2500, 5000, 10000, 25000, 50000, 150000, 250000, 500000, 1000000, 2500000, 5000000, 20000000, 50000000];
const rewardValues = [30, 60, 120, 300, 600, 2000, 5000, 15000, 35000, 50000, 75000, 100000, 125000];

const UserRewardDetail = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { loading, singleuser } = useSelector((state) => state.allusers);

  useEffect(() => {
    dispatch(getUser(auth?.id));
  }, [dispatch, auth?.id]);
  const reward_level = singleuser?.reward_level || 0;
console.log(reward_level)
  return (
    <>
      <div className="">
        <div className="relative flex flex-col w-full h-full mb-4 text-black bg-gray-300 px-3 py-1 shadow-md rounded-lg bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
        <h1 className="p-3">Reward Detail</h1>

              <table className="w-full text-left table-auto min-w-max border">
                <thead>
                  <tr>
                    <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        ID
                      </p>
                    </th>
                    <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        Required Amount
                      </p>
                    </th>
                    {/* <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        Self Business
                      </p>
                    </th> */}
                    <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        Reward Amount
                      </p>
                    </th>
                    <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        Business Ratio
                      </p>
                    </th>
                   
                    <th className="p-2 md:p-4 border-b border-slate-200 bg-black w-16">
                      <p className="text-xs md:text-sm font-normal leading-none text-white">
                        Achieve
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800">
                  {thresholds.map((item, index) => {
                    return (
                      <tr key={index} className="even:bg-gray-900">
                        <td className="whitespace-nowrap py-2 md:py-4 pl-4 pr-3 text-xs md:text-sm font-medium text-gray-300 sm:pl-3">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                          ${item}
                        </td>
                       
                        <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                          ${rewardValues[index]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                          40% : 30% : 30%
                        </td>
                        
                        <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                          {reward_level <= index ? (
                            <div className="bg-red-300 text-black p-2 rounded">
                              {" "}
                              Remain{" "}
                            </div>
                          ) : (
                            <div className="bg-green-300 text-black p-2 rounded">
                              {" "}
                              Archive{" "}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserRewardDetail;
