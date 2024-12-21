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
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  ScaleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutuser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/userSlice";
import NotificationPopup from "../../User/NotificationPopup";

const network = [
  { name: "Direct Member", to: "/user/directmember", current: false },
  { name: "Referral Tree", to: "/user/referraltree", current: false },
];
const wallet = [
  // { name: "Deposite", to: "/user/adddeposite", current: false },
  // { name: "Withdrawal", to: "/user/addwithdrawal", current: false },
  // { name: "TopUp", to: "/user/topup", current: false },
  // { name: "ReTopUp", to: "/user/retopup", current: false },
];
const income = [
  { name: "Detail", to: "/user/income", current: false },
  {
    name: "Reward",
    to: "/user/transaction/reward_transaction",
    current: false,
  },
  {
    name: "Direct",
    to: "/user/transaction/direct_transaction",
    current: false,
  },
  {
    name: "Level",
    to: "/user/transaction/invest_level_transaction/invest",
    current: false,
  },
  { name: "Trade Income", to: "/user/transaction/roi_transaction/Invest", current: false },
  {
    name: "Compound Level",
    to: "/user/transaction/invest_level_transaction/compound",
    current: false,
  },
  { name: "Compound Income", to: "/user/transaction/roi_transaction/Compound", current: false },
];
const navigation = [
  {
    name: "Dashboard",
    to: "/user/dashboard",
    current: true,
    icon: HomeIcon,
    submenu: [],
  },
  {
    name: "Network",
    to: "/user/directmember",
    current: false,
    icon: ClockIcon,
    submenu: network,
  },
  {
    name: "Deposit",
    to: "/user/adddeposite",
    current: false,
    icon: ScaleIcon,
    submenu: wallet,
  },
  {
    name: "Withdrawal",
    to: "/user/addwithdrawal",
    current: false,
    icon: CreditCardIcon,
    submenu: wallet,
  },
  // {
  //   name: "Top-Up",
  //   to: "/user/topup",
  //   current: false,
  //   icon: ScaleIcon,
  //   submenu: wallet,
  // },
  {
    name: "Retop-Up",
    to: "/user/retopup",
    current: false,
    icon: DocumentChartBarIcon,
    submenu: wallet,
  },
  // {
  //   name: "Transfer",
  //   to: "/user/transfer",
  //   current: false,
  //   icon: DocumentChartBarIcon,
  //   submenu: [],
  // },
  {
    name: "Income",
    to: "/user/income",
    current: false,
    icon: CreditCardIcon,
    submenu: income,
  },
  {
    name: "Membership Plan",
    to: "/user/plan",
    current: false,
    icon: UserGroupIcon,
    submenu: [],
  },
  {
    name: "Support",
    to: "/user/sendsupport",
    current: false,
    icon: DocumentChartBarIcon,
    submenu: [],
  },
  {
    name: "Reward",
    to: "/user/reward",
    current: false,
    icon: DocumentChartBarIcon,
    submenu: [],
  },
  {
    name: "Notification",
    to: "/user/Notification",
    current: false,
    icon: DocumentChartBarIcon,
    submenu: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function UserMenu({ Children, PageName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const { singleuser } = useSelector((state) => state.allusers);
  useEffect(() => {
    dispatch(getUser(auth?.id));
  }, [auth?.id]);
  const [tabs, setTabs] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("Dashboard");
  const [currentTabs, setCurrentTabs] = useState(tabs?.[0]);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function handleLogout() {
    dispatch(signoutuser());
    navigate("/");
  }
  function handleMenu(submenu, name) {
    setTabs(submenu);
    setCurrentMenu(name);
  }

  useEffect(() => {
    const createdAtDate = new Date(singleuser?.created_at); // Convert the created_at date string to a Date object
    const timerDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const endDate = createdAtDate.getTime() + timerDuration;

    // Function to calculate time remaining
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference <= 0) {
        clearInterval(timerInterval); // Stop the timer when it expires
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    // Update the timer every second
    const timerInterval = setInterval(calculateTimeRemaining, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, [singleuser?.created_at]);
  return (
    <>
      <div className="min-h-full bg-gray-200">
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-black pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex flex-shrink-0 items-center px-4">
                <img alt="Easywire logo" src="/bfc.png" className="h-12 w-56" />
              </div>
              <nav
                aria-label="Sidebar"
                className="mt-5 h-full flex-shrink-0 divide-y divide-gray-300 overflow-y-auto"
              >
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => {
                        handleMenu(item?.submenu, item.name);
                        setSidebarOpen(false);
                      }}
                      className={classNames(
                        item.name == currentMenu
                          ? "bg-black text-white border"
                          : "text-gray-100 hover:bg-gray-600 hover:text-white ",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 "
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                      />
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to={`/user/profile/${auth?.id}`}
                    onClick={() => handleMenu([], "Profile")}
                    className={classNames(
                      "Profile" == currentMenu
                        ? "bg-gray-700 text-white border"
                        : "text-gray-100 hover:bg-gray-600 hover:text-white ",
                      "group flex items-center rounded-md px-2 py-2 text-black text-sm font-medium leading-6 "
                    )}
                  >
                    <FaRegUser
                      aria-hidden="true"
                      className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    />
                    Profile
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className={classNames(
                      "text-gray-100 hover:bg-gray-600 hover:text-white ",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 "
                    )}
                  >
                    <IoMdLogOut
                      aria-hidden="true"
                      className="mr-4 h-6 w-6 flex-shrink-0 text-gray-100"
                    />
                    Logout
                  </Link>
                </div>
              </nav>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 flex-shrink-0"></div>
          </div>
        </Dialog>
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-white pb-4 pt-5 border-r">
            <div className="flex flex-shrink-0 items-center px-4">
              <img alt="Easywire logo" src="/bfc.png" className="h-12 w-56" />
            </div>
            <nav
              aria-label="Sidebar"
              className="mt-5 flex flex-1 flex-col divide-y divide-gray-100 overflow-y-auto"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => handleMenu(item?.submenu, item.name)}
                    className={classNames(
                      item.name == currentMenu
                        ? "bg-black text-white border"
                        : "text-black   ",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 "
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        item.name === currentMenu ? "text-white" : "text-black",
                        "mr-4 h-6 w-6 flex-shrink-0"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
                <Link
                  to={`/user/profile/${auth?.id}`}
                  onClick={() => handleMenu([], "Profile")}
                  className={classNames(
                    "Profile" == currentMenu
                      ? "bg-black shadow-lg  text-white border"
                      : "text-black  ",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 "
                  )}
                >
                  <FaRegUser
                    aria-hidden="true"
                    className={classNames(
                      "Profile" === currentMenu ? "text-white" : "text-black",
                      "mr-4 h-6 w-6 flex-shrink-0"
                    )}
                  />
                  Profile
                </Link>
                <Link
                  onClick={handleLogout}
                  className={classNames(
                    "   text-black",
                    "group text-black flex items-center rounded-md px-2 py-2 text-sm  font-medium leading-6 "
                  )}
                >
                  <IoMdLogOut
                    aria-hidden="true"
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                  />
                  Logout
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex  flex-shrink-0 border-b border-gray-200 bg-gray-200 lg:border-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="border-r border-gray-900 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="sm:flex py-3 flex-1 justify-between lg:mx-auto lg:max-w-7xl lg:px-8 border-b border-gray-800">
              <div className="flex flex-1"></div>
             
              <div className="ml-4 flex items-center ">
                <button
                  type="button"
                  className="relative p-3 rounded-lg text-[12px] text-gray-300 hover:text-gray-200 focus:outline-none border bg-black shadow-lg"
                >
                  {timeRemaining.days > 0 ? (
                  <p>
                    {timeRemaining.days}{" "}
                    <span className="text-gray-100">days</span>{" "}
                    {timeRemaining.hours}{" "}
                    <span className="text-gray-100">hours</span>{" "}
                    {timeRemaining.minutes}{" "}
                    <span className="text-gray-100">minutes</span>{" "}
                    {timeRemaining.seconds}{" "}
                    <span className="text-gray-100">seconds</span> remaining
                  </p>
                ) : (
                  <p>
                    Timer expired!
                  </p>
                )}
                </button>
              </div>

              <div className="ml-4 flex items-center ">
                <button
                  type="button"
                  className="relative p-3 rounded-lg w-full text-gray-300 lg:w-[200px] text-[12px] hover:text-gray-200 focus:outline-none border  bg-black"
                >
                 Active Wallet : ${( singleuser?.business)?.toFixed(2)}
                </button>
                <button
                  type="button"
                  className="relative p-3 rounded-lg w-full text-gray-300 lg:w-[200px] text-[12px] hover:text-gray-200 focus:outline-none border bg-black shadow-lg"
                >
                 Income Wallet : $ {(singleuser?.wallet - singleuser?.roi_income - singleuser?.business)?.toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          <nav
            aria-label="Breadcrumb"
            className="flex border-b border-gray-800 bg-gray-200"
          >
            <ol
              role="list"
              className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
            >
              <li className="flex">
                <div className="flex items-center">
                  <a href="#" className="text-gray-900 hover:text-gray-800">
                    <HomeIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0"
                    />
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              <li className="flex">
                <div className="flex items-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="h-full w-6 flex-shrink-0 text-gray-800"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <a className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-800">
                    {singleuser?.username}
                  </a>
                </div>
              </li>
              <li className="flex">
                <div className="flex items-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="h-full w-6 flex-shrink-0 text-gray-800"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <a className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-800">
                    {PageName}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          <div>
            <div className=" sm:block">
              <nav
                aria-label="Tabs"
                className="isolate flex divide-x divide-gray-900 rounded-lg shadow"
              >
                {tabs?.map((tab, tabIdx) => (
                  <Link
                    key={tab?.name}
                    to={tab?.to}
                    onClick={() => setCurrentTabs(tab?.name)}
                    aria-current={tab?.current ? "page" : undefined}
                    className={classNames(
                      tab?.name == currentTabs
                        ? "text-gray-50 bg-gray-500"
                        : "text-gray-500 hover:text-gray-50",
                      tabIdx === 0 ? "rounded-l-lg" : "",
                      tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                      "group relative min-w-0 flex-1 overflow-hidden bg-gray-200 px-4 py-4 text-center text-sm font-medium hover:bg-gray-900 focus:z-10"
                    )}
                  >
                    <span>{tab?.name}</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        tab?.name == currentTabs
                          ? "bg-white"
                          : "bg-transparent",
                        "absolute inset-x-0 bottom-0 h-1.5"
                      )}
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className=" items-stretch overflow-hidden gap-5 pt-5 mx-5">
            {Children}
          </div>
        </div>
      </div>
      
      <NotificationPopup/>
    </>
  );
}
