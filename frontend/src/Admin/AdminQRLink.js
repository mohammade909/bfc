import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { QRCode } from "react-qrcode";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import {
  addQrLink,
  getQrLink,
  deleteQrLink,
  clearErrors,
  clearMessage,
} from "../redux/qrSlice";
import { useQRCode } from "react-qrcode";

import { AiFillDelete } from "react-icons/ai";
import Loader from "../BaseFile/comman/Loader";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import AdminQRModel from "./AdminQRModel";
const AdminQrLink = () => {
  const dispatch = useDispatch();
  const { qr, loading, message, error } = useSelector((state) => state.qr);
  const [qrLink, setQrLink] = useState("");
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(null);


  useEffect(() => {
    dispatch(getQrLink());
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
  function modelClose() {
    setOpenModel(false);
  }
  return (
    <>
         {message && <SuccessAlert message={message} />}
         {error && <ErrorAlert error={error} />}
      <div className="">
        <div className="w-full flex justify-between items-center mb-3 pl-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">
              Pyemnt Settings Detail
            </h3>
            <p className="text-black text-sm">
              Overview of the Deposite History.
            </p>
          </div>
          <div className="ml-3">
            <div className="w-full flex gap-5 items-center max-w-sm relative">
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
                Payment settings
              </button>
            </div>
          </div>
        </div>

        <div className={`${loading ? "h-[260px] items-center" : "h-full"}`}>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-gray-900 ">
              <div className=" flow-root">
                <div className=" overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-2">
                    <h1 className="text-white text-2xl font-semibold m-8">
                      QR Link History
                    </h1>
                    <table className="z-10 mt-6 w-full whitespace-nowrap text-left">
                      <thead className="border-b border-white/10 text-sm leading-6 text-white">
                        <tr>
                          <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                          >
                            USDT BEP20
                          </th>
                          <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                          >
                            USDT TRC20
                          </th>
                          <th
                            scope="col"
                            className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                          >
                            Set at
                          </th>
                          <th
                            scope="col"
                            className="hidden py-2 pl-0 pr-4 font-semibold sm:table-cell sm:pr-3 "
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          <tr>
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                              <div className="">
                                <div className="font-mono text-sm leading-6 text-gray-400">
                                  ${qr?.id}
                                </div>
                              </div>
                            </td>
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                              <div className="">
                                <div className="font-mono text-sm leading-6 text-gray-400">
                                  ${qr?.BEB20}
                                </div>
                              </div>
                            </td>{" "}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                              <div className="">
                                <div className="font-mono text-sm leading-6 text-gray-400">
                                  ${qr?.TRC20}
                                </div>
                              </div>
                            </td>
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell">
                              <div className="">
                                <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                                  {qr?.createdAT}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-3">
                              <div className="z-0 flex space-x-4">
                                <>
                                  <AiFillDelete
                                    className="h-4 w-4 text-red-400 cursor-pointer"
                                    onClick={() => handleDelete(qr?.id)}
                                    title="Delete"
                                  />
                                </>
                              </div>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {modalOpen && (
          <Confirmation
            isClose={isClose}
            deletefunction={deleteQrLink}
            id={deleteID}
          />
        )}
        {openModel && (
          <AdminQRModel openModel={openModel} modelClose={modelClose} />
        )}
      </div>
    </>
  );
};

export default AdminQrLink;
