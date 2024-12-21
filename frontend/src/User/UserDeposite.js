import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../BaseFile/comman/Loader";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { getQrLink } from "../redux/qrSlice";
import { AiFillDelete } from "react-icons/ai";
import {
  getAllDepositeByid,
  deleteDeposite,
  clearErrors,
  clearMessage,
} from "../redux/depositeSlice";
import UserDepositeModel from "./UserDepositeModel";

const UserDepostie = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { singleDeposite, loading, error, message } = useSelector(
    (state) => state.alldeposite
  );
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(getQrLink());
    dispatch(getAllDepositeByid(auth?.id));
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
  const handleImageClick = (imageName) => {
    setPreviewImage(`/uploads/${imageName}`);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <>
      {/* {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="mx-5">
        <div className="w-full flex justify-between items-center mb-3 pl-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">
              Deposite History
            </h3>
            <p className="text-slate-400 text-sm">
              Overview of the Deposite History.
            </p>
          </div>
          <div className="ml-3">
            <div className="w-full flex gap-5 max-w-sm relative">
              <div className="relative">
                <input
                  className="bg-gray-900 w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
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
                Deposite
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full mb-4 text-gray-300 bg-gray-800 px-3 py-1 shadow-md rounded-lg bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-left table-auto min-w-max border">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      ID
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
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Recipt
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Request
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black w-16">
                    <p className="text-sm font-normal leading-none text-white">
                      Accept
                    </p>
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {singleDeposite
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <tr key={index} className="even:bg-gray-900">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                        {item?.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        ${item?.amount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          {item?.image_name && (
                            <button
                              onClick={() => handleImageClick(item?.image_name)}
                              className="text-blue-400 hover:underline"
                            >
                              {item?.image_name?.slice(0, 10)}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.createdAT}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.acceptat}
                      </td>
                     
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={handleClosePreview}
              className="absolute top-2 right-2 text-white text-xl bg-black p-2 rounded-full"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteDeposite}
          id={deleteID}
        />
      )}
      {openModel && (
        <UserDepositeModel openModel={openModel} modelClose={modelClose} />
      )} */}


{message && <SuccessAlert message={message} />}
{error && <ErrorAlert error={error} />}
<div className="sm:mx-2 lg:mx-8">
  <div className="w-full lg:flex sm:flex flex-col sm:flex-row justify-between items-center mb-3 lg:pl-3 sm:pl-3">
    <div className="mb-2 sm:mb-0">
      <h3 className="text-lg font-semibold text-black">Deposit History</h3>
      <p className="text-black text-sm">Overview of the Deposit History.</p>
    </div>
    <div className="lg:ml-3 sm:ml-3  w-full sm:w-auto">
      <div className="flex gap-2 sm:gap-5 max-w-full sm:max-w-sm relative">
        <div className="relative flex-grow">
          <input
            className="bg-gray-900 w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
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
              className="w-6 h-6 text-slate-300"
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
          Deposit
        </button>
      </div>
    </div>
  </div>

  <div className="relative flex flex-col w-full h-full mb-4 text-gray-300 bg-gray-800 px-3 py-1 shadow-md rounded-lg bg-clip-border">
    {loading ? (
      <Loader />
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto min-w-max border">
          <thead>
            <tr>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Email</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Amount</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Currency</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Status</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Recipt</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Hash</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Request</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black w-16">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Accept</p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {singleDeposite?.slice().reverse().map((item, index) => (
              <tr key={index} className="even:bg-gray-900">
                <td className="whitespace-nowrap py-2 md:py-4 pl-4 pr-3 text-xs md:text-sm font-medium text-gray-300 sm:pl-3">
                  {item?.email}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  ${item?.amount}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.currency}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.status}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    {item?.image_name && (
                      <button
                        onClick={() => handleImageClick(item?.image_name)}
                        className="text-blue-400 hover:underline"
                      >
                        {item?.image_name?.slice(0, 10)}
                      </button>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.hash}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.createdAT}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.acceptat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

{previewImage && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="relative">
      <img
        src={previewImage}
        alt="Preview"
        className="max-w-full max-h-screen object-contain"
      />
      <button
        onClick={handleClosePreview}
        className="absolute top-2 right-2 text-white text-xl bg-black p-2 rounded-full"
      >
        ×
      </button>
    </div>
  </div>
)}

{modalOpen && (
  <Confirmation isClose={isClose} deletefunction={deleteDeposite} id={deleteID} />
)}

{openModel && (
  <UserDepositeModel openModel={openModel} modelClose={modelClose} />
)}


    </>
  );
};

export default UserDepostie;
