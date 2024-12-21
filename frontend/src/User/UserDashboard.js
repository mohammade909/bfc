import React from "react";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import UserTransaction from "./UserTransaction";
import { getTreeData } from "../redux/referralSlice";
import { getUser } from "../redux/userSlice";
import { getAllDepositeByid } from "../redux/depositeSlice";
import { getAllWithdrawalByid } from "../redux/withdrawalSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserRewardDetail from "./UserRewardDetail";
import Trading from "./Trading";
import NotificationPopup from "./NotificationPopup";
import NotificationList from "./NotificationList";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { singleuser } = useSelector((state) => state.allusers);
  const { singleDeposite } = useSelector((state) => state.alldeposite);
  const { singleWithdrawal } = useSelector((state) => state.allwithdrawal);
  const { treeData } = useSelector((state) => state.referralTree);
  const [topGenerations, setTopGenerations] = useState([]);
  const [totalBusiness, setTotalBusiness] = useState();

  useEffect(() => {
    dispatch(getUser(auth?.id));
    dispatch(getAllDepositeByid(auth?.id));
    dispatch(getAllWithdrawalByid(auth?.id));
    dispatch(getTreeData(auth?.refferal_code));
  }, [auth?.id]);
  const referralCode = auth?.refferal_code;
  const registerUrl = `https://www.jastrobot.com/registration?referral=${referralCode}`;



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

  let combinedArray = [];
  const depositsWithType =
    singleDeposite?.map((deposit) => ({ ...deposit, type: "deposit" })) || [];
  const withdrawalsWithType =
    singleWithdrawal?.map((withdrawal) => ({
      ...withdrawal,
      type: "withdrawal",
    })) || [];
  if (withdrawalsWithType.length > 0) {
    combinedArray = [...depositsWithType, ...withdrawalsWithType];
    combinedArray.sort((a, b) => new Date(a.createdAT) - new Date(b.createdAT));
  }
  const totalDeposits = depositsWithType?.reduce(
    (total, deposit) => total + (deposit.amount || 0),
    0
  );
  const totalWithdrawals = withdrawalsWithType?.reduce(
    (total, withdrawal) => total + (withdrawal.amount || 0) + (withdrawal.deduction || 0),
    0
  );

  function countTotalTeamWithActiveInactive(user) {
    let totalTeam = 0;
    let activeCount = 0;
    let inactiveCount = 0;
    const stack = [user]; // Use a stack to keep track of users to process

    while (stack.length > 0) {
      const currentUser = stack.pop();
      totalTeam += 1; // Count the current user

      // Check if the user is active or inactive
      if (currentUser.is_active === "active") {
        activeCount += 1;
      } else if (currentUser.is_active === "inactive") {
        inactiveCount += 1;
      }

      // Add all referrals to the stack
      if (currentUser.referrals && currentUser.referrals.length > 0) {
        stack.push(...currentUser.referrals);
      }
    }

    return { totalTeam, activeCount, inactiveCount };
  }

  const totalDirectActiveMembers = treeData?.filter(
    (user) => user.is_active === "active"
  ).length;
  const totalDirectInactiveMembers = treeData?.filter(
    (user) => user.is_active === "inactive"
  ).length;

  let totalTeamCount = 0;
  let totalActiveMembers = 0;
  let totalInactiveMembers = 0;

  treeData?.forEach((user) => {
    const { totalTeam, activeCount, inactiveCount } =
      countTotalTeamWithActiveInactive(user);
    totalTeamCount += totalTeam;
    totalActiveMembers += activeCount;
    totalInactiveMembers += inactiveCount;
  });

/// Function to calculate business for a given user and their entire team (referrals and descendants)
const calculateBusinessForTeam = (user) => {
  let totalBusiness = user.active_plan || 0;

  // If user has referrals, recursively add business for each referral
  if (user.referrals && user.referrals.length > 0) {
    user.referrals.forEach((referral) => {
      totalBusiness += calculateBusinessForTeam(referral); // Recursively calculate for all referrals
    });
  }

  return totalBusiness;
};

