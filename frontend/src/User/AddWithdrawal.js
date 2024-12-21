import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { TrashIcon } from "@heroicons/react/20/solid";
import BebModal from "./BebModal"
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import { getUser } from "../redux/userSlice";
import { CgDetailsMore } from "react-icons/cg";

import {
  getAllWithdrawalByid,
  deleteWithdrawal,
  clearErrors,
  clearMessage,
} from "../redux/withdrawalSlice";
import UserWithdrawalModel from "./UserWithdrawalModel";
import CompoundConfirmation from "./CompoundConfirmation";
import CompoundWithdrawalConfirmation from "./CompoundWithdrawalConfirmation";
import ROIWithdrawalConfirmation from "./ROIWithdrawalConfirmation";
import BalanceDetail from "./BalanceDetail";

export default function UserAddWithdrawal() {
  const dispatch = useDispatch();
  const { singleWithdrawal, loading, error, message } = useSelector(
    (state) => state.allwithdrawal
  );
  const { singleuser } = useSelector((state) => state.allusers);

  const { auth } = useSelector((state) => state.auth);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [compoundModel, setCompoundModel] = useState(false);
  const [withdrawalROIModel, setWithdrawalROIModel] = useState(false);
  const [withdrawalcompoundModel, setWithdrawalCompoundModel] = useState(false);
  const [openModel, setOpenModel] = useState(null);
  const [bebModal, setBebModal] = useState(false);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    dispatch(getUser(auth?.id))

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

  useEffect(() => {
    if (auth?.id) {
      dispatch(getAllWithdrawalByid(auth?.id));
    }
  }, [auth?.id]);

  const handleBebClose = (id) => {
    setBebModal(false)
    };

  const isClose = () => {
    setModalOpen(false);
    setDetail(false);
  };

  function modelClose() {
    setOpenModel(false);
    setCompoundModel(false);
    setWithdrawalCompoundModel(false);
    setWithdrawalROIModel(false);
  }
  function handleWithdrawalButton(){
    if(singleuser?.bep20 || singleuser?.trc20){
    setOpenModel(true)
    }
    else{
      setBebModal(true)
    } 

  }
  function handleCompoundButton(){
    setCompoundModel(true)
  }
  function handleWithdrawalCompund(){
    if(singleuser?.bep20 || singleuser?.trc20){
      setWithdrawalCompoundModel(true)
      }
      else{
        setBebModal(true)
      } 
  }
  function handleWithdrawalROI(){
    if(singleuser?.bep20 || singleuser?.trc20){
      setWithdrawalROIModel(true)
      }
      else{
        setBebModal(true)
      } 
  }
  return (
    <>


{message && <SuccessAlert message={message} />}
{error && <ErrorAlert error={error} />}
<div className=" ">
  <div className="w-full lg:flex sm:flex items-center mb-3 justify-between lg:pl-3 sm:pl-3">
    <div className="mb-2">
      <h3 className="text-lg font-semibold text-gray-800">Withdraw Request </h3>
      <p className="text-slate-400 text-sm">Overview of the Withdraw Request.</p>
    </div>
    <div className="">
      <div className="flex gap-2 sm:gap-5 max-w-full  relative">
        <div className="relative flex-grow">
          <input
            className="bg-gray-900 w-full  pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Search for invoice..."
          />
          <button
            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-gray-900 rounded "
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
        <button className="text-blue-600 text-2xl border border-gray-400  px-2 rounded-md" onClick={()=>setDetail(true)}> <CgDetailsMore/></button>

        
      </div>
      
    </div>
    
  </div>
  <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 mb-4">
      <button
          type="button"
          onClick={handleWithdrawalButton}
          className="block  rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Withdrawal Working
        </button>
        <button
          type="button"
          onClick={handleWithdrawalCompund}
          className="block  rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Withdrawal Compound
        </button>
        <button
          type="button"
          onClick={handleWithdrawalROI}
          className="block  rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Withdrawal ROI
        </button>
        <button
          type="button"
          onClick={handleCompoundButton}
          className="block  rounded-md bg-gray-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Compound Amount
        </button>
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
                <p className="text-xs md:text-sm font-normal leading-none text-white">E-Mail</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Amount</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Status</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Request</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Type</p>
              </th>
              <th className="p-2 md:p-4 border-b border-slate-200 bg-black ">
                <p className="text-xs md:text-sm font-normal leading-none text-white">Action at</p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {singleWithdrawal?.slice().reverse().map((item, index) => (
              <tr key={index} className="even:bg-gray-900">
                <td className="whitespace-nowrap py-2 md:py-4 pl-4 pr-3 text-xs md:text-sm font-medium text-gray-300 sm:pl-3">
                  {item?.email}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                ${item?.amount + item?.deduction}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.status}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.createdAT}
                </td>
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.type}
                </td>
               
                <td className="whitespace-nowrap px-3 py-2 md:py-4 text-xs md:text-sm text-gray-300">
                  {item?.acceptat || " - "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

{modalOpen && (
  <Confirmation isClose={isClose} deletefunction={deleteWithdrawal} id={deleteID} />
)}

{openModel && (
  <UserWithdrawalModel openModel={openModel} modelClose={modelClose} />
)}

{compoundModel && (
  <CompoundConfirmation openModel={compoundModel} modelClose={modelClose} id={auth?.id}/>
)}

{setWithdrawalCompoundModel && (
  <CompoundWithdrawalConfirmation openModel={withdrawalcompoundModel} modelClose={modelClose} id={auth?.id}/>
)}
{withdrawalROIModel && (
  <ROIWithdrawalConfirmation openModel={withdrawalROIModel} modelClose={modelClose} id={auth?.id}/>
)}
{bebModal && (
  <BebModal handleBebClose={handleBebClose}/>
)}
{detail && (
  <BalanceDetail detail={singleuser?.business} detail2={singleuser?.wallet} isClose={isClose}/>
)}

    </>
  );
}
