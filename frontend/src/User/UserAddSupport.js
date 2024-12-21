import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { AiFillDelete } from "react-icons/ai";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import { clearErrors, clearMessage } from "../redux/supportSlice";
import { getSingleSupport, deleteSupport } from "../redux/supportSlice";
import UserSupportModel from "./UserSupportModel";
export default function UserAddSupport() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { singlesupport, loading, error, message } = useSelector(
    (state) => state.allsupport
  );
  const [allSupportMessage, setAllSupportMessage] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModel, setOpenModel] = useState(null);

  useEffect(() => {
    if (auth?.id) {
      dispatch(getSingleSupport(auth?.id));
      setAllSupportMessage(singlesupport);
    }
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message, auth?.id]);

  const handleSearch = (e) => {
    setAllSupportMessage(
      singlesupport?.filter((p) => p.email?.includes(e.target.value))
    );
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setModalOpen(true);
  };

  const isClose = () => {
    setModalOpen(false);
  };

  function modelClose() {
    setOpenModel(false);
  }
  return (
    <>
      {/* {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="mx-5">
        <div className="w-full flex justify-between items-center mb-3 pl-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">
              Get Support
            </h3>
            <p className="text-slate-400 text-sm">
              Overview of the current Support.
            </p>
          </div>
          <div className="ml-3">
            <div className="w-full flex gap-5 max-w-sm relative">
              <div className="relative">
                <input
                  className="bg-gray-900 w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Search for invoice..."
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-gray-900 rounded"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setOpenModel(true)}
                className="block rounded-md bg-gray-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Support
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full text-gray-700 bg-gray-800 mb-4 shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max border">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    ID
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Email
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Title
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Message
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Send At
                  </p>
                </th>
                <th
                  scope="col"
                  className="p-4 border-b border-slate-200 bg-gray-800 w-16"
                >
                  <p className="text-sm text-center font-normal leading-none text-white">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 hover:bg-black">
              {allSupportMessage?.map((item, index) => (
                <tr key={index} className="even:bg-gray-900">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-400 sm:pl-3">
                    {item?.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {item?.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {item?.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {item?.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {item?.message}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                    {item?.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteSupport}
          id={deleteID}
        />
      )}
      {openModel && (
        <UserSupportModel openModel={openModel} modelClose={modelClose} />
      )} */}


{message && <SuccessAlert message={message} />}
{error && <ErrorAlert error={error} />}
<div className="lg:mx-5 sm:mx-2">
  <div className="w-full lg:flex flex-col md:flex-row justify-between items-center mb-3  lg:pl-3">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Get Support</h3>
      <p className="text-slate-400 text-sm">Overview of the current Support.</p>
    </div>
    <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-3">
      <div className="relative w-full md:w-72">
        <input
          className="bg-gray-900 w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
          placeholder="Search for invoice..."
        />
        <button
          className="absolute h-8 w-8 right-1 top-1 flex items-center bg-gray-900 rounded"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-5 h-5 text-slate-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        onClick={() => setOpenModel(true)}
        className="w-full md:w-auto bg-gray-700 px-3 py-2 text-center text-sm font-semibold text-white rounded shadow-sm hover:bg-rose-800 focus:outline-none"
      >
        Support
      </button>
    </div>
  </div>

  <div className="relative flex flex-col w-full h-full text-gray-700 bg-gray-800 mb-4 shadow-md rounded-lg bg-clip-border overflow-x-auto">
    <table className="w-full text-left table-auto min-w-full border">
      <thead>
        <tr>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white">ID</th>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white">Email</th>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white">Title</th>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white">Message</th>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white">Send At</th>
          <th className="p-4 border-b border-slate-200 bg-gray-800 text-sm font-normal leading-none text-white w-16 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-900">
        {allSupportMessage?.map((item, index) => (
          <tr key={index} className="even:bg-gray-900">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-400">{item?.id}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{item?.email}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{item?.title}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{item?.message}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{item?.createdAt}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400 text-center">
              {/* Add actions if needed */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{modalOpen && (
  <Confirmation
    isClose={isClose}
    deletefunction={deleteSupport}
    id={deleteID}
  />
)}
{openModel && (
  <UserSupportModel openModel={openModel} modelClose={modelClose} />
)}

    </>
  );
}