useEffect(() => {
  if (treeData) {
    const businessByLeg = calculateBusinessForLegs(treeData);
    const sortedLegs = Object.entries(businessByLeg)
      .map(([legId, totalBusiness]) => ({
        legId: parseInt(legId),
        totalBusiness,
      }))
      .sort((a, b) => b.totalBusiness - a.totalBusiness)
      .slice(0, 3); // Top 3 legs

      setTopGenerations(sortedLegs);  // Storing top 3 legs
    setTotalBusiness(Object?.values(businessByLeg)?.reduce((acc, value) => acc + value, 0));
  }
}, [treeData]);

// Function to calculate business for each direct leg (child)
const calculateBusinessForLegs = (users) => {
  const result = {};

  // Iterate over each direct child (leg)
  users?.forEach((user) => {
    // Initialize total business for each direct child
    result[user.id] = calculateTeamBusiness(user); 
  });

  return result;
};

// Helper function to calculate total business for a team (user + their referrals)
const calculateTeamBusiness = (user) => {
  let totalBusiness = user.active_plan || 0;

  // Recursively calculate business for all referrals
  if (user.referrals && user.referrals.length > 0) {
    user.referrals.forEach((referral) => {
      totalBusiness += calculateTeamBusiness(referral);
    });
  }

  return totalBusiness;
};


  
  const cardData = [
    {
      id: 1,
      value: `$ ${singleuser?.active_plan}`,
      description: "Your Active Plan",
      svgPath: (
        <>
          <path d="M8 17l4 4 4-4m-4-5v9"></path>
          <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
        </>
      ),
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-700",
      gredient: "border-t bg-gradient-to-r from-gray-900 to-blue-900",
    },
    {
      id: 2,
      value: `$ ${singleuser?.roi_income}`,
      description: "ROI",
      svgPath: (
        <>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
        </>
      ),
      bgColor: "bg-green-500",
      iconBgColor: "bg-green-700",
      gredient: "border-t bg-gradient-to-r from-green-900 to-gray-900",
    },
    {
      id: 3,
      value: `$ ${singleuser?.investment_month}` || 0,
      description: "Level Income",
      upadtePlan: "Need Support",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 12h16.5m-16.5 6h16.5m-16.5-12h16.5"
            />
          </svg>
        </>
      ),
      bgColor: "bg-red-500",
      iconBgColor: "bg-red-700",
      gredient: " border-t bg-gradient-to-r from-gray-900 to-red-900",
    },
    {
      id: 4,
      value: `$ ${singleuser?.reward}`,
      description: "Reward",
      upadtePlan: "Add More",
      svgPath: (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </>
      ),
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-700",
      gredient: "border-t bg-gradient-to-r from-yellow-900 to-gray-900",
    },
    {
      id: 4,
      value: `$ ${singleuser?.compound}`,
      description: "Active Compound",
      upadtePlan: "Add More",
      svgPath: (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </>
      ),
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-700",
      gredient: "border-t bg-gradient-to-r from-yellow-900 to-gray-900",
    },
    {
      id: 4,
      value: `$ ${singleuser?.compund_roi_total + singleuser?.compound_level_total}`,
      description: "Compound Income",
      upadtePlan: "Add More",
      svgPath: (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </>
      ),
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-700",
      gredient: "border-t bg-gradient-to-r from-yellow-900 to-gray-900",
    },
    {
      id: 5,
      value: `$ ${singleuser?.direct_income}`,
      description: "Direct Income",
      upadtePlan: "Add More",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m0 0l-3-3m3 3l-3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-700",
      gredient: "border-t bg-gradient-to-r from-gray-900 to-indigo-900",
    },
    {
      id: 6,
      value: `$ ${totalWithdrawals}`,
      description: "Total Withdrawal",
      upadtePlan: "Copy Link",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      gredient: "border-t bg-gradient-to-r from-purple-900 to-gray-900",
    },
   
    {
      id:7,
      // value: `$ $` || 0,
      value: `$${totalBusiness}`,
      description: "Total Business",
      // upadtePlan: "Copy Link",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      gredient: "border-t bg-gradient-to-r from-purple-900 to-gray-900",
    },
    {
      id: 8,
      value: `${topGenerations?.[0]?.totalBusiness  ? "$"+ topGenerations?.[0]?.totalBusiness : 0 }`,
      description: "Power Leg One",
      // upadtePlan: "Copy Link",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      gredient: "border-t bg-gradient-to-r from-purple-900 to-gray-900",
    },
    {
      id: 9,
      value: `${topGenerations?.[1]?.totalBusiness  ? "$"+ topGenerations?.[1]?.totalBusiness : 0 }`,
      description: "Power Leg Two",
      // upadtePlan: "Copy Link",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      gredient: "border-t bg-gradient-to-r from-purple-900 to-gray-900",
    },
    {
      id: 10,
      value: `${topGenerations?.[2]?.totalBusiness  ? "$"+topGenerations?.[2]?.totalBusiness : 0 }`,
      description: "Power Leg Three",
      // upadtePlan: "Copy Link",
      svgPath: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </>
      ),
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
      gredient: "border-t bg-gradient-to-r from-purple-900 to-gray-900",
    },
  ];

  const stat = [
    {
      name: "Total Team",
      // initials: "TT",
      href: "#",
      members: `${totalTeamCount} Member` || 0,
      // bgColor: "bg-yellow-500",
      gredient: "bg-gradient-to-r from-gray-900 to-yellow-900 shadow-lg ",
    },
    {
      name: "Total Direct",
      // initials: "TD",
      href: "#",
      members: `${
        totalDirectActiveMembers + totalDirectInactiveMembers
      } Member`,
      // bgColor: "bg-purple-600",
      gredient: "bg-gradient-to-r from-gray-900 to-purple-900 shadow-lg ",
    },
    {
      name: "Active Wallet",
      // initials: "AW",
      href: "#",
      members: `$ ${singleuser?.business}`,
      // bgColor: "bg-pink-600",
      gredient: "bg-gradient-to-r from-gray-900 to-pink-900 shadow-lg ",
    },
    {
      name: "Active Sponser",
      // initials: "AS",
      href: "#",
      members: `${totalDirectActiveMembers} Member`,
      // bgColor: "bg-blue-600",
      gredient: "bg-gradient-to-r from-gray-900 to-blue-900 shadow-lg ",
    },
    {
      name: "Inactive Sponser",
      // initials: "IS",
      href: "#",
      members: `${totalDirectInactiveMembers} Member`,
      // bgColor: "bg-red-600",
      gredient: "bg-gradient-to-r from-gray-900 to-red-900 shadow-lg ",
    },
    {
      name: "Reward Rank",
      // initials: "RR",
      href: "#",
      members: `${singleuser?.reward_level} Level`,
      // bgColor: "bg-green-600",
      gredient: "bg-gradient-to-r from-gray-900 to-green-900 shadow-lg ",
    },
  ];

  const incomedetail = [
    {
      id: 1,
      name: "Total Earning",
      stat:
        `$ ${(
          singleuser?.direct_income +
          singleuser?.investment_month +
          singleuser?.roi_income +
          singleuser?.reward
        ).toFixed(2)}` || " - ",
      icon: CursorArrowRaysIcon,
      iconColor: "text-indigo-500",
      change: "3.2%",
      changeType: "decrease",
      bgColor: "bg-indigo-800",
      gredient:
        "bg-gradient-to-r from-indigo-900 to-gray-900 shadow-lg shadow-indigo-500/50",
    },
    {
      id: 2,
      name: "Referral Code",
      stat: singleuser?.refferal_code || " - ",
      icon: ClipboardDocumentIcon,
      iconColor: "text-red-500",
      change: "1.2%",
      changeType: "increase",
      bgColor: "bg-red-800",
      gredient:
        "bg-gradient-to-r from-red-900 to-gray-900 shadow-lg shadow-red-500/50",
    },
    
    {
      id: 3,
      name: "Reffer By",
      stat: singleuser?.reffer_by || " - ",
      icon: CursorArrowRaysIcon,
      iconColor: "text-yellow-500",
      change: "3.2%",
      changeType: "decrease",
      bgColor: "bg-yellow-800",
      gredient:
        "bg-gradient-to-r from-gray-900 to-yellow-900 shadow-lg shadow-yellow-500/50",
    },
   
   
    {
      id: 4,
      name: "Status",
      stat: singleuser?.status || " - ",
      icon: ClipboardDocumentIcon,
      iconColor: "text-orange-500",
      change: "1.2%",
      changeType: "increase",
      bgColor: "bg-orange-800",
      gredient:
        "bg-gradient-to-r from-orange-900 to-gray-900 shadow-lg shadow-red-500/50",
    },
    {
      id: 5,
      name: "Active Team",
      stat: `${totalActiveMembers} Member`,
      icon: UsersIcon,
      iconColor: "text-green-500",
      change: "122",
      changeType: "increase",
      bgColor: "bg-green-800",
      gredient:
        "bg-gradient-to-r from-green-900 to-gray-900 shadow-lg shadow-green-500/50",
    },
    {
      id: 6,
      name: "Inactive Team",
      stat: `${totalInactiveMembers} Member` || "0",
      icon: EnvelopeOpenIcon,
      iconColor: "text-blue-500",
      change: "5.4%",
      changeType: "increase",
      bgColor: "bg-blue-800",
      gredient:
        "bg-gradient-to-r from-gray-900 to-blue-900 shadow-lg shadow-blue-500/50",
    },
  ];

  console.log(treeData)
  return (
    <>
      <div className="">
        <Trading />
      </div>
      <div className="flex justify-between w-full gap-5 mb-5  ">
        <section className="text-gray-700 body-font  mx-2 rounded-md mt-4 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* First column (6 columns) */}
            <div className=" bg-gray-50 drop-shadow-lg shadow--500/50 rounded-md">
              <div className="px-4 lg:mx-auto lg:max-w-7xl ">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    <div className="">
                      <div>
                        <div className="ml-4">
                          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-2xl text-gray-800 font-bold">
                            Welcome, {singleuser?.username}
                          </h1>
                          <p className="text-lg text-gray-400 mt-1">
                            Username: {singleuser?.email}
                          </p>
                        </div>
                        <dl className="mt-6 flex flex-col sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-400 sm:mr-6 sm:mt-0">
                            <CheckCircleIcon
                              aria-hidden="true"
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            />
                            Dashboard
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second column (6 columns) */}
            <aside className="w-full lg:w-full overflow-y-auto rounded-md py-2 border-gray-200 bg-gray-50 custom-shadow">
              <h2 className="text-lg font-medium leading-6 px-3 text-center text-black pb-3 pt-2">
                Referral Link
              </h2>
              <div>
                <div className="relative flex justify-center mb-5">
                  {/* <img
          className="w-full lg:w-64 object-cover"
          src="/bot2.png"
          alt="Image"
        /> */}
                </div>
                <div className="flex justify-center px-4 my-5">
                  <input
                    type="text"
                    value={registerUrl}
                    readOnly
                    className="flex-1 lg:w-28 w-full rounded-md bg-gray-800 border border-gray-300 px-3 py-2 text-sm text-gray-200 mr-2"
                  />
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white bg-black"
                  >
                    <ClipboardDocumentIcon
                      className="h-5 w-5 text-center"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div className="w-full mx-auto">
            <div className="relative group py-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center space-x-2">
                {/* Icon */}
                <span className="flex items-center border border-transparent rounded-full px-4 py-1 text-sm transition-colors duration-300 group-hover:border-yellow-500">
                  <span className="text-amber-500 transition-transform transform group-hover:scale-125 duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M12.293 9.293a1 1 0 011.414 0L17 12.586V4a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1h8.586l-3.293-3.293a1 1 0 011.414-1.414L15 15.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L12.586 17H4a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v8.586a1 1 0 01-2 0V4H4v12h8.586L12.293 9.293z" />
                    </svg>
                  </span>
                  {/* Text */}
                  <span className=" border border-transparent text-amber-500 rounded-full px-2 py-1 text-sm transition-colors duration-300  group-hover:text-amber-500">
                    Other Activity
                  </span>
                </span>
              </h3>
            </div>
            <div className="flex flex-wrap -m-4">
              {cardData.map((card) => (
                <div key={card.id} className="p-4 md:w-1/3 sm:w-1/2 w-full">
                  <div
                    className={`flex items-center justify-between p-5 rounded-lg transform transition duration-500 hover:scale-105 bg-white group relative group`}
                  >
                    <div className="text-left">
                      <div className="flex items-baseline">
                        <h2 className="title-font font-bold text-2xl text-gray-700">
                          {card.value}
                        </h2>
                        <span className="ml-2 text-gray-700 text-xs font-bold">
                          {card.updatePlan}
                        </span>
                      </div>
                      <p className="leading-relaxed text-gray-700 mt-1">
                        {card.description}
                      </p>
                    </div>
                    <div
                      className={`ml-auto p-2 rounded-full bg-black flex items-center justify-center`}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="text-white w-6 h-6  "
                        viewBox="0 0 24 24"
                      >
                        {card.svgPath}
                      </svg>
                    </div>
                    {/* Span moved inside the parent div with the group class */}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 ${card.iconBgColor.replace(
                        "text-",
                        "bg-"
                      )} opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 origin-left transform scale-x-0`}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full px-2 gap-5 ">
        <main className="flex-1 overflow-y-auto px-5 pt-2 pb-5 rounded-md bg-gray-100 custom-shadow ">
          <div>
            <div className="relative group py-2 inline-block">
              <h3 className="text-base font-semibold leading-6 text-black">
                Last 30 days
              </h3>
              <span className="absolute left-0 bottom-0 w-full h-0.5 mb-2 bg-blue-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 origin-left transform scale-x-0"></span>
            </div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 ">
              {incomedetail.map((item) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-lg bg-white px-4 py-5  shadow sm:p-6 transition duration-300 ease-out transform hover:scale-105 hover:shadow-lg group ${item.iconColor}`}
                >
                  <dt className="flex items-center">
                    <div
                      className={`rounded-lg p-3 bg-black transition duration-500 ease-in-out animate-border-color hover:animate-pulse`}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white "
                      />
                    </div>
                    <div className="ml-4">
                      <p className="truncate text-sm font-medium text-gray-700 whitespace-pre-line break-all">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 whitespace-pre-line break-all">
                        {item.stat}
                      </p>
                    </div>
                  </dt>
                  {/* Hover border bottom effect */}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 ${item.iconColor.replace(
                      "text-",
                      "bg-"
                    )} opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 origin-left transform scale-x-0`}
                  ></span>
                </div>
              ))}
            </dl>
          </div>
        </main>
      </div>

      <div className=" lg:flex lg:justify-between  gap-5 px-2 py-5">
        <div className="w-full lg:w-1/2  border rounded-md py-2  border-gray-200 bg-gray-100 lg:block">
          <h2 className="text-sm font-medium text-black pt-2 pb-4 text-center border-b">
            Other Information
          </h2>
          <ul
            role="list"
            className=" h-96 overflow-y-auto grid grid-cols-2 gap-5 px-4 py-4"
          >
            {stat.map((project) => (
              <li
                key={project.name}
                className="col-span-1 flex rounded-md shadow-sm"
              >
                {/* <div
                  className={classNames(
                    project.bgColor,
                    "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                  )}
                >
                  {project.initials}
                </div> */}
                <div
                  className={`flex flex-1 items-center justify-between truncate rounded-md border-b border border-t border-gray-200 bg-white`}
                >
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a
                      href={project.href}
                      className="font-medium text-gray-800 hover:text-gray-800"
                    >
                      {project.name}
                    </a>
                    <p className="text-gray-700"> {project.members}</p>
                  </div>
                  {/* <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    ></button>
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className=" flex-1 lg:w-1/2 overflow-y-auto px-3 py-2 rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold text-black  text-center">
            Transaction History
          </h2>
          <div className="">
            <div className="mt-1 flow-root">
              <div className=" overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                  <UserTransaction />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="">
        <div className="ml-5">Notification List </div>
        <NotificationList />
      </div>

    </>
  );
};

export default UserDashboard;
