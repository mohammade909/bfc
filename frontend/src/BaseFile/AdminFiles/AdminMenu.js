import { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutadmin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Management = [
  { name: "Unblocked Users", to: "/admin/user/unblock", current: true },
  { name: "Blocked User", to: "/admin/user/block", current: false },
  { name: "Active Member", to: "/admin/user/active", current: false },
  { name: "Inactive Member", to: "/admin/user/inactive", current: false },
  { name: "All User", to: "/admin/user/all", current: false },
];
const Requests = [
  {
    name: "Withdrawal",
    to: "/admin/pendingwithdrawalrequest",
    current: true,
  },
  { name: "Compound Withdrawal", to: "/admin/compoundpendingwithdrawalrequest", current: false },
  { name: "ROI Withdrawal", to: "/admin/roipendingwithdrawalrequest", current: false },
  { name: "Deposite", to: "/admin/deposite", current: false },
  { name: "TopUp", to: "/admin/topup", current: false },
];

const MainMenu = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: HomeIcon,
    current: true,
    submenu: [],
  },
  {
    name: "Membership Plans",
    to: "/admin/membership/plan",
    icon: FolderIcon,
    current: false,
    submenu: [],
  },
  {
    name: "Reports",
    to: "/admin/reports",
    icon: CalendarIcon,
    current: false,
    submenu: [],
  },
  {
    name: "Support",
    to: "/admin/support",
    icon: DocumentDuplicateIcon,
    current: false,
    submenu: [],
  },
  {
    name: "QR setting",
    to: "/admin/qr/Link",
    icon: DocumentDuplicateIcon,
    current: false,
    submenu: [],
  },
];
const User_Interface = [
  {
    id: 1,
    name: "Management",
    to: "/admin/user/all",
    initial: "H",
    current: false,
    submenu: Management,
  },
  {
    id: 2,
    name: "Rewards",
    to: "/admin/rewards",
    initial: "T",
    current: false,
    submenu: [],
  },
  {
    id: 3,
    name: "Transactions",
    to: "/admin/pendingwithdrawalrequest",
    initial: "W",
    current: false,
    submenu: Requests,
  },
  {
    id: 3,
    name: "Income",
    to: "/admin/income",
    initial: "W",
    current: false,
    submenu: [],
  },
];
const Settings = [
  {
    id: 2,
    name: "General",
    to: "/admin/settings",
    initial: "G",
    current: false,
    submenu: [],
  },
  {
    id: 3,
    name: "create notification",
    to: "/admin/notification",
    initial: "G",
    current: false,
    submenu: [],
  },
  {
    id: 4,
    name: "notification list",
    to: "/admin/notification/list",
    initial: "G",
    current: false,
    submenu: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminMenu({ Children, PageName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenu, setHeaderMenu] = useState([]);
  const [currentTab, setCurrentTab] = useState([]);
  const [currentSubTab, setCurrentSubTab] = useState([]);

  function handleHeaderMenu(submenu,name) {
    console.log(submenu,name)
    setHeaderMenu(submenu);
    setCurrentTab(name);
  }
  function handlesignout() {
    dispatch(signoutadmin());
    navigate("/admin/login");
  }

  return (
    <>
      <div>
        <div className="">
          <Dialog
            open={sidebarOpen}
            onClose={setSidebarOpen}
            className="relative z-50 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
              <DialogPanel
                transition
                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="-m-2.5 p-2.5"
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex no-scrollbar overflow-auto grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10 border-r border-gray-800">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src="/bfc.png"
                      className="h-16 w-56 px-12"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {MainMenu.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={
                                  item?.name == "Refferals"
                                    ? `/admin/refferaltable/${item?.refferal_code}`
                                    : item?.to
                                }
                                onClick={() => handleHeaderMenu(item.submenu,item.name)}
                                className={classNames(
                                  item?.name == currentTab
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-800  ",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="h-6 w-6 shrink-0"
                                />
                                {item?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-800">
                          User Interface
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {User_Interface.map((team) => (
                            <li key={team.name}>
                              <Link
                                onClick={() => handleHeaderMenu(team.submenu,team.name)}
                                to={team.to}
                                className={classNames(
                                  team.name == currentTab
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-800  ",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                  {team.initial}
                                </span>
                                <span className="truncate">{team.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-800">
                          Settings
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {Settings.map((team) => (
                            <li key={team.name}>
                              <Link
                                onClick={() => handleHeaderMenu(team.submenu,team.name)}
                                to={team.to}
                                className={classNames(
                                  team.name == currentTab
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-800  ",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                  {team.initial}
                                </span>
                                <span className="truncate">{team.name}</span>
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              to={`/admin/check/profile/${admin?.id}`}
                              className={classNames(
                                "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                P
                              </span>
                              <span className="truncate">Profile</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={handlesignout}
                              className={classNames(
                                "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                L
                              </span>
                              <span className="truncate">Logout</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
            <div className="no-scrollbar overflow-auto pb-10 flex grow flex-col gap-y-5 overflow-y-auto bg-gray-200 px-6 pb-4 border-r border-gray-800">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="/bfc.png"
                  className="h-16 w-56"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {MainMenu.map((item) => (
                        <li key={item?.name}>
                          <Link
                            to={
                              item?.name === "Refferals"
                                ? `/admin/refferaltable/${admin?.refferal_code}`
                                : item.to
                            }
                            onClick={() => handleHeaderMenu(item.submenu,item.name)}
                            className={classNames(
                              item.name == currentTab
                                ? "bg-gray-800 text-white"
                                : "text-gray-800 ",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-800">
                      User Interface
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {User_Interface.map((team) => (
                        <li key={team.name}>
                          <Link
                            onClick={() => handleHeaderMenu(team.submenu,team.name)}
                            to={team.to}
                            className={classNames(
                              team.name == currentTab
                                ? "bg-gray-800 text-white"
                                : "text-gray-800 ",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-800">
                      Settings
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {Settings.map((team) => (
                        <li key={team.name}>
                          <Link
                            onClick={() => handleHeaderMenu(team.submenu,team.name)}
                            to={team.to}
                            className={classNames(
                              team.name == currentTab
                                ? "bg-gray-800 text-white"
                                : "text-gray-800 ",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to={`/admin/check/profile/${admin?.id}`}
                          className={classNames(
                            "text-gray-800 ",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            P
                          </span>
                          <span className="truncate">Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handlesignout}
                          className={classNames(
                            "text-gray-800 ",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            L
                          </span>
                          <span className="truncate">Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="lg:pl-72 ">
          <div className="min-h-full">
            <div className="lg:fixed w-full z-50">
              <Disclosure as="nav" className="bg-gray-200 ">
                <div className=" max-w-full ml-4">
                  <div className="flex h-16 items-center justify-end">
                  
                    <div className="hidden md:block w-1/3">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon aria-hidden="true" className="h-6 w-6 " />
                        </button>
                      </div>
                    </div>
                    <div className=" flex justify-end w-full md:hidden">
                      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                          type="button"
                          onClick={() => setSidebarOpen(true)}
                          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                        >
                          <span className="sr-only">Open sidebar</span>
                          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </Disclosure>

              <header className="bg-gray-200 border-gray-900 border-b border-t">
                <div className=" max-w-7xl px-4 py-0 sm:px-6 lg:px-8 border-gray-900">
                  <nav
                    aria-label="Breadcrumb"
                    className="flex border-b border-gray-200 bg-gray-200 text-sm"
                  >
                    <div className="flex items-center">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="h-full w-6 flex-shrink-0 text-gray-900"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      Admin / {PageName}
                    </div>
                  </nav>
                </div>
                
              </header>
              
            </div>
            <main className="lg:pt-28 -z-10 bg-white">
            <div className="flex items-center w-full ">
                        <div className=" sm:block pl-6">
                          <div className="border-b border-gray-200 ">
                            <nav aria-label="Tabs" className=" flex w-full gap-x-5">
                              {headerMenu.map((tab) => (
                                <Link
                                  key={tab.name}
                                  to={tab.to}
                                  onClick={()=>setCurrentSubTab(tab.name)}
                                  aria-current={
                                    tab.current ? "page" : undefined
                                  }
                                  className={classNames(
                                    tab.name==currentSubTab
                                      ? "border-indigo-500 text-indigo-600"
                                      : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-700",
                                    " border-b-2 px-1 py-4 text-center gap-3 lg:text-sm text-[10px]"
                                  )}
                                >
                                  {tab.name}
                                </Link>
                              ))}
                            </nav>
                          </div>
                        </div>
                    </div>
              <div className="mx-auto max-w-7xl md:px-4 pb-6 sm:px-6 lg:px-6">
                {Children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
