import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { getAllUsers, getUser } from "../redux/userSlice";
import { getAllDeposite } from "../redux/depositeSlice";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
  UsersIcon,
  UserIcon,
  BanIcon,
  DollarSignIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminSetting from "./AdminSetting";
import { getAllWithdrawal } from "../redux/withdrawalSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function AdminDashboard() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { allusers, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const { alldeposite } = useSelector((state) => state.alldeposite);
  const { allwithdrawal } = useSelector((state) => state.allwithdrawal);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDeposite());
    dispatch(getAllWithdrawal());
  }, [admin?.id]);
  let totalCount = allusers?.length;
  let activeCount = allusers?.filter(
    (user) => user?.is_active == "active"
  ).length;
  let blockCount = allusers?.filter((user) => user?.status == "block").length;
  let activePlanSum = allusers
    ?.filter((user) => user.is_active)
    .reduce((sum, user) => sum + user.active_plan, 0);
  let totalbusiness = allusers?.reduce(
    (sum, user) => sum + user.business,
    0
  );
  let inactiveCount = totalCount - activeCount;
  let unblockCount = totalCount - blockCount;

  const today = new Date().toISOString().slice(0, 10);

  // Filter users who joined today
  let joinedTodayCount = allusers?.filter((user) => {
    const createdAtDate = user?.created_at?.slice(0, 10); // Extract YYYY-MM-DD from created_at
    return createdAtDate === today;
  }).length;

  let pendingDepositsCount = alldeposite?.filter(
    (deposit) => deposit.status === "pending"
  ).length;
  let pendingaWithdrawalCount = allwithdrawal?.filter(
    (wd) => wd.status === "pending"
  ).length;
 
  const cards = [
    {
      name: "Total User",
      to: "/admin/user/all",
      icon: ScaleIcon,
      amount: totalCount,
      bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-700",
    },
    {
      name: "Active Member",
      to: "/admin/user/active",
      icon: ScaleIcon,
      amount: activeCount,
      bgColor: "bg-green-500",
      iconBgColor: "bg-green-700",
    },
    {
      name: "Inactive Member",
      to: "/admin/user/inactive",
      icon: ScaleIcon,
      amount: inactiveCount,
      bgColor: "bg-red-500",
      iconBgColor: "bg-red-700",
    },
    {
      name: "Subscription Plan Amount",
      to: "/admin/dashboard",
      icon: ScaleIcon,
      amount: `$${activePlanSum}`,
      bgColor: "bg-yellow-500",
      iconBgColor: "bg-yellow-700",
    },
    {
      name: "Block Member",
      to: "/admin/user/block",
      icon: ScaleIcon,
      amount: blockCount,
      bgColor: "bg-purple-500",
      iconBgColor: "bg-purple-700",
    },
    {
      name: "Unblock Member",
      to: "/admin/user/unblock",
      icon: ScaleIcon,
      amount: unblockCount,
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
    },
  ];

  const cards2 = [
    {
      name: "Total Business",
      to: "/admin/income",
      icon: ScaleIcon,
      amount: "$" + totalbusiness,
      bgColor: "bg-indigo-500",
      iconBgColor: "bg-indigo-700",
    },
    { name: "Today Join", to: "/admin/user/all", icon: ScaleIcon, amount: joinedTodayCount,bgColor: "bg-blue-500",
      iconBgColor: "bg-blue-700", },
    {
      name: "Pending Deposite",
      to: "/admin/deposite",
      icon: ScaleIcon,
      amount: pendingDepositsCount,
      bgColor: "bg-purple-500",
      iconBgColor: "bg-purple-700",
    },
    {
      name: "Pending Withdrawal",
      to: "/admin/pendingwithdrawalrequest",
      icon: ScaleIcon,
      amount: pendingaWithdrawalCount,
      bgColor: "bg-red-500",
      iconBgColor: "bg-red-700",
    },
  ];
  return (
    <>
      <div className="min-h-full ">
        <div className="flex flex-1 flex-col">
          <main className="flex-1 pb-8 ">
            {/* Page header */}
            <div className="bg-white border border-gray-400 mt-4 shadow-lg rounded-lg">
              <div className="px-4 sm:px-6  lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        alt=""
                        src="/default.jpg"
                        className="hidden h-16 w-16 rounded-full sm:block shadow-lg transition-transform transform hover:scale-110 hover:rotate-6 animate-spin-slow"
                      />
                      <div className="ml-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                          Welcome, {admin?.username}
                        </h1>
                        <p className="text-base text-purple-800 mt-1">
                          You have achieved 72% more sales today. Check your new
                          rising badge in your profile.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0 ">
                    <button
                      type="button"
                      className="inline-flex items-center bg-gradient-to-r bg-black px-4 py-2 text-sm font-bold text-white rounded-lg shadow-sm hover:shadow-xl transition duration-700 ease-in-out"
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mx-auto max-w-7xl">
                {/* Overview Section */}
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Overview
                  </h2>
                  {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                      <div
                        key={card.name}
                        className="bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"
                      >
                        <div className="flex items-center mb-3">
                          <div className="flex-shrink-0">
                            <card.icon
                              aria-hidden="true"
                              className="h-8 w-8 text-blue-500"
                            />
                          </div>
                          <div className="ml-4 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500">
                                {card.name}
                              </dt>
                              <dd className="text-lg font-bold text-gray-900">
                                {card.amount}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <Link
                            to={card.to}
                            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div> */}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                      <div
                        key={card.name}
                        className={`rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105 ${card.bgColor}`}
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`flex-shrink-0 p-2 rounded-full ${card.iconBgColor}`}
                          >
                            <card.icon
                              aria-hidden="true"
                              className="h-8 w-8 text-white"
                            />
                          </div>
                          <div className="ml-4 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-white">
                                {card.name}
                              </dt>
                              <dd className="text-lg font-bold text-white">
                                {card.amount}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                          <Link
                            to={card.to}
                            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="mt-8 w-full h-[2px] bg-gray-300" />

                {/* Admin Settings Section */}
                <div className="py-8 ">
                  <AdminSetting />
                </div>

                <div className="mt-8 w-full h-[2px] bg-gray-300" />

                {/* Other Information Section */}
                <section className="mt-8">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Other Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards2.map((card) => (
                      <div
                        key={card.name}
                       className={`rounded-lg shadow-lg px-3 py-5 transition-transform transform hover:scale-105 ${card.bgColor}`}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`flex-shrink-0 p-2 rounded-full ${card.iconBgColor}`}>
                            <card.icon
                              aria-hidden="true"
                              className="h-8 w-8 text-white"
                            />
                          </div>
                          <div className="ml-4 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-100">
                                {card.name}
                              </dt>
                              <dd className="text-lg font-bold text-gray-100">
                                {card.amount}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                          <Link
                            to={card.to}
                            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
