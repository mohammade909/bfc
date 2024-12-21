"use client";
import UserIncome from "./UserIncome";
import UserTransaction from "./UserTransaction";
import { Link } from "react-router-dom";
import UserDashReward from "./UserDashReward";
import { getUser } from "../redux/userSlice";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";


export default function UserDashboard() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const {singleuser } = useSelector(
    (state) => state.allusers
  );
  useEffect(() => {
    dispatch(getUser(auth?.id))

  },[auth?.id]);
  const referralCode = auth?.refferal_code;
  const registerUrl = `https://winxto.top/registration?referral=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(registerUrl)
      .then(() => {
        alert("Referral link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy referral link: ", err);
      });
  };
  return (
    <>
      <main>
        <div className="mx-auto max-w-full ">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Other Activity
              </h2>
            </div>

            <div>
              <dl className="mt-5 grid grid-cols-1 divide-y  divide-gray-200 overflow-hidden bg-white  md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="px-4 m-4 bg-green-500 text-white rounded-lg shadow-xl  border py-5 sm:p-6">
                  <dt className="text-base font-normal">Your Active Plan</dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold ">
                      ${singleuser?.active_plan}
                      <Link
                        to="/user/plan"
                        className="ml-2 text-sm font-medium"
                      >
                        Update Plan
                      </Link>
                    </div>
                  </dd>
                </div>
                <div className="px-4 m-4 bg-blue-500 text-white rounded-lg shadow-xl  border py-5 sm:p-6">
                  <dt className="text-base font-normal">Your Investment</dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold ">
                      ${singleuser?.investment_plan}
                      <Link
                        to="user/retopup"
                        onClick={handleCopy}
                        className="ml-2 text-sm font-medium"
                      >
                        View Detail
                      </Link>
                    </div>
                  </dd>
                </div>

                <div className="px-4 m-4 bg-yellow-500 text-white rounded-lg shadow-xl  border py-5 sm:p-6">
                  <dt className="text-base font-normal">Your Status</dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold ">
                      {singleuser?.status}
                      <Link
                        to="/user/sendsupport"
                        className="ml-2 text-sm font-medium"
                      >
                        Need Support
                      </Link>
                    </div>
                  </dd>
                </div>
                <div className="px-4 m-4 bg-yellow-500 text-white rounded-lg shadow-xl  border py-5 sm:p-6">
                  <dt className="text-base font-normal">Your Active wallet</dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold ">
                      $ {singleuser?.business}
                      <Link
                        to="/user/adddeposite"
                        className="ml-2 text-sm font-medium"
                      >
                        Add More
                      </Link>
                    </div>
                  </dd>
                </div>
                <div className=" m-4 bg-green-500 text-white rounded-lg shadow-xl  border py-5 sm:p-6">
                  <dt className="text-base font-normal">Your referral link:</dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold text-black">
                      <input
                        type="text"
                        value={registerUrl}
                        readOnly
                        className="flex-grow p-2 border rounded mr-2"
                      />
                      <button
                        onClick={handleCopy}
                        className="ml-2 text-sm font-medium text-white"
                      >
                        Copy Link
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="flex justify-space-around gap-x-8">
          <div className="w-1/3 shadow-2xl rounded-2xl">
          <h2 className="text-center py-4 text-xl font-semibold">Income Detail</h2>
            <UserIncome />
          </div>
          <div className="w-2/3 shadow-2xl rounded-2xl">
          <h2 className="text-center py-4 text-xl font-semibold">Last Transaction</h2>
            <UserTransaction />
          </div>
        </div>

        <div className="shadow-2xl rounded-2xl mt-8">
        <h2 className="text-center py-4 text-xl font-semibold">Reward Detail</h2>
          <UserDashReward/>
        </div>
      </main>
    </>
  );
}
