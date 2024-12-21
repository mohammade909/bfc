import { sendOTP, verifyOTP,clearOtpErrors,clearOtpMessage } from "../redux/otpSlice"; // Assume you have actions for OTP handling
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../BaseFile/comman/Spinner";
import { getUser } from "../redux/userSlice";
import {
  addCompoundWithdrawal,
  clearErrors,
  clearMessage,
} from "../redux/withdrawalSlice";

export default function CompoundWithdrawalConfirmation({
  openModel,
  modelClose,
}) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const {loading, success ,error:otpErr,message} = useSelector((state) => state.otp);

  const { singleuser } = useSelector((state) => state.allusers);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    dispatch(getUser(auth?.id));
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

  useEffect(() => {
    if (singleuser?.compound && singleuser?.compound_date) {
      calculateWithdrawalAmount();
    }
  }, [singleuser]);

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOTP = async () => {
    dispatch(sendOTP({ userId: auth?.id, email: singleuser?.email }));
    setIsOTPRequested(true);
  };

  const calculateWithdrawalAmount = () => {
    const compoundDate = new Date(singleuser.compound_date);
    const currentDate = new Date();
    const yearDifference =
      currentDate.getFullYear() - compoundDate.getFullYear();

    let deductionPercentage = 0;
    if (yearDifference < 1) {
      deductionPercentage = 25;
    } else if (yearDifference < 2) {
      deductionPercentage = 15;
    }
    else if (yearDifference < 3) {
      deductionPercentage = 10;
    }
    else if (yearDifference < 4) {
      deductionPercentage = 5;
    } // No deduction if more than 2 years

    const amount = singleuser.compound;
    const deductedAmount = amount - (amount * deductionPercentage) / 100;
    setWithdrawAmount(deductedAmount);
  };

  const verifyAndSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(verifyOTP({ userId: auth?.id, otp }));
      if (response?.payload?.success) {
        console.log("Verification succeeded");
        const allValues = {
        user_id: auth?.id,
        amount: withdrawAmount,
        deduction: singleuser?.compound - withdrawAmount,
      };
      await dispatch(addCompoundWithdrawal({ values: allValues }));
      modelClose();
    } else {
      console.log("Verification failed");
    }
  } catch (error) {
    console.error("An error occurred during verification:", error);
  }
  };

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
              <form>
                {!isOTPRequested ? (
                  <>
                    <div>
                      <div className="p-5">
                        <div className="py-4 flex justify-between items-center">
                          <h2 className="text-xl font-semibold mb-5 text-gray-300 ">
                            <p>Compound Amount : $ {singleuser?.compound}</p>
                            <p className="text-[16px]">
                              (Compound Withdrawable amount : $ {withdrawAmount}
                              )
                            </p>
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
                        <p className="text-gray-200 text-[12px] mt-2">
                          T & C: Deduction of 25% on compound amount if
                          withdrawal is within the first year, deduction of 15%
                          if withdrawal is after 1 year but before 2 years, and
                          no deduction if withdrawal is after 2
                          years.Withdrawals are processed within 30 days.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
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
                      disabled={otp.length == 6 ? false : true}
                      className="w-full mt-4 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
                      onClick={verifyAndSubmit}
                    >
                      {loading ? <Spinner /> : "Submit Withdrawal"}
                    </button>
                  </>
                )}
              </form>
              <p className="text-red-600 text-2xl">{otpErr}</p>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
