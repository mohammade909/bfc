import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { AiFillDelete } from "react-icons/ai";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import {
  deleteTopup,
  getAllTopupByid,
  clearErrors,
  clearMessage,
} from "../redux/topupSlice";
import { getAllPlans } from "../redux/planSlice";
import UserTopupModel from "./UserTopupModel";

export default function UserTopup() {
  const dispatch = useDispatch();
  const { singletopup, loading, error, message } = useSelector(
    (state) => state.alltopup
  );
  const { auth } = useSelector((state) => state.auth);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);

  useEffect(() => {
    dispatch(getAllPlans());
    if (auth?.id) {
      dispatch(getAllTopupByid(auth?.id));
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
  }, [dispatch, error, message]);



  const handleDelete = (id) => {
    setDeleteID(id);
    setModalOpen(true);
  };

  const isClose = () => {
    setModalOpen(false);
  };

  function modelClose(){
    setOpenModel(false)
  }
  return (
    <>
      {/* {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="mx-5">
        <div className="w-full flex justify-between items-center mb-3 pl-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">
            Top-Up History
            </h3>
            <p className="text-slate-400 text-sm">
              Overview of the    Top-Up History.
            </p>
          </div>
          <div className="ml-3">
            <div className="w-full flex gap-5 max-w-sm relative">
              <div className="relative">
                <input
                  className="bg-black w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
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
                Top-Up
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full text-gray-300 bg-gray-800 px-3 py-1 shadow-md rounded-lg bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-left table-auto min-w-max border">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                    Topup To
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Amount
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black w-56">
                    <p className="text-sm font-normal leading-none text-white">
                      Request
                    </p>
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-gray-900">
                {singletopup
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="even:bg-gray-800">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                        {item?.userto_id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        ${item?.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.createdAT}
                      </td>
                      
               
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {modalOpen && (
          <Confirmation
            isClose={isClose}
            deletefunction={deleteTopup}
            id={deleteID}
          />
        )}
           { openModel && (
  <UserTopupModel openModel={openModel} modelClose={modelClose}/>
)} */}



{message && <SuccessAlert message={message} />}
{error && <ErrorAlert error={error} />}
<div className="lg:mx-5 sm:mx-5">
  <div className="w-full lg:flex sm:flex flex-col md:flex-row justify-between items-start md:items-center mb-3 lg:pl-3">
    <div>
      <h3 className="text-lg font-semibold text-slate-300">Top-Up History</h3>
      <p className="text-slate-400 text-sm">Overview of the Top-Up History.</p>
    </div>
    <div className="mt-3 md:mt-0 lg:ml-3 ">
      <div className="w-full flex gap-3 md:gap-5 max-w-full md:max-w-sm relative">
        <div className="relative w-full">
          <input
            className="w-full bg-black pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
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
          className="block w-28  bg-gray-700 px-3 py-2 text-sm font-semibold text-white rounded shadow-sm hover:bg-rose-800 focus:outline-none"
        >
          Top-Up
        </button>
      </div>
    </div>
  </div>

  <div className="relative w-full h-full text-gray-300 bg-gray-800 p-3 shadow-md rounded-lg overflow-x-auto">
    {loading ? (
      <Loader />
    ) : (
      <table className="min-w-full table-auto border-collapse border">
        <thead>
          <tr>
            <th className="p-4 border-b border-slate-200 bg-black text-sm font-normal text-white">
              Topup To
            </th>
            <th className="p-4 border-b border-slate-200 bg-black text-sm font-normal text-white">
              Amount
            </th>
            <th className="p-4 border-b border-slate-200 bg-black text-sm font-normal text-white">
              Status
            </th>
            <th className="p-4 border-b border-slate-200 bg-black text-sm font-normal text-white w-56">
              Request
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {singletopup
            ?.slice()
            .reverse()
            .map((item, index) => (
              <tr key={index} className="even:bg-gray-800 text-center">
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                  {item?.userto_email}
                </td>
                <td className="px-3 py-4 text-sm text-gray-300">
                  ${item?.amount}
                </td>
                <td className="px-3 py-4 text-sm text-gray-300">
                  {item?.status}
                </td>
                <td className="px-3 py-4 text-sm text-gray-300">
                  {item?.createdAT}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
</div>
{modalOpen && (
  <Confirmation isClose={isClose} deletefunction={deleteTopup} id={deleteID} />
)}
{openModel && <UserTopupModel openModel={openModel} modelClose={modelClose} />}

    </>
  );
}
