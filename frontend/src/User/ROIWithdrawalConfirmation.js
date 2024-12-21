import { sendOTP, verifyOTP,clearOtpErrors,clearOtpMessage } from "../redux/otpSlice"; // Assume you have actions for OTP handling
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { getUser } from "../redux/userSlice";
import { getAllWithdrawalByid,addROIWithdrawal, clearErrors, clearMessage } from "../redux/withdrawalSlice";

export default function ROIWithdrawalConfirmation({ openModel, modelClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth); 
  const {loading, success ,error:otpErr,message} = useSelector((state) => state.otp);
  const {singleWithdrawal} = useSelector((state) => state.allwithdrawal);
  const { singleuser } = useSelector((state) => state.allusers);
  const [values, setValues] = useState({});
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [check, setCheck] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);


  useEffect(() => {
    dispatch(getUser(auth?.id));
    dispatch(getAllWithdrawalByid(auth?.id));
      
    if (otpErr) {
      const errorInterval = setInterval(() => {
        dispatch(clearOtpErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
 
    if (success) {
      const messageInterval = setInterval(() => {
        dispatch(clearOtpMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch,otpErr,success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOTP = async () => {
    if(values.amount > maxAmount ){
     return window.alert("Amount exceed Maximum Amount")
    }
    if(values.amount < 25 ){
      return window.alert("Amount should be greater than 25.")
     }
    dispatch(sendOTP({ userId: auth?.id ,email :singleuser?.email }));
    setIsOTPRequested(true);
  };

  const verifyAndSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(verifyOTP({ userId: auth?.id, otp }));
      if (response?.payload?.success) {
        const allValues = {
        ...values,
        user_id: auth?.id,
      };
      console.log(allValues);
      await  dispatch(addROIWithdrawal({ values: allValues }));
      modelClose();
    } else {
      console.log("Verification failed");
    }
  } catch (error) {
    console.error("An error occurred during verification:", error);
  }
  };

  useEffect(() => {
    if (singleuser) {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const pastDays = Math.ceil((currentDate - startOfMonth) / (1000 * 60 * 60 * 24));
  
      const roiDayIncome = singleuser?.roi_day * pastDays || 0;
      let adjustedIncome = singleuser?.roi_income - roiDayIncome;
  
      const totalWithdrawals = singleWithdrawal
        ?.filter(item => item?.type === "ROI" && item?.status !== 'decline' )
        .reduce((acc, item) => acc + (item.amount || 0) + ((item.deduction || 0)), 0);
  
      adjustedIncome -= totalWithdrawals;
  
      setMaxAmount(adjustedIncome > 0 ? adjustedIncome : 0);
    }
  }, [singleuser, singleWithdrawal]);

  console.log(maxAmount)
  return (
    <>
    <Dialog open={openModel} onClose={modelClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="p-5">
                <div className="py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-5 text-gray-300 ">
                    Withdrawal form (Your Withdrawable ROI Amount : {(maxAmount)?.toFixed(2)})

                  </h2>
                  <button onClick={modelClose}>
                    <div className="group flex cursor-pointer items-center justify-center mb-2 ">
                      <div className="space-y-2">
                        <span className="block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                        <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                      </div>
                    </div>
                  </button>
                </div>
                <form>
                  {!isOTPRequested ? (
                    <>
                       <div className="relative w-full">
                    <label
                      htmlFor="amount"
                      className="absolute -top-2 left-2 inline-block bg-black px-1 text-xs font-medium text-gray-300"
                    >
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      name="amount" 
                      placeholder="amount"
                      onChange={handleChange}
                      required
                      min='25'
                      max={maxAmount}
                      className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-300 bg-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-gray-200 text-[12px] mt-2">
                    T & B C: The minimum withdrawal amount is $25, and there is an admin charge of 05%. Withdrawals are processed within 72 hours
                  </p>
                      <button
                        type="button"
                        disabled={values.amount ? false : true}
                        className="w-full mt-4 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
                        onClick={requestOTP}
                      >
                        Request OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full">
                        <label
                          htmlFor="otp"
                          className="absolute -top-2 left-2 bg-black px-1 text-xs font-medium text-gray-300"
                        >
                          OTP
                        </label>
                        <input
                          id="otp"
                          type="text"
                          name="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={handleOTPChange}
                          required
                          className="block w-full p-4 rounded-md border-0 text-gray-300 bg-black shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={otp.length==6 ? false : true }
                        className="w-full mt-4 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded "
                        onClick={verifyAndSubmit}
                      >
                        {loading ? <Spinner /> : "Submit Withdrawal"}
                      </button>
                    </>
                  )}
                </form>
                <p className="text-red-600 text-2xl">{otpErr}</p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

    </>
  );
}

